// node render.js page.html out.mp4 startFrame endFrame fps cues.json
const {chromium}=require('playwright');const {spawn}=require('child_process');const fs=require('fs');
(async()=>{const [src,out,s,e,fps,cues]=process.argv.slice(2);const F=+fps;
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+src);await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
if(cues)fs.writeFileSync(cues,JSON.stringify(await p.evaluate(()=>({cues:window.CUES,total:window.DURATION}))));
await p.evaluate(()=>document.getAnimations().forEach(a=>a.pause()));
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',''+F,'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p',out],{stdio:['pipe','ignore','inherit']});
for(let f=+s;f<+e;f++){const t=f*1000/F;
 await p.evaluate(t=>document.getAnimations().forEach(a=>{a.currentTime=t}),t);
 const buf=await p.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();})();
