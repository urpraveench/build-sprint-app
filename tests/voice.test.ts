import {convexTest} from "convex-test";
import {expect,test,vi} from "vitest";
import schema from "../convex/schema";
import {api,internal} from "../convex/_generated/api";
import {checkFacts,spokenQuestion,type Turn} from "../convex/voiceFields";
import {parseDecision,validateWav} from "../convex/sarvam";
import {wavBase64} from "../src/voiceAudio";
const modules=import.meta.glob("../convex/**/*.*s");
const turns:Turn[]=[{speaker:"buyer",text:"Chimney for small kitchen budget 25000",at:1},{speaker:"shop",text:"Model C60, Rs 22000, product only. Installation cost not provided. Warranty one year.",at:2}];
const facts=[{key:"model",value:"C60",turn:1,quote:"Model C60"},{key:"price",value:"22000",turn:1,quote:"Rs 22000"},{key:"warranty",value:"one year",turn:1,quote:"Warranty one year"}];
const brief={item:"Chimney",budget:25000,situation:"small kitchen"};
test("voice evidence cannot invent a fact, infer zero costs, or use assistant speech as a source",()=>{
 expect(()=>checkFacts(facts,turns)).not.toThrow();
 expect(()=>checkFacts([{key:"extraCosts",value:"0",turn:1,quote:"Installation cost not provided"}],turns)).toThrow();
 expect(()=>checkFacts([{key:"model",value:"W90",turn:1,quote:"Model C60"}],turns)).toThrow();
 expect(()=>checkFacts([{key:"model",value:"C60",turn:0,quote:"C60"}],turns)).toThrow();
 expect(()=>parseDecision(JSON.stringify({next:"budget",facts,brief}),turns,"shop")).toThrow("Private");
 expect(()=>parseDecision(JSON.stringify({next:"review",facts:[],brief:{...brief,budget:90000}}),turns,"brief")).toThrow("Unsupported");
 expect(spokenQuestion("handoff","hi-IN")).toContain("accept");expect(spokenQuestion("handoff","te-IN")).toContain("accept");
});
test("only bounded mono 16kHz audio can be processed; no audio storage is involved",()=>{
 const audio=wavBase64(new Float32Array(48000),48000);expect(validateWav(audio).length).toBe(32044);
 expect(()=>validateWav(wavBase64(new Float32Array(25*16000),16000))).toThrow();
 expect(()=>validateWav(btoa("not audio"))).toThrow();
});
test("short review persists original text, confirms only visible facts, retries without duplicate, and isolates accounts",async()=>{
 const t=convexTest(schema,modules),[a,b]=await t.run(async ctx=>Promise.all([ctx.db.insert("users",{email:"voice-a@example.test"}),ctx.db.insert("users",{email:"voice-b@example.test"})]));
 const alice=t.withIdentity({subject:`${a}|s`}),bob=t.withIdentity({subject:`${b}|s`});
 const input={requestId:"fictional-request-123",shop:"Example shop",brief,turns,facts,reviewedKeys:["model","price"],corrections:[{key:"price",value:"21000"}]};
 await expect(t.mutation(api.voice.save,input)).rejects.toThrow("Sign in");
 await expect(alice.mutation(api.voice.save,{...input,reviewedKeys:["warranty"]})).rejects.toThrow("displayed");
 const id=await alice.mutation(api.voice.save,input);expect(await alice.mutation(api.voice.save,input)).toBe(id);
 await expect(alice.mutation(api.voice.save,{...input,corrections:[{key:"price",value:"20000"}]})).rejects.toThrow("different details");
 const saved=await alice.query(api.voice.current);expect(saved).toMatchObject({brief,turns,reviewedKeys:["model","price"],corrections:input.corrections});
 expect(await bob.query(api.voice.current)).toBeNull();expect(await t.query(api.voice.current)).toBeNull();
 await expect(bob.mutation(api.voice.correct,{offerId:id,key:"price",value:"1"})).rejects.toThrow("account");
 await alice.mutation(api.voice.correct,{offerId:id,key:"price",value:"21500"});const revised=await alice.query(api.voice.current);expect(revised?.turns).toEqual(turns);expect(revised?.corrections).toEqual([{key:"price",value:"21500"}]);expect(revised?.reviewedKeys).not.toContain("price");
 await expect(alice.mutation(api.voice.save,{...input,requestId:"another-request-123"})).rejects.toThrow("already saved");
 expect(await t.run(ctx=>ctx.db.query("voiceOffers").take(10))).toHaveLength(1);
 expect(await t.run(ctx=>ctx.db.system.query("_storage").take(10))).toHaveLength(0);
});
test("voice limits and session ownership are checked on the server",async()=>{
 vi.stubEnv("SARVAM_VOICE_TEST_ENABLED","true");vi.stubEnv("SARVAM_ZERO_RETENTION_CONFIRMED","true");vi.stubEnv("SARVAM_API_KEY","fictional-test-key");
 try{const t=convexTest(schema,modules),[a,b]=await t.run(async ctx=>Promise.all([ctx.db.insert("users",{email:"quota-a@example.test"}),ctx.db.insert("users",{email:"quota-b@example.test"})]));const alice=t.withIdentity({subject:`${a}|s`}),bob=t.withIdentity({subject:`${b}|s`}),tokenHash="a".repeat(64);
 const sessionId=await alice.mutation(api.voice.newSession,{tokenHash});
 await expect(bob.mutation(internal.voice.reserve,{sessionId,tokenHash,attempts:3})).rejects.toThrow("ended");
 await expect(alice.mutation(internal.voice.reserve,{sessionId,tokenHash:"b".repeat(64),attempts:3})).rejects.toThrow("ended");
 for(let n=0;n<16;n++){await alice.mutation(internal.voice.reserve,{sessionId,tokenHash,attempts:3});if(n===0)await expect(alice.mutation(internal.voice.reserve,{sessionId,tokenHash,attempts:3})).rejects.toThrow("processing");await alice.mutation(internal.voice.release,{sessionId});}
 await expect(alice.mutation(internal.voice.reserve,{sessionId,tokenHash,attempts:1})).rejects.toThrow("limit");
 await t.run(ctx=>ctx.db.patch(sessionId,{expiresAt:0}));await expect(alice.mutation(internal.voice.reserve,{sessionId,tokenHash,attempts:1})).rejects.toThrow("ended");
 }finally{vi.unstubAllEnvs();}
});
test("missing voice configuration fails before a paid request",async()=>{
 vi.stubEnv("SARVAM_API_KEY","");try{const t=convexTest(schema,modules);const sessionId=await t.run(ctx=>ctx.db.insert("voiceSessions",{tokenHash:"a".repeat(64),userId:null,expiresAt:Date.now()+60000,attempts:0,busyUntil:0}));const network=vi.spyOn(globalThis,"fetch");await expect(t.action(api.sarvam.say,{sessionId,token:"fictional",code:"intro",language:"te-IN"})).rejects.toThrow("key");expect(network).not.toHaveBeenCalled();network.mockRestore();}finally{vi.unstubAllEnvs();}
});

test("a transcribed answer survives model failure; no audio or AI trace is retained",async()=>{
 vi.stubEnv("SARVAM_API_KEY","fictional-key");vi.stubEnv("SARVAM_VOICE_TEST_ENABLED","true");vi.stubEnv("SARVAM_ZERO_RETENTION_CONFIRMED","true");
 const {Agent}=await import("@convex-dev/agent");
 const model=vi.spyOn(Agent.prototype,"generateText").mockRejectedValue(new Error("fictional provider failure"));
 const network=vi.spyOn(globalThis,"fetch").mockResolvedValue(new Response(JSON.stringify({transcript:"Model C60 costs 22000",language_code:"hi-IN"}),{status:200,headers:{"Content-Type":"application/json"}}));
 try{const t=convexTest(schema,modules);const {hashToken}=await import("../convex/sarvam");const token="fictional-capability";const sessionId=await t.mutation(api.voice.newSession,{tokenHash:await hashToken(token)});
 const response=await t.action(api.sarvam.turn,{sessionId,token,audio:wavBase64(new Float32Array(16000),16000),language:"te-IN",phase:"shop",turns,brief});
 expect(response.transcript).toBe("Model C60 costs 22000");expect(response.language).toBe("hi-IN");expect(response.error).toContain("captured");expect(response.audio).toBeNull();expect(network).toHaveBeenCalledTimes(1);
 expect(model.mock.calls[0][3]).toMatchObject({storageOptions:{saveMessages:"none"}});expect(model.mock.calls[0][2].prompt).not.toContain("budget 25000");
 expect(await t.run(ctx=>ctx.db.system.query("_storage").take(10))).toHaveLength(0);
 expect(await t.run(ctx=>ctx.db.get(sessionId))).toMatchObject({busyUntil:0,attempts:3});
 }finally{network.mockRestore();model.mockRestore();vi.unstubAllEnvs();}
});

test("an unconfirmed provider retention setting prevents audio processing",async()=>{
 vi.stubEnv("SARVAM_API_KEY","fictional-key");vi.stubEnv("SARVAM_VOICE_TEST_ENABLED","true");vi.stubEnv("SARVAM_ZERO_RETENTION_CONFIRMED","");
 try{const t=convexTest(schema,modules),network=vi.spyOn(globalThis,"fetch");expect(await t.query(api.voice.setup,{})).toMatchObject({ready:false});await expect(t.mutation(api.voice.newSession,{tokenHash:"a".repeat(64)})).rejects.toThrow("retention");expect(network).not.toHaveBeenCalled();network.mockRestore();}finally{vi.unstubAllEnvs();}
});

test("pausing an in-memory audio turn stops the microphone and discards its samples",async()=>{
 const {listenTurn}=await import("../src/voiceAudio");const stopped=vi.fn(),done=vi.fn(),quiet=vi.fn();
 const node=()=>({connect:vi.fn(),disconnect:vi.fn()});const processor={...node(),onaudioprocess:null as any};
 const context={state:"running",sampleRate:48000,destination:{},createMediaStreamSource:()=>node(),createScriptProcessor:()=>processor,createGain:()=>({...node(),gain:{value:1}})};
 vi.stubGlobal("navigator",{mediaDevices:{getUserMedia:vi.fn().mockResolvedValue({getTracks:()=>[{stop:stopped}]})}});
 try{const capture=await listenTurn({context,onDone:done,onQuiet:quiet,onError:vi.fn()});processor.onaudioprocess({inputBuffer:{getChannelData:()=>new Float32Array(4096).fill(0.1)}});capture.cancel();capture.finish();expect(stopped).toHaveBeenCalledTimes(1);expect(done).not.toHaveBeenCalled();expect(processor.onaudioprocess).toBeNull();expect(quiet).not.toHaveBeenCalled();}finally{vi.unstubAllGlobals();}
});
