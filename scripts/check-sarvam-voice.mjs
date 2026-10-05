// Paid development check. Audio is held in memory only. Requires explicit allowance.
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api.js';
import { randomBytes, createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
if(process.env.APPROVED_VOICE_CHECK !== 'true') throw new Error('Get a paid-test allowance first; set APPROVED_VOICE_CHECK=true for this bounded check.');
const client = new ConvexHttpClient('https://effervescent-kingfisher-446.convex.cloud');
assert.equal((await client.query(api.voice.setup, {})).ready, true);
const token = randomBytes(32).toString('hex');
const sessionId = await client.mutation(api.voice.newSession, {tokenHash:createHash('sha256').update(token).digest('hex')});
for(const language of ['hi-IN','te-IN']) {
 const start=Date.now();
 const spoken=await client.action(api.sarvam.say,{sessionId,token,code:'price',language});
 const wav=spawnSync('ffmpeg',['-loglevel','error','-i','pipe:0','-ac','1','-ar','16000','-f','s16le','pipe:1'],{input:Buffer.from(spoken.audio,'base64'),maxBuffer:2000000});
 assert.equal(wav.status,0,'In-memory audio conversion failed');
 const pcm=wav.stdout,header=Buffer.alloc(44);header.write('RIFF');header.writeUInt32LE(36+pcm.length,4);header.write('WAVEfmt ',8);header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);header.writeUInt16LE(1,22);header.writeUInt32LE(16000,24);header.writeUInt32LE(32000,28);header.writeUInt16LE(2,32);header.writeUInt16LE(16,34);header.write('data',36);header.writeUInt32LE(pcm.length,40);
 const result=await client.action(api.sarvam.turn,{sessionId,token,language,phase:'shop',audio:Buffer.concat([header,pcm]).toString('base64'),turns:[],brief:{item:'kitchen chimney',budget:20000,situation:''}});
 console.log(JSON.stringify({language,transcript:result.transcript,code:result.code,error:result.error,audioReturned:!!result.audio,milliseconds:Date.now()-start}));
 assert.equal(result.error,null,'Voice turn did not finish');
 assert.ok(result.transcript.trim(),'Speech was not transcribed');
 assert.equal(result.facts.length,0,'An enquiry question must not become an offer fact');
 assert.ok(result.audio || result.code==='review','Next question has no speech');
}
