// Audio exists only in memory, never in a file or a device draft.
export function wavBase64(samples, rate) {
  const length=Math.floor(samples.length*16000/rate), buffer=new ArrayBuffer(44+length*2),view=new DataView(buffer);
  const write=(offset,text)=>{for(let i=0;i<text.length;i++)view.setUint8(offset+i,text.charCodeAt(i));};
  write(0,'RIFF');view.setUint32(4,36+length*2,true);write(8,'WAVE');write(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,16000,true);view.setUint32(28,32000,true);view.setUint16(32,2,true);view.setUint16(34,16,true);write(36,'data');view.setUint32(40,length*2,true);
  for(let i=0;i<length;i++){const start=Math.floor(i*rate/16000),end=Math.max(start+1,Math.floor((i+1)*rate/16000));let value=0;for(let j=start;j<end&&j<samples.length;j++)value+=samples[j];value=Math.max(-1,Math.min(1,value/(end-start)));view.setInt16(44+i*2,value<0?value*32768:value*32767,true);}
  const bytes=new Uint8Array(buffer);let raw='';for(let i=0;i<bytes.length;i+=8192)raw+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(raw);
}
export async function listenTurn({context,onDone,onQuiet,onError}) {
  const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true},video:false});
  const source=context.createMediaStreamSource(stream),processor=context.createScriptProcessor(4096,1,1),sink=context.createGain();sink.gain.value=0;
  source.connect(processor);processor.connect(sink);sink.connect(context.destination);
  let chunks=[],count=0,heard=false,quietAt=performance.now(),done=false;const started=performance.now();
  function stop(submit=false){if(done)return;done=true;clearTimeout(deadline);processor.onaudioprocess=null;source.disconnect();processor.disconnect();sink.disconnect();stream.getTracks().forEach(t=>t.stop());if(submit&&heard){const samples=new Float32Array(count);let n=0;for(const c of chunks){samples.set(c,n);n+=c.length;}const audio=wavBase64(samples,context.sampleRate);chunks=[];onDone(audio);}else{chunks=[];if(submit)onQuiet();}}
  const deadline=setTimeout(()=>stop(true),23000);
  processor.onaudioprocess=e=>{
    const samples=e.inputBuffer.getChannelData(0),copy=new Float32Array(samples);chunks.push(copy);count+=copy.length;
    const rms=Math.sqrt(samples.reduce((n,s)=>n+s*s,0)/samples.length),now=performance.now();
    if(rms>0.018){heard=true;quietAt=now;}
    if(heard&&now-quietAt>1600&&now-started>1200)stop(true);
    if(context.state==='closed'){stop();onError();}
  };
  return {cancel:()=>stop(false),finish:()=>stop(true)};
}

// Remove callbacks before clearing the source: clearing it can itself emit a media error.
export function discardPlayback(audio) {
  audio.onended = null;
  audio.onerror = null;
  audio.pause();
  audio.removeAttribute('src');
  audio.load();
}
