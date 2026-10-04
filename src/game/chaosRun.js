// Chaos Run engine: plain JS (no React). The <Game /> component owns the canvas,
// and passes in the shared save/helpers (E = window.EBX) plus two callbacks:
//   opts.daily() -> boolean   opts.hud(label, disabled, ready) -> void
export function createChaosRun(canvas, E, opts) {
const cv=canvas,g=cv.getContext('2d'),W=800,H=450,GY=370;
const av=new Image(),hero=new Image();hero.src=E.HERO;let skinIdx=-1;
const TR=['#6ecbff','#ff8fc8','#ffffff','#ff8fc8','#6ecbff'];
const MSG=['still here ♡','be kind to yourself ♡','more chaos pls ♡','cuter. stronger. gayer. always.','good girls cause problems','HRT hits different ♡','silly girls change the world'];
let st='title',best=E.SV.best;
let bossT=0,nextBoss=1000,sh=0,rv=0,bi=0,RND=Math.random.bind(Math);const B=[['ERR','compiler'],['MERGE','conflict'],['PROD','is down'],['node_','modules']];function hs(k){return E.SV.sk2.includes(k)}function mb(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};let holding=false;const cc=()=>E.SV.char||0;let P={x:130,y:340,vy:0,j:0,inv:0,dash:0,dcd:0},obs=[],pk=[],parts=[],score=0,speed=5,lives=3,chaos=0,chaosT=0,spawnT=60,t=0,toast='',toastT=0,shake=0,combo=0;
function reset(){P={x:130,y:GY-30,vy:0,j:0,inv:0,dash:0,dcd:0};obs=[];pk=[];parts=[];score=0;speed=5;bossT=0;nextBoss=1000;sh=hs('ts')?1:0;rv=hs('git')?1:0;RND=opts.daily()?mb(+new Date().toISOString().slice(0,10).replace(/-/g,'')):Math.random.bind(Math);lives=3+E.SV.U.life;chaos=hs('vite')?30:0;chaosT=0;spawnT=60;combo=0;st='play';say('still here ♡')}
function say(m){toast=m;toastT=120}
function jump(){if(E.tab!=='game')return;if(st!=='play'){if(st==='title'||st==='over')reset();return}
if(P.j<(cc()===1?1:2)){P.vy=P.j?-11:-13.5;P.j++;E.snd(P.j>1?660:440,.12,'triangle');burst(P.x,P.y+28,6,'#ff8fc8')}}
function goChaos(){if(E.tab==='game'&&st==='play'&&chaos>=100&&chaosT<=0){chaosT=360+E.SV.U.dur*60;chaos=0;say('CHAOS MODE!! ✦');E.snd(880,.4,'sawtooth',.06);shake=15}}
function burst(x,y,n,c,s=3){for(let i=0;i<n;i++)parts.push({x,y,vx:(Math.random()-.5)*s*2,vy:(Math.random()-.8)*s*2,l:30+Math.random()*20,c,t:'p'})}
function spawn(){const r=RND();
if(r<.4)obs.push({k:'bug',x:W+40,y:GY-34,w:42,h:34});
else if(r<.55)obs.push({k:'cloud',x:W+40,y:GY-120-RND()*40,w:70,h:40});
else{const k=['heart','heart','heart','bow','can','flag'][RND()*6|0];const n=k==='heart'?3+(RND()*3|0):1;const by=GY-40-RND()*130;
for(let i=0;i<n;i++)pk.push({k,x:W+40+i*38,y:by-Math.sin(i/(n-1||1)*Math.PI)*40,r:14})}}
function ability(){if(st==='play'&&cc()===1&&P.dcd<=0){P.dash=22;P.dcd=100;E.snd(500,.2,'sawtooth',.06);burst(P.x,P.y,10,'#6ecbff',4)}}
function hurt(){if(P.inv>0||chaosT>0||P.dash>0)return;if(sh){sh--;P.inv=60;say('type error caught ✦');return}lives--;if(lives<=0&&rv){rv--;lives=1;say('git revert ♡')}P.inv=90;combo=0;shake=12;E.snd(120,.3,'sawtooth',.08);burst(P.x,P.y,18,'#6ecbff',4);
if(lives<=0){st='over';if(score>best){best=score|0;E.SV.best=best}E.SV.runs++;E.SV.w+=Math.floor(score/8);E.save();this_msg=MSG[Math.random()*MSG.length|0]}else say(MSG[Math.random()*MSG.length|0])}
let this_msg='';
function update(){t++;if(skinIdx!==E.SV.skin){skinIdx=E.SV.skin;av.src=E.SKINS[skinIdx]}E.chaosOn=chaosT>0;if(E.tab!=='game')return;
if(st!=='play'){parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.l--});parts=parts.filter(p=>p.l>0);return}
const sp=speed*(chaosT>0?1.5:1)*(P.dash>0?1.6:1);speed=Math.min(11,speed+.0006);
score+=sp*.05*(chaosT>0?2:1)*(hs('cpp')?1.1:1);
const glide=holding&&cc()===2&&P.vy>0;P.vy+=glide?.15:(hs('py')?.6:.7);if(glide&&P.vy>2.2)P.vy=2.2;P.y+=P.vy;if(P.y>=GY-30){P.y=GY-30;P.vy=0;P.j=0}
if(!bossT&&score>=nextBoss){bossT=720;nextBoss+=1500;bi=E.SV.boss;say(B[bi%4][0]+' '+B[bi%4][1]+'!!');shake=20;E.snd(90,.6,'sawtooth',.09)}if(bossT>0){bossT--;if(bossT%55===0)obs.push({k:'bug',x:W+40,y:GY-34,w:42,h:34});if(bi%2&&bossT%80===0)obs.push({k:'cloud',x:W+40,y:GY-130,w:70,h:40});if(bossT===0){E.SV.boss++;score+=200;E.SV.w+=25;say('bug fixed ♡ +25');E.snd(1000,.4,'sine',.08)}}if(P.inv>0)P.inv--;if(P.dash>0){P.dash--;parts.push({x:P.x-20,y:P.y+(Math.random()-.5)*20,vx:-6,vy:0,l:18,c:'#6ecbff',t:'p'})}if(P.dcd>0)P.dcd--;if(chaosT>0){chaosT--;chaos=0;if(chaosT===0)say('breathe. still here ♡')}
if(--spawnT<=0){spawn();spawnT=(Math.max(30,75-speed*3)+Math.random()*40)*(bossT>0?.55:1)}
const hb={x:P.x-20,y:P.y-20,w:40,h:44};
for(const o of obs){o.x-=sp;if(o.x+o.w>hb.x&&o.x<hb.x+hb.w&&o.y+o.h>hb.y&&o.y<hb.y+hb.h&&!o.d){if(chaosT>0||P.dash>0){o.d=1;score+=50;if(bossT>0)bossT=Math.max(1,bossT-40);burst(o.x,o.y,14,TR[t%5],5);E.snd(300,.1)}else hurt()}}
obs=obs.filter(o=>o.x>-100&&!o.d);
for(const p of pk){p.x-=sp;if((chaosT>0||E.SV.U.mag>0||hs('linux'))&&Math.hypot(p.x-P.x,p.y-P.y)<(chaosT>0?160:(E.SV.U.mag+(hs('linux')?2:0))*40)){p.x+=(P.x-p.x)*.15;p.y+=(P.y-p.y)*.15}
if(Math.hypot(p.x-P.x,p.y-P.y)<p.r+26){p.d=1;combo++;const m=chaosT>0?2:1;
if(p.k==='heart'){E.SV.hearts++;score+=10*m+combo;chaos+=(6+(hs('react')?3:0))*(1+E.SV.U.rate*.25)}else if(p.k==='flag'){sh++;say('shield ✦');score+=15}else if(p.k==='bow'){score+=30*m;chaos+=10*(1+E.SV.U.rate*.25)}else{score+=20;chaos+=30*(1+E.SV.U.rate*.25);speed=Math.min(11,speed+.4)}
if(p.k==='can')say('ESTRO FUEL ⚡');burst(p.x,p.y,8,p.k==='can'?'#6ecbff':'#ff8fc8');E.snd(700+Math.min(combo,12)*40,.08,'sine',.07)}}
pk=pk.filter(p=>p.x>-50&&!p.d);chaos=Math.min(100,chaos);
if(chaosT>0)parts.push({x:P.x-20,y:P.y+(Math.random()-.5)*30,vx:-4,vy:0,l:25,c:TR[t%5],t:'p'});
parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.l--});parts=parts.filter(p=>p.l>0);
opts.hud(chaosT>0?'CHAOS!!':'CHAOS '+(chaos|0)+'%',chaos<100||chaosT>0,chaos>=100&&chaosT<=0)}
function txt(s,x,y,sz,c='#ffe6f4',al='center'){g.font='bold '+sz+'px "Trebuchet MS",sans-serif';g.textAlign=al;g.fillStyle=c;g.shadowColor='#ff4fa8';g.shadowBlur=10;g.fillText(s,x,y);g.shadowBlur=0}
function heart(x,y,r,c){g.fillStyle=c;g.beginPath();g.moveTo(x,y+r*.9);g.bezierCurveTo(x-r*1.6,y-r*.2,x-r*.7,y-r*1.3,x,y-r*.4);g.bezierCurveTo(x+r*.7,y-r*1.3,x+r*1.6,y-r*.2,x,y+r*.9);g.fill()}
function draw(){if(E.tab!=='game')return;const TH=E.THEMES[E.SV.theme||0];g.save();if(shake>0){g.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake*=.85}
const ch=chaosT>0,sc=t*(st==='play'?speed:2);
let gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,ch?'#2a0a4a':TH.sky[0]);gr.addColorStop(1,TH.sky[1]);g.fillStyle=gr;g.fillRect(-20,-20,W+40,H+40);
g.fillStyle=TH.moon;g.globalAlpha=.85;g.beginPath();g.arc(620,90,50,0,7);g.fill();g.globalAlpha=1;
for(let l=0;l<2;l++){g.fillStyle=l?TH.near:TH.far;for(let i=0;i<14;i++){const bw=70+(i*37%40),bh=90+((i*53)%120)+l*50,x=((i*110-sc*(.15+l*.2))%1540+1540)%1540-120;g.fillRect(x,GY-bh,bw,bh);
g.fillStyle=l?TH.win2:TH.win1;for(let k=0;k<6;k++)if((i*7+k*3)%5<2)g.fillRect(x+8+(k%3)*20,GY-bh+14+((k/3)|0)*30,8,10);g.fillStyle=l?TH.near:TH.far}}
g.fillStyle=TH.ground;g.fillRect(-20,GY,W+40,H);
g.strokeStyle=ch?TR[(t>>2)%5]:TH.line;g.lineWidth=3;g.shadowColor=g.strokeStyle;g.shadowBlur=14;g.beginPath();g.moveTo(-20,GY);g.lineTo(W+20,GY);g.stroke();g.shadowBlur=0;
g.lineWidth=1;g.globalAlpha=.3;for(let i=0;i<20;i++){const x=((i*60-sc*1.5)%1200+1200)%1200-60;g.beginPath();g.moveTo(x,GY);g.lineTo(x-80,H);g.stroke()}g.globalAlpha=1;
for(const p of pk){if(p.k==='heart')heart(p.x,p.y,p.r*.8,'#ff6fb5');else if(p.k==='bow'){g.fillStyle='#ff8fc8';g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x-16,p.y-10);g.lineTo(p.x-16,p.y+10);g.closePath();g.fill();g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x+16,p.y-10);g.lineTo(p.x+16,p.y+10);g.closePath();g.fill()}
else if(p.k==='flag'){TR.forEach((c,i)=>{g.fillStyle=c;g.fillRect(p.x-14,p.y-10+i*4,28,4)})}else{g.fillStyle='#111';g.strokeStyle='#6ecbff';g.lineWidth=2;g.fillRect(p.x-9,p.y-15,18,30);g.strokeRect(p.x-9,p.y-15,18,30);txt('⚡',p.x,p.y+6,14,'#6ecbff')}}
for(const o of obs){if(o.k==='bug'){g.fillStyle='#000';g.strokeStyle='#6ecbff';g.lineWidth=2;g.fillRect(o.x,o.y,o.w,o.h);g.strokeRect(o.x,o.y,o.w,o.h);txt('x_x',o.x+o.w/2,o.y+23,16,'#6ecbff');txt('BUG',o.x+o.w/2,o.y-5,11,'#ff8fc8')}
else{g.fillStyle='#2b1a45';g.beginPath();g.ellipse(o.x+35,o.y+20,36,20,0,0,7);g.fill();txt('doom',o.x+35,o.y+25,13,'#9a7bd1')}}
if(bossT>0){const bx=W-110,by=130+Math.sin(t/20)*25;g.fillStyle='#000';g.strokeStyle=TR[(t>>3)%5];g.lineWidth=3;g.fillRect(bx-70,by-50,140,100);g.strokeRect(bx-70,by-50,140,100);txt(B[bi%4][0],bx,by-2,30,'#ff4f7a');txt(B[bi%4][1],bx,by+24,13,'#6ecbff');g.fillStyle='#2a1445';g.fillRect(bx-70,by-68,140,8);g.fillStyle='#ff8fc8';g.fillRect(bx-70,by-68,140*bossT/720,8)}
for(const p of parts){g.globalAlpha=Math.max(0,p.l/40);g.fillStyle=p.c;g.fillRect(p.x,p.y,5,5)}g.globalAlpha=1;
if(st!=='title'){if(P.inv%8<4){g.save();g.translate(P.x,P.y);g.rotate(Math.max(-.4,Math.min(.4,P.vy*.03)));
g.shadowColor=ch?TR[(t>>2)%5]:'#ff4fa8';g.shadowBlur=ch?30:16;g.beginPath();g.arc(0,0,30,0,7);g.fillStyle='#fff';g.fill();g.clip();
try{g.drawImage(av,-30,-30,60,60)}catch(e){}g.restore();g.strokeStyle=ch?TR[(t>>1)%5]:['#ff8fc8','#6ecbff','#ffffff'][cc()];g.lineWidth=3;g.beginPath();g.arc(P.x,P.y,30,0,7);g.stroke()}
if(cc()===1){g.fillStyle='#2a1445';g.fillRect(20,68,150,6);g.fillStyle=P.dcd<=0?'#6ecbff':'#6a3a90';g.fillRect(20,68,150*(1-Math.max(0,P.dcd)/100),6);txt(P.dcd<=0?'DASH ready (D)':'dash...',20,90,11,'#6ecbff','left')}
if(cc()===2)txt('hold jump = glide',20,86,11,'#ffffff','left');
for(let i=0;i<3+E.SV.U.life;i++)heart(30+i*26,32,9,i<lives?'#ff6fb5':'#3a2050');
txt('SCORE '+(score|0),W-20,36,22,'#ffe6f4','right');txt('BEST '+best,W-20,58,13,'#ff8fc8','right');
g.fillStyle='#2a1445';g.fillRect(20,52,150,10);g.fillStyle=ch?TR[(t>>2)%5]:'#6ecbff';g.fillRect(20,52,ch?150*chaosT/360:150*chaos/100,10);
if(sh)txt('✦ shield x'+sh,P.x,P.y+55,12,'#6ecbff');if(combo>2)txt('x'+combo+' combo',P.x,P.y-50,16,'#6ecbff');
if(toastT>0){toastT--;g.globalAlpha=Math.min(1,toastT/30);txt(toast,W/2,110,24,'#ff8fc8');g.globalAlpha=1}}
if(st==='title'||st==='over'){g.fillStyle='#0b0615dd';g.fillRect(0,0,W,H);
try{g.save();g.beginPath();g.arc(W/2,130,75,0,7);g.clip();g.drawImage(hero,W/2-75,55,150,150);g.restore()}catch(e){}
g.strokeStyle='#ff8fc8';g.lineWidth=4;g.beginPath();g.arc(W/2,130,75,0,7);g.stroke();
if(st==='title'){txt('EstroBunny_XO',W/2,250,38,'#ff8fc8');txt('CHAOS RUN',W/2,285,24,'#6ecbff');txt('hop · collect hearts · dodge bugs & doom · stay here ♡',W/2,320,15)}
else{txt('GAME OVER',W/2,250,34,'#ff8fc8');txt('score '+(score|0)+'  ·  best '+best,W/2,282,20);txt(this_msg,W/2,312,16,'#6ecbff')}
if(t%60<40)txt('tap / press SPACE to '+(st==='title'?'start':'try again'),W/2,370,18)}
if(ch){for(let i=0;i<3;i++){const y=Math.random()*H|0,h=8+Math.random()*30|0,o=(Math.random()-.5)*30;g.drawImage(cv,0,y,W,h,o,y,W,h)}}g.restore()}
function share(){const c=document.createElement('canvas');c.width=600;c.height=340;const x=c.getContext('2d'),gr=x.createLinearGradient(0,0,600,340);gr.addColorStop(0,'#2a0a4a');gr.addColorStop(1,'#ff4fa8');x.fillStyle=gr;x.fillRect(0,0,600,340);TR.forEach((k,i)=>{x.fillStyle=k;x.fillRect(0,i*6,600,6)});x.save();x.beginPath();x.arc(110,170,70,0,7);x.clip();try{x.drawImage(av,40,100,140,140)}catch(e){}x.restore();x.strokeStyle='#fff';x.lineWidth=4;x.beginPath();x.arc(110,170,70,0,7);x.stroke();x.fillStyle='#fff';x.font='bold 30px sans-serif';x.fillText('EstroBunny_XO',210,120);x.font='20px sans-serif';x.fillText('CHAOS RUN'+(opts.daily()?' · DAILY':''),210,150);x.font='bold 56px sans-serif';x.fillText((score|0)+' pts',210,225);x.font='18px sans-serif';x.fillText('best '+E.SV.best+'  ·  bosses beaten '+E.SV.boss,210,260);x.fillText('still here ♡',210,300);return c.toDataURL('image/png')}
let raf=0;
function loop(){update();draw();raf=requestAnimationFrame(loop)}raf=requestAnimationFrame(loop);
const onKey=e=>{if(e.target.tagName==='INPUT')return;if(e.code==='Space'||e.code==='ArrowUp'){if(E.tab==='game')e.preventDefault();holding=true;if(!e.repeat)jump()}if(E.tab==='game'&&(e.code==='KeyD'||e.code==='ArrowRight'||e.code==='KeyX'))ability();if(e.code==='KeyC'||e.code==='ShiftLeft')goChaos()};
const onPtr=e=>{e.preventDefault();holding=true;jump()};const onUp=()=>{holding=false};const onKeyUp=e=>{if(e.code==='Space'||e.code==='ArrowUp')holding=false};
addEventListener('keydown',onKey);cv.addEventListener('pointerdown',onPtr);addEventListener('pointerup',onUp);addEventListener('keyup',onKeyUp);
return {goChaos,share,ability,destroy(){cancelAnimationFrame(raf);removeEventListener('keydown',onKey);removeEventListener('pointerup',onUp);removeEventListener('keyup',onKeyUp);cv.removeEventListener('pointerdown',onPtr)}};
}
