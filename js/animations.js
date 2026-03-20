// ================================================================
// MANDIR ANIMATION ENGINE v3 — Master Visual Effects System
// Festival FX | Particles | Diya | Mandala | Galaxy | Aura | More
// ================================================================

// ── Colour palettes ──────────────────────────────────────────────
const PALETTE = {
  festival:['#FF6B35','#FFD700','#FF1493','#00CED1','#7FFF00','#FF4500','#DA70D6','#1E90FF'],
  holi:    ['#FF6B35','#FF1493','#7FFF00','#00CED1','#FFD700','#9400D3','#FF4500'],
  diwali:  ['#FFD700','#FF6B35','#FF4500','#FFF8DC','#FFFACD','#FF8C00'],
  janma:   ['#FF69B4','#DA70D6','#FFB6C1','#FFC0CB','#FF1493','#DDA0DD','#E6E6FA'],
  krishna: ['#4169E1','#9400D3','#FFD700','#FF69B4','#00CED1'],
  shiva:   ['#FF4500','#FF6B35','#FFD700','#FFF8DC','#B8860B'],
  lotus:   ['#FF69B4','#FFB6C1','#FFC0CB','#FF1493','#fff'],
  rainbow: ['#FF0000','#FF7F00','#FFFF00','#00FF00','#0000FF','#8B00FF'],
  galaxy:  ['#4169E1','#9400D3','#00CED1','#FFD700','#fff','#E6E6FA'],
  gold:    ['#FFD700','#FFA500','#FF8C00','#DAA520','#B8860B'],
};

// ── Utility ──────────────────────────────────────────────────────
const rnd  = (a,b)=>Math.random()*(b-a)+a;
const pick = arr=>arr[Math.floor(Math.random()*arr.length)];
const tau  = Math.PI*2;

// ================================================================
// 1. GALAXY BACKGROUND + ROTATING MANDALA + OM GLOW
// ================================================================
class GalaxyBackground {
  constructor(canvasId){
    this.c=document.getElementById(canvasId);
    if(!this.c)return;
    this.ctx=this.c.getContext('2d');
    this.stars=[]; this.nebulae=[];
    this.mandalaAngle=0;
    this.resize(); window.addEventListener('resize',()=>this.resize());
    this._initStars(); this._initNebulae();
    this._tick();
  }
  resize(){
    if(!this.c)return;
    this.c.width=window.innerWidth; this.c.height=window.innerHeight;
    this.W=this.c.width; this.H=this.c.height;
  }
  _initStars(){
    this.stars=Array.from({length:220},()=>({
      x:rnd(0,window.innerWidth), y:rnd(0,window.innerHeight),
      r:rnd(0.3,2.2), a:rnd(0.2,0.9), phase:rnd(0,tau),
      speed:rnd(0.003,0.015), color:pick(PALETTE.galaxy)
    }));
  }
  _initNebulae(){
    this.nebulae=Array.from({length:6},()=>({
      x:rnd(0,window.innerWidth), y:rnd(0,window.innerHeight),
      r:rnd(80,200), color:pick(PALETTE.galaxy), a:rnd(0.02,0.06)
    }));
  }
  _drawMandala(t){
    const ctx=this.ctx, cx=this.W/2, cy=this.H/2;
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(this.mandalaAngle);
    const rings=7, petals=12;
    for(let ring=1;ring<=rings;ring++){
      const radius=ring*28;
      for(let p=0;p<petals;p++){
        const angle=(p/petals)*tau;
        const hue=(ring*40+p*30+t*20)%360;
        ctx.save(); ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(radius,0,10,5,0,0,tau);
        ctx.strokeStyle=`hsla(${hue},80%,70%,${0.06+ring*0.008})`;
        ctx.lineWidth=0.5; ctx.stroke();
        ctx.restore();
      }
      // ring circle
      ctx.beginPath(); ctx.arc(0,0,radius,0,tau);
      const hue=(ring*50+t*15)%360;
      ctx.strokeStyle=`hsla(${hue},70%,60%,0.04)`;
      ctx.lineWidth=0.5; ctx.stroke();
    }
    // OM at center
    ctx.font='bold 52px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillStyle=`hsla(${(t*20)%360},80%,70%,0.07)`;
    ctx.shadowBlur=30; ctx.shadowColor=`hsla(${(t*20)%360},80%,70%,0.5)`;
    ctx.fillText('ॐ',0,4);
    ctx.restore();
    this.mandalaAngle+=0.0008;
  }
  _tick(){
    if(!this.c)return;
    const ctx=this.ctx, t=Date.now()*0.001;
    ctx.clearRect(0,0,this.W,this.H);
    // Nebulae
    this.nebulae.forEach(n=>{
      const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);
      g.addColorStop(0,n.color.replace(')',`,${n.a*2})`).replace('rgb','rgba')||`rgba(100,50,200,${n.a*2})`);
      g.addColorStop(1,'transparent');
      ctx.fillStyle=n.color; ctx.globalAlpha=n.a;
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,tau); ctx.fill();
      ctx.globalAlpha=1;
    });
    // Stars
    this.stars.forEach(s=>{
      s.phase+=s.speed;
      const a=s.a*(0.4+0.6*Math.sin(s.phase));
      ctx.save(); ctx.globalAlpha=a;
      ctx.shadowBlur=s.r*4; ctx.shadowColor=s.color;
      ctx.fillStyle=s.color; ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,tau); ctx.fill();
      ctx.restore();
    });
    // Mandala
    this._drawMandala(t);
    requestAnimationFrame(()=>this._tick());
  }
}

// ================================================================
// 2. COLORFUL PETAL RAIN (Enhanced from v2)
// ================================================================
class PetalRain {
  constructor(canvasId,options={}){
    this.c=document.getElementById(canvasId);
    if(!this.c)return;
    this.ctx=this.c.getContext('2d');
    this.palette=options.palette||PALETTE.festival;
    this.count=options.count||50;
    this.petals=[]; this.sparkles=[];
    this.resize(); window.addEventListener('resize',()=>this.resize());
    this._init(); this._tick();
  }
  resize(){ if(!this.c)return; this.c.width=window.innerWidth; this.c.height=window.innerHeight; this.W=this.c.width; this.H=this.c.height; }
  _mkPetal(){
    const col=pick(this.palette);
    return{ x:rnd(0,this.W), y:rnd(-60,-10), size:rnd(5,13),
      vx:rnd(-0.8,0.8), vy:rnd(0.5,2),
      rot:rnd(0,tau), rotV:rnd(-0.05,0.05),
      alpha:rnd(0.4,0.85), shape:Math.floor(rnd(0,4)),
      col, sw:rnd(0.02,0.04), swO:rnd(0,tau), glow:rnd(3,10) };
  }
  _init(){ for(let i=0;i<this.count;i++){const p=this._mkPetal();p.y=rnd(0,this.H);this.petals.push(p);} }
  _drawPetal(p,t){
    const ctx=this.ctx, x=p.x+Math.sin(t*p.sw+p.swO)*40;
    ctx.save(); ctx.translate(x,p.y); ctx.rotate(p.rot);
    ctx.globalAlpha=p.alpha; ctx.shadowBlur=p.glow*2; ctx.shadowColor=p.col;
    ctx.fillStyle=p.col; ctx.strokeStyle=p.col+'88'; ctx.lineWidth=0.5;
    ctx.beginPath();
    if(p.shape===0){ ctx.ellipse(0,0,p.size,p.size*.55,0,0,tau); }
    else if(p.shape===1){ ctx.moveTo(0,-p.size);ctx.bezierCurveTo(p.size*.7,-p.size*.3,p.size*.7,p.size*.3,0,p.size);ctx.bezierCurveTo(-p.size*.7,p.size*.3,-p.size*.7,-p.size*.3,0,-p.size); }
    else if(p.shape===2){ for(let i=0;i<5;i++){const a=i/5*tau-Math.PI/2,ia=a+Math.PI/5;if(!i)ctx.moveTo(Math.cos(a)*p.size,Math.sin(a)*p.size);else ctx.lineTo(Math.cos(a)*p.size,Math.sin(a)*p.size);ctx.lineTo(Math.cos(ia)*p.size*.38,Math.sin(ia)*p.size*.38);}ctx.closePath(); }
    else{ ctx.moveTo(0,-p.size);ctx.lineTo(p.size*.5,0);ctx.lineTo(0,p.size*.7);ctx.lineTo(-p.size*.5,0);ctx.closePath(); }
    ctx.fill(); ctx.stroke(); ctx.restore();
  }
  _tick(){
    if(!this.c)return;
    const t=Date.now()*.001; const ctx=this.ctx;
    ctx.clearRect(0,0,this.W,this.H);
    this.petals.forEach((p,i)=>{
      p.y+=p.vy; p.x+=p.vx; p.rot+=p.rotV;
      this._drawPetal(p,t);
      if(p.y>this.H+20)this.petals[i]=this._mkPetal();
    });
    requestAnimationFrame(()=>this._tick());
  }
  burst(x,y,count=30){
    for(let i=0;i<count;i++){
      const p=this._mkPetal();
      p.x=x; p.y=y; p.vy=rnd(-6,0); p.vx=rnd(-4,4); p.alpha=0.9;
      this.petals.push(p);
    }
  }
}

// ================================================================
// 3. FESTIVAL FIREWORKS (Diwali)
// ================================================================
class Fireworks {
  constructor(canvasId){
    this.c=document.getElementById(canvasId)||this._makeCanvas();
    this.ctx=this.c.getContext('2d');
    this.rockets=[]; this.explosions=[];
    this.W=window.innerWidth; this.H=window.innerHeight;
    this.c.width=this.W; this.c.height=this.H;
    window.addEventListener('resize',()=>{this.W=window.innerWidth;this.H=window.innerHeight;this.c.width=this.W;this.c.height=this.H;});
  }
  _makeCanvas(){
    const c=document.createElement('canvas');
    c.id='fireworks-canvas';
    c.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:999;';
    document.body.appendChild(c); return c;
  }
  _launch(){
    this.rockets.push({x:rnd(this.W*.1,this.W*.9),y:this.H,tx:rnd(this.W*.1,this.W*.9),ty:rnd(this.H*.1,this.H*.4),speed:rnd(8,14),trail:[],color:pick(PALETTE.diwali)});
  }
  _explode(x,y,color){
    const count=rnd(60,120);
    for(let i=0;i<count;i++){
      const a=rnd(0,tau), spd=rnd(2,10);
      this.explosions.push({x,y,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd,life:1,color,size:rnd(1.5,4),glow:rnd(5,15),type:Math.floor(rnd(0,3))});
    }
  }
  _tick(){
    const ctx=this.ctx;
    ctx.fillStyle='rgba(0,0,0,0.18)'; ctx.fillRect(0,0,this.W,this.H);
    // Rockets
    this.rockets.forEach((r,i)=>{
      const dx=r.tx-r.x, dy=r.ty-r.y, dist=Math.sqrt(dx*dx+dy*dy);
      r.x+=dx/dist*r.speed; r.y+=dy/dist*r.speed;
      r.trail.push({x:r.x,y:r.y});
      if(r.trail.length>12)r.trail.shift();
      r.trail.forEach((pt,ti)=>{
        ctx.save(); ctx.globalAlpha=ti/r.trail.length*0.7;
        ctx.fillStyle=r.color; ctx.shadowBlur=8; ctx.shadowColor=r.color;
        ctx.beginPath(); ctx.arc(pt.x,pt.y,2,0,tau); ctx.fill(); ctx.restore();
      });
      if(dist<r.speed*1.5){ this._explode(r.x,r.y,r.color); this.rockets.splice(i,1); }
    });
    // Explosions
    for(let i=this.explosions.length-1;i>=0;i--){
      const e=this.explosions[i];
      e.x+=e.vx; e.y+=e.vy; e.vy+=0.12; e.vx*=0.98; e.life-=0.018;
      if(e.life<=0){this.explosions.splice(i,1);continue;}
      ctx.save(); ctx.globalAlpha=e.life*0.85;
      ctx.shadowBlur=e.glow; ctx.shadowColor=e.color; ctx.fillStyle=e.color;
      ctx.beginPath(); ctx.arc(e.x,e.y,e.size*e.life,0,tau); ctx.fill();
      ctx.restore();
    }
  }
  start(duration=8000){
    this.c.style.display='block';
    const interval=setInterval(()=>this._launch(),350);
    const anim=()=>{ this._tick(); this._raf=requestAnimationFrame(anim); };
    anim();
    setTimeout(()=>{ clearInterval(interval); setTimeout(()=>{ cancelAnimationFrame(this._raf); ctx.clearRect(0,0,this.W,this.H); this.c.style.display='none'; },3000); },duration);
  }
}

// ================================================================
// 4. HOLI COLOR SPLASH
// ================================================================
class HoliSplash {
  constructor(){
    this.c=document.createElement('canvas');
    this.c.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:998;';
    document.body.appendChild(this.c);
    this.ctx=this.c.getContext('2d');
    this.blobs=[]; this.active=false;
    this.c.width=window.innerWidth; this.c.height=window.innerHeight;
  }
  burst(x,y){
    const colors=PALETTE.holi;
    for(let i=0;i<25;i++){
      const a=rnd(0,tau), spd=rnd(5,18), col=pick(colors);
      this.blobs.push({x,y,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd,r:rnd(8,28),life:1,color:col,rot:rnd(0,tau),rotV:rnd(-0.1,0.1)});
    }
    if(!this.active)this._tick();
  }
  _tick(){
    this.active=true;
    const ctx=this.ctx; ctx.clearRect(0,0,this.c.width,this.c.height);
    for(let i=this.blobs.length-1;i>=0;i--){
      const b=this.blobs[i];
      b.x+=b.vx; b.y+=b.vy; b.vy+=0.3; b.vx*=0.95; b.life-=0.022;
      if(b.life<=0){this.blobs.splice(i,1);continue;}
      ctx.save(); ctx.globalAlpha=b.life; ctx.fillStyle=b.color;
      ctx.shadowBlur=b.r*0.6; ctx.shadowColor=b.color;
      ctx.translate(b.x,b.y); ctx.rotate(b.rot); b.rot+=b.rotV;
      // Paint blob shape
      ctx.beginPath();
      ctx.ellipse(0,0,b.r,b.r*0.65,0,0,tau); ctx.fill();
      ctx.restore();
    }
    if(this.blobs.length>0) requestAnimationFrame(()=>this._tick());
    else{ this.active=false; ctx.clearRect(0,0,this.c.width,this.c.height); }
  }
}

// ================================================================
// 5. DIGITAL DIYA LIGHTING
// ================================================================
class DiyaEffect {
  constructor(container){
    this.el=typeof container==='string'?document.getElementById(container):container;
    if(!this.el)return;
    this._setup();
  }
  _setup(){
    this.el.style.position='relative'; this.el.style.cursor='pointer';
    const flame=document.createElement('div');
    flame.innerHTML=`<svg viewBox="0 0 40 60" width="40" height="60" style="display:block">
      <defs>
        <radialGradient id="dg${Date.now()}" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stop-color="#FFF8DC"/>
          <stop offset="40%" stop-color="#FFD700"/>
          <stop offset="70%" stop-color="#FF6B00"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="50" rx="12" ry="6" fill="#B8860B"/>
      <path d="M20 8 Q30 22 26 38 Q20 44 14 38 Q10 22 20 8Z" fill="url(#dg${Date.now()})"/>
      <ellipse cx="20" cy="14" rx="3" ry="5" fill="#FFF8DC" opacity="0.85"/>
    </svg>`;
    flame.style.cssText=`position:absolute;top:-55px;left:50%;transform:translateX(-50%);pointer-events:none;animation:flicker 0.15s ease-in-out infinite alternate;filter:drop-shadow(0 0 12px #FFD700) drop-shadow(0 0 25px #FF6B00);display:none;`;
    this.el.appendChild(flame);
    this.flame=flame; this.lit=false;
    this.el.addEventListener('click',()=>this.toggle());
    // Glow ring
    const ring=document.createElement('div');
    ring.style.cssText='position:absolute;inset:-6px;border-radius:50%;pointer-events:none;display:none;';
    this.el.appendChild(ring); this.ring=ring;
  }
  toggle(){
    this.lit=!this.lit;
    this.flame.style.display=this.lit?'block':'none';
    this.ring.style.cssText+=this.lit?';box-shadow:0 0 20px 8px #FFD70066,0 0 40px 15px #FF6B0044;display:block;animation:ringPulse 1.5s ease-in-out infinite;':'';
    if(!this.lit)this.ring.style.display='none';
    if(window.mandirAudio&&this.lit)window.mandirAudio.playBell();
  }
}

// ================================================================
// 6. MOUSE PARTICLE TRAIL
// ================================================================
class MouseTrail {
  constructor(){
    this.c=document.createElement('canvas');
    this.c.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9997;';
    document.body.appendChild(this.c);
    this.ctx=this.c.getContext('2d');
    this.particles=[]; this.mx=0; this.my=0;
    this.c.width=window.innerWidth; this.c.height=window.innerHeight;
    window.addEventListener('resize',()=>{this.c.width=window.innerWidth;this.c.height=window.innerHeight;});
    document.addEventListener('mousemove',e=>{this.mx=e.clientX;this.my=e.clientY;this._spawn();});
    this._tick();
  }
  _spawn(){
    for(let i=0;i<3;i++){
      this.particles.push({
        x:this.mx+rnd(-5,5), y:this.my+rnd(-5,5),
        vx:rnd(-1.5,1.5), vy:rnd(-3,-0.5),
        life:1, size:rnd(2,6), color:pick(PALETTE.festival)
      });
    }
  }
  _tick(){
    const ctx=this.ctx; ctx.clearRect(0,0,this.c.width,this.c.height);
    for(let i=this.particles.length-1;i>=0;i--){
      const p=this.particles[i];
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.05; p.life-=0.03;
      if(p.life<=0){this.particles.splice(i,1);continue;}
      ctx.save(); ctx.globalAlpha=p.life;
      ctx.shadowBlur=8; ctx.shadowColor=p.color; ctx.fillStyle=p.color;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size*p.life,0,tau); ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(()=>this._tick());
  }
}

// ================================================================
// 7. FLOATING BLESSINGS TEXT
// ================================================================
class FloatingBlessings {
  constructor(canvasId){
    this.c=document.getElementById(canvasId);
    if(!this.c)return;
    this.ctx=this.c.getContext('2d');
    this.texts=[]; this.W=window.innerWidth; this.H=window.innerHeight;
    this.c.width=this.W; this.c.height=this.H;
    window.addEventListener('resize',()=>{this.W=window.innerWidth;this.H=window.innerHeight;this.c.width=this.W;this.c.height=this.H;});
    this._pool=['হরে কৃষ্ণ','জয় শ্রী রাধা','ওম নমঃ শিবায়','রাধে রাধে','জয় মা দুর্গা','হরে রাম','সর্বে সুখিনো ভবন্তু','ওম শান্তি'];
    this._init(); this._tick();
  }
  _mkText(){
    return{ x:rnd(50,this.W-100), y:this.H+30, text:pick(this._pool),
      vy:rnd(0.3,0.8), vx:rnd(-0.2,0.2), alpha:0, maxA:rnd(0.2,0.45),
      size:rnd(11,18), color:pick(PALETTE.gold), phase:rnd(0,tau) };
  }
  _init(){ for(let i=0;i<8;i++){const t=this._mkText();t.y=rnd(0,this.H);this.texts.push(t);} }
  _tick(){
    if(!this.c)return;
    const ctx=this.ctx, t=Date.now()*.001;
    ctx.clearRect(0,0,this.W,this.H);
    this.texts.forEach((tx,i)=>{
      tx.y-=tx.vy; tx.x+=tx.vx; tx.phase+=0.02;
      tx.alpha=Math.min(tx.maxA,(tx.H-tx.y)/200*tx.maxA);
      if(tx.y<-30)this.texts[i]=this._mkText();
      ctx.save(); ctx.globalAlpha=tx.alpha*(0.7+0.3*Math.sin(tx.phase));
      ctx.shadowBlur=15; ctx.shadowColor=tx.color;
      ctx.fillStyle=tx.color; ctx.font=`${tx.size}px 'Noto Serif Bengali',serif`;
      ctx.textAlign='center'; ctx.fillText(tx.text,tx.x,tx.y);
      ctx.restore();
    });
    requestAnimationFrame(()=>this._tick());
  }
}

// ================================================================
// 8. AUDIO VISUALIZER PARTICLES
// ================================================================
class AudioVisualizer {
  constructor(audioCtx,analyser,canvasId){
    this.audioCtx=audioCtx; this.analyser=analyser;
    this.c=document.getElementById(canvasId)||document.createElement('canvas');
    if(!this.c.id){ this.c.id='av-canvas'; this.c.style.cssText='position:fixed;bottom:0;left:0;width:100%;height:80px;pointer-events:none;z-index:100;opacity:0.6;'; document.body.appendChild(this.c); }
    this.ctx=this.c.getContext('2d');
    this.W=window.innerWidth; this.H=80;
    this.c.width=this.W; this.c.height=this.H;
    this.bufferLength=analyser.frequencyBinCount;
    this.dataArray=new Uint8Array(this.bufferLength);
    this._tick();
  }
  _tick(){
    if(!this.analyser)return;
    this.analyser.getByteFrequencyData(this.dataArray);
    const ctx=this.ctx; ctx.clearRect(0,0,this.W,this.H);
    const barW=(this.W/this.bufferLength)*2.5; let x=0;
    for(let i=0;i<this.bufferLength;i++){
      const barH=(this.dataArray[i]/255)*this.H;
      const hue=(i/this.bufferLength)*360;
      ctx.fillStyle=`hsla(${hue},90%,65%,0.8)`;
      ctx.shadowBlur=6; ctx.shadowColor=`hsla(${hue},90%,65%,0.5)`;
      ctx.fillRect(x,this.H-barH,barW,barH);
      x+=barW+1;
    }
    requestAnimationFrame(()=>this._tick());
  }
}

// ================================================================
// 9. RAINBOW BLESSING BURST (click deity)
// ================================================================
function rainbowBurst(x,y,count=80){
  const c=document.createElement('canvas');
  c.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9998;';
  document.body.appendChild(c);
  c.width=window.innerWidth; c.height=window.innerHeight;
  const ctx=c.getContext('2d');
  const particles=Array.from({length:count},()=>{
    const a=rnd(0,tau), spd=rnd(4,16), col=pick(PALETTE.rainbow);
    return{x,y,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd,life:1,size:rnd(3,9),color:col,shape:Math.floor(rnd(0,3))};
  });
  function tick(){
    ctx.clearRect(0,0,c.width,c.height);
    let alive=false;
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.15; p.vx*=0.98; p.life-=0.016;
      if(p.life<=0)return; alive=true;
      ctx.save(); ctx.globalAlpha=p.life;
      ctx.shadowBlur=p.size*2; ctx.shadowColor=p.color; ctx.fillStyle=p.color;
      ctx.beginPath();
      if(p.shape===0)ctx.arc(p.x,p.y,p.size*p.life,0,tau);
      else if(p.shape===1){ctx.moveTo(p.x,p.y-p.size);ctx.lineTo(p.x+p.size*.5,p.y+p.size*.5);ctx.lineTo(p.x-p.size*.5,p.y+p.size*.5);ctx.closePath();}
      else ctx.rect(p.x-p.size/2,p.y-p.size/2,p.size*p.life,p.size*p.life);
      ctx.fill(); ctx.restore();
    });
    if(alive)requestAnimationFrame(tick); else c.remove();
  }
  tick();
}

// ================================================================
// 10. FIRE AURA EFFECT
// ================================================================
class FireAura {
  constructor(element){
    this.el=typeof element==='string'?document.getElementById(element):element;
    if(!this.el)return;
    const canvas=document.createElement('canvas');
    canvas.style.cssText='position:absolute;inset:-30px;pointer-events:none;z-index:0;';
    this.el.style.position='relative'; this.el.appendChild(canvas);
    this.c=canvas; this.ctx=canvas.getContext('2d');
    this.W=this.el.offsetWidth+60; this.H=this.el.offsetHeight+60;
    canvas.width=this.W; canvas.height=this.H;
    this.particles=[]; this._init(); this._tick();
  }
  _mkParticle(){
    const side=Math.floor(rnd(0,4)); const cx=this.W/2, cy=this.H/2;
    let x,y;
    if(side===0){x=rnd(0,this.W);y=this.H-5;}
    else if(side===1){x=rnd(0,this.W);y=this.H-rnd(0,20);}
    else if(side===2){x=5;y=rnd(cy,this.H);}
    else{x=this.W-5;y=rnd(cy,this.H);}
    const hue=rnd(10,45);
    return{x,y,vx:rnd(-0.5,0.5),vy:rnd(-2.5,-0.8),life:1,size:rnd(3,8),color:`hsl(${hue},100%,${rnd(50,80)}%)`};
  }
  _init(){ for(let i=0;i<40;i++){const p=this._mkParticle();p.life=rnd(0,1);this.particles.push(p);} }
  _tick(){
    const ctx=this.ctx; ctx.clearRect(0,0,this.W,this.H);
    this.particles.forEach((p,i)=>{
      p.x+=p.vx; p.y+=p.vy; p.life-=0.018; p.vx+=rnd(-0.05,0.05);
      if(p.life<=0)this.particles[i]=this._mkParticle();
      ctx.save(); ctx.globalAlpha=p.life*0.8;
      ctx.shadowBlur=p.size*3; ctx.shadowColor=p.color;
      ctx.fillStyle=p.color; ctx.beginPath();
      ctx.ellipse(p.x,p.y,p.size*p.life,p.size*p.life*1.5,0,0,tau); ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(()=>this._tick());
  }
}

// ================================================================
// 11. THOUSAND DIYAS ANIMATION
// ================================================================
function thousandDiyas(duration=10000){
  const c=document.createElement('canvas');
  c.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9996;';
  document.body.appendChild(c);
  c.width=window.innerWidth; c.height=window.innerHeight;
  const ctx=c.getContext('2d');
  const diyas=Array.from({length:200},()=>({
    x:rnd(0,c.width), y:rnd(0,c.height),
    phase:rnd(0,tau), speed:rnd(0.05,0.15),
    size:rnd(3,10), alpha:rnd(0.4,0.9),
    color:`hsl(${rnd(30,55)},100%,${rnd(55,80)}%)`
  }));
  const t0=Date.now();
  function tick(){
    const elapsed=Date.now()-t0;
    if(elapsed>duration){ c.remove(); return; }
    ctx.clearRect(0,0,c.width,c.height);
    diyas.forEach(d=>{
      d.phase+=d.speed;
      const flicker=0.7+0.3*Math.sin(d.phase);
      ctx.save(); ctx.globalAlpha=d.alpha*flicker;
      ctx.shadowBlur=d.size*4; ctx.shadowColor=d.color;
      // Flame
      ctx.fillStyle=d.color;
      ctx.beginPath();
      ctx.ellipse(d.x,d.y,d.size*.4,d.size,0,0,tau); ctx.fill();
      // Glow ring
      const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.size*2.5);
      g.addColorStop(0,d.color.replace(')',`,${d.alpha*.5})`).replace('hsl','hsla')||`rgba(255,200,0,${d.alpha*.4})`);
      g.addColorStop(1,'transparent');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,d.size*2.5,0,tau); ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(tick);
  }
  tick();
}

// ================================================================
// 12. MOON PHASE ANIMATION (for Ekadashi page)
// ================================================================
class MoonPhase {
  constructor(canvasId,phase=0){
    this.c=document.getElementById(canvasId);
    if(!this.c)return;
    this.ctx=this.c.getContext('2d');
    this.phase=phase; // 0=new, 0.5=full, 1=new again
    this._draw();
  }
  _draw(){
    const ctx=this.ctx, W=this.c.width, H=this.c.height, r=Math.min(W,H)*.38, cx=W/2, cy=H/2, t=Date.now()*.001;
    ctx.clearRect(0,0,W,H);
    // Stars
    for(let i=0;i<40;i++){
      ctx.save(); ctx.globalAlpha=0.3+0.3*Math.sin(t+i);
      ctx.fillStyle='#fff'; ctx.shadowBlur=4; ctx.shadowColor='#fff';
      ctx.beginPath(); ctx.arc(rnd(0,W),rnd(0,H),rnd(0.5,1.5),0,tau); ctx.fill();
      ctx.restore();
    }
    // Moon glow
    const glow=ctx.createRadialGradient(cx,cy,r*.5,cx,cy,r*2.2);
    glow.addColorStop(0,'rgba(200,180,255,0.12)'); glow.addColorStop(1,'transparent');
    ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(cx,cy,r*2.2,0,tau); ctx.fill();
    // Moon base
    ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,tau);
    const mg=ctx.createRadialGradient(cx-r*.3,cy-r*.3,r*.1,cx,cy,r);
    mg.addColorStop(0,'#FFFAEF'); mg.addColorStop(.6,'#F0E6A0'); mg.addColorStop(1,'#C8B040');
    ctx.fillStyle=mg; ctx.shadowBlur=30; ctx.shadowColor='rgba(200,180,0,0.4)'; ctx.fill();
    // Phase shadow
    if(this.phase!==0.5){
      ctx.globalCompositeOperation='source-over';
      const offset=(this.phase*2-1)*r*1.1;
      ctx.beginPath(); ctx.arc(cx+offset,cy,r*1.05,0,tau);
      ctx.fillStyle='rgba(5,5,20,0.92)'; ctx.fill();
    }
    ctx.restore();
    // Craters
    [[-.25,-.3,.12],[.2,.1,.07],[-.1,.35,.09]].forEach(([dx,dy,cr])=>{
      ctx.save(); ctx.globalAlpha=0.12;
      ctx.fillStyle='#8B7340'; ctx.beginPath(); ctx.arc(cx+dx*r,cy+dy*r,cr*r,0,tau); ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(()=>this._draw());
  }
}

// ================================================================
// 13. LUCKY BLESSING POP-UP
// ================================================================
const BLESSINGS = [
  {text:'হরে কৃষ্ণ হরে কৃষ্ণ\nকৃষ্ণ কৃষ্ণ হরে হরে',src:'মহামন্ত্র'},
  {text:'ওম নমঃ শিবায়',src:'শিব মন্ত্র'},
  {text:'সর্বে ভবন্তু সুখিনঃ\nসর্বে সন্তু নিরামযাঃ',src:'উপনিষদ'},
  {text:'যতো ধর্মস্ততো জয়ঃ',src:'মহাভারত'},
  {text:'কর্মণ্যেবাধিকারস্তে\nমা ফলেষু কদাচন',src:'ভগবদগীতা ২.৪৭'},
  {text:'আনন্দময়ং জগৎ,\nসর্বত্র ঈশ্বরের বিরাজ',src:'বেদান্ত'},
  {text:'ভজ গোবিন্দং ভজ গোবিন্দং\nগোবিন্দং ভজ মূঢ়মতে',src:'আদি শংকরাচার্য'},
  {text:'রাধে রাধে বোলো\nশ্যাম মিলা দো',src:'ভক্তি পদ'},
];

function showBlessingPopup(){
  const old=document.getElementById('blessing-popup');
  if(old)old.remove();
  const b=pick(BLESSINGS);
  const div=document.createElement('div');
  div.id='blessing-popup';
  div.style.cssText=`
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.5);
    background:linear-gradient(135deg,rgba(10,0,20,.97),rgba(20,5,40,.97));
    border:1px solid rgba(212,160,23,.6);border-radius:24px;
    padding:2rem 2.5rem;text-align:center;z-index:9999;
    box-shadow:0 0 60px rgba(212,160,23,.3),0 0 120px rgba(120,0,200,.15);
    max-width:360px;width:90%;
    transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .4s;
    opacity:0;pointer-events:all;font-family:'Noto Serif Bengali',serif;`;
  div.innerHTML=`
    <div style="font-size:2.5rem;margin-bottom:.8rem;animation:omPulse 2s infinite">ॐ</div>
    <div style="font-size:1.05rem;color:#FFD700;line-height:1.8;margin-bottom:.8rem;white-space:pre-line">${b.text}</div>
    <div style="font-size:.75rem;color:rgba(212,160,23,.6);letter-spacing:2px">— ${b.src}</div>
    <button onclick="this.closest('#blessing-popup').remove()" style="margin-top:1.2rem;background:rgba(212,160,23,.15);border:1px solid rgba(212,160,23,.4);color:#FFD700;padding:.4rem 1.2rem;border-radius:20px;cursor:pointer;font-family:inherit;font-size:.82rem;">🙏 জয় হোক</button>`;
  document.body.appendChild(div);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    div.style.transform='translate(-50%,-50%) scale(1)';
    div.style.opacity='1';
  }));
  // Petal burst around popup
  for(let i=0;i<20;i++){
    setTimeout(()=>{
      const rect=div.getBoundingClientRect();
      rainbowBurst(rect.left+rnd(0,rect.width), rect.top+rnd(0,rect.height), 15);
    }, i*120);
  }
  setTimeout(()=>{if(div.parentNode){div.style.opacity='0';setTimeout(()=>div.remove(),400);}},7000);
}

// ================================================================
// 14. GRADIENT WAVE BACKGROUND
// ================================================================
class GradientWave {
  constructor(elementId){
    this.el=document.getElementById(elementId);
    if(!this.el)return;
    this._tick();
  }
  _tick(){
    const t=Date.now()*.0005;
    const h1=(t*30)%360, h2=(h1+60)%360, h3=(h1+120)%360;
    this.el.style.background=`radial-gradient(ellipse at ${50+Math.sin(t)*20}% ${40+Math.cos(t*.7)*15}%, hsla(${h1},80%,8%,.9) 0%, hsla(${h2},60%,5%,.8) 40%, hsla(${h3},70%,3%,.95) 100%)`;
    requestAnimationFrame(()=>this._tick());
  }
}

// ================================================================
// 15. PARALLAX HERO
// ================================================================
function initParallax(){
  const hero=document.querySelector('.hero');
  if(!hero)return;
  window.addEventListener('scroll',()=>{
    const scrollY=window.pageYOffset;
    hero.style.backgroundPositionY=`${scrollY*.4}px`;
    const om=document.querySelector('.hero-bg-text');
    if(om)om.style.transform=`translate(-50%,calc(-50% + ${scrollY*.2}px))`;
    const title=document.querySelector('.hero-title');
    if(title)title.style.transform=`translateY(${scrollY*.08}px)`;
  });
}

// ================================================================
// 16. SOCIAL SHARE
// ================================================================
function shareEvent(title,text,url){
  url=url||window.location.href;
  const encoded=encodeURIComponent, eTitle=encoded(title), eText=encoded(text), eUrl=encoded(url);
  return{
    whatsapp:`https://wa.me/?text=${encoded(title+' - '+text+' '+url)}`,
    facebook:`https://www.facebook.com/sharer/sharer.php?u=${eUrl}&quote=${eTitle}`,
    telegram:`https://t.me/share/url?url=${eUrl}&text=${eTitle}%20-%20${eText}`,
    twitter:`https://twitter.com/intent/tweet?text=${eTitle}&url=${eUrl}`,
    instagram:'https://www.instagram.com/',// IG has no direct share URL
    messenger:`fb-messenger://share?link=${eUrl}`,
    native: ()=>navigator.share&&navigator.share({title,text,url})
  };
}

function showShareMenu(title,text,url){
  const links=shareEvent(title,text,url);
  const old=document.getElementById('share-menu');
  if(old)old.remove();
  const menu=document.createElement('div');
  menu.id='share-menu';
  menu.style.cssText=`position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:rgba(15,5,30,.97);border:1px solid rgba(212,160,23,.4);border-radius:20px;padding:1.2rem 1.5rem;z-index:9999;display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;box-shadow:0 0 40px rgba(0,0,0,.5);font-family:'Noto Serif Bengali',serif;`;
  const btns=[
    {icon:'🟢',label:'WhatsApp',url:links.whatsapp,color:'#25D366'},
    {icon:'🔵',label:'Facebook',url:links.facebook,color:'#1877F2'},
    {icon:'✈️',label:'Telegram',url:links.telegram,color:'#0088CC'},
    {icon:'🐦',label:'Twitter',url:links.twitter,color:'#1DA1F2'},
    {icon:'📤',label:'Share',action:links.native,color:'#FFD700'},
  ];
  btns.forEach(b=>{
    const btn=document.createElement('button');
    btn.style.cssText=`background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:.5rem .9rem;cursor:pointer;color:#fff;font-size:.8rem;font-family:inherit;display:flex;flex-direction:column;align-items:center;gap:.2rem;min-width:60px;transition:all .2s;`;
    btn.innerHTML=`<span style="font-size:1.4rem">${b.icon}</span><span style="font-size:.65rem;color:rgba(255,255,255,.7)">${b.label}</span>`;
    btn.onmouseenter=()=>btn.style.background=`rgba(255,255,255,.12)`;
    btn.onmouseleave=()=>btn.style.background='rgba(255,255,255,.06)';
    btn.onclick=()=>{
      if(b.action){try{b.action();}catch(e){}}
      else window.open(b.url,'_blank','noopener');
      menu.remove();
    };
    menu.appendChild(btn);
  });
  const close=document.createElement('button');
  close.textContent='✕';
  close.style.cssText='position:absolute;top:.5rem;right:.8rem;background:none;border:none;color:rgba(255,255,255,.5);font-size:1rem;cursor:pointer;';
  close.onclick=()=>menu.remove();
  menu.appendChild(close);
  document.body.appendChild(menu);
  setTimeout(()=>menu.remove(),8000);
}

// ================================================================
// 17. DEVOTIONAL CHATBOT
// ================================================================
class DevotionalChatbot {
  constructor(){
    this._btn=null; this._panel=null; this._msgs=[];
    this._inject();
  }
  _inject(){
    // Floating button
    const btn=document.createElement('button');
    btn.id='chatbot-btn';
    btn.innerHTML='🤖';
    btn.style.cssText=`position:fixed;bottom:5rem;right:1.5rem;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#6B21A8,#D4A017);border:none;font-size:1.5rem;cursor:pointer;z-index:9990;box-shadow:0 4px 20px rgba(107,33,168,.4);transition:transform .2s;`;
    btn.title='ভক্তি সহায়তা';
    btn.addEventListener('click',()=>this._toggle());
    document.body.appendChild(btn);
    this._btn=btn;
    // Panel
    const panel=document.createElement('div');
    panel.id='chatbot-panel';
    panel.style.cssText=`position:fixed;bottom:8.5rem;right:1.5rem;width:300px;background:rgba(10,0,20,.97);border:1px solid rgba(212,160,23,.4);border-radius:20px;z-index:9991;display:none;flex-direction:column;box-shadow:0 0 40px rgba(0,0,0,.6);font-family:'Noto Serif Bengali',serif;overflow:hidden;max-height:440px;`;
    panel.innerHTML=`
      <div style="background:linear-gradient(135deg,#6B21A8,#D4A017);padding:.9rem 1.2rem;display:flex;align-items:center;justify-content:space-between;">
        <span style="color:#fff;font-size:.88rem;font-weight:700">🤖 ভক্তি সহায়তা</span>
        <button onclick="document.getElementById('chatbot-panel').style.display='none'" style="background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;font-size:1.1rem">✕</button>
      </div>
      <div id="chatbot-msgs" style="flex:1;overflow-y:auto;padding:.8rem;min-height:150px;max-height:280px;display:flex;flex-direction:column;gap:.5rem;"></div>
      <div style="padding:.6rem;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:.5rem;">
        <input id="chatbot-input" placeholder="প্রশ্ন করুন..." style="flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.45rem .7rem;color:#fff;font-family:inherit;font-size:.82rem;outline:none;">
        <button onclick="window._chatbot&&window._chatbot._send()" style="background:linear-gradient(135deg,#6B21A8,#D4A017);border:none;border-radius:8px;padding:.45rem .8rem;color:#fff;cursor:pointer;font-size:.85rem;">➤</button>
      </div>
      <div style="padding:.4rem .8rem .6rem;display:flex;gap:.4rem;flex-wrap:wrap;">
        ${['পরবর্তী একাদশী?','আজকের পূজা?','কোন ইভেন্ট আছে?','যোগাযোগ নম্বর?','অনুদান কীভাবে?','পারণের সময়?'].map(q=>`<button onclick="window._chatbot&&window._chatbot._quickQ('${q}')" style="background:rgba(212,160,23,.1);border:1px solid rgba(212,160,23,.3);border-radius:12px;padding:.2rem .6rem;color:#FFD700;font-size:.68rem;cursor:pointer;font-family:inherit">${q}</button>`).join('')}
      </div>`;
    document.body.appendChild(panel);
    this._panel=panel;
    this._msgEl=()=>document.getElementById('chatbot-msgs');
    this._inputEl=()=>document.getElementById('chatbot-input');
    document.getElementById('chatbot-input').addEventListener('keydown',e=>{ if(e.key==='Enter')this._send(); });
    window._chatbot=this;
    setTimeout(()=>this._addMsg('bot','🙏 হরে কৃষ্ণ! আমি আপনাকে মন্দির সংক্রান্ত যেকোনো প্রশ্নের উত্তর দিতে পারব।'),300);
  }
  _toggle(){
    const p=this._panel;
    p.style.display=p.style.display==='none'||!p.style.display?'flex':'none';
  }
  _addMsg(role,text){
    const msgs=this._msgEl(); if(!msgs)return;
    const d=document.createElement('div');
    d.style.cssText=`max-width:85%;padding:.5rem .8rem;border-radius:12px;font-size:.82rem;line-height:1.5;${role==='bot'?'background:rgba(107,33,168,.25);color:#e9d5ff;align-self:flex-start;border:1px solid rgba(107,33,168,.3)':'background:rgba(212,160,23,.15);color:#FFD700;align-self:flex-end;border:1px solid rgba(212,160,23,.3)'}`;
    d.textContent=text; msgs.appendChild(d);
    msgs.scrollTop=msgs.scrollHeight;
  }
  _quickQ(q){ this._inputEl().value=q; this._send(); }
  _send(){
    const input=this._inputEl(); if(!input)return;
    const q=input.value.trim(); if(!q)return;
    this._addMsg('user',q); input.value='';
    setTimeout(()=>this._addMsg('bot',this._answer(q)),400);
  }
  _answer(q){
    const ql=q.toLowerCase();
    const db=typeof DB!=='undefined'?DB.get():null;
    const s=db?.settings||{};

    // Ekadashi
    if(ql.includes('একাদশী')||ql.includes('ekadashi')||ql.includes('উপবাস')||ql.includes('ব্রত')){
      if(typeof getNextEkadashi!=='undefined'){
        const next=getNextEkadashi();
        if(next){
          const PARON={'শুক্লপক্ষ':'০৬:০০–০৮:৩০ AM','কৃষ্ণপক্ষ':'০৬:৩০–০৮:৪৫ AM'};
          const paronD=new Date(next.date);paronD.setDate(paronD.getDate()+1);
          return`🌙 পরবর্তী একাদশী: ${next.name}
📅 তারিখ: ${next.date} (${next.paksha})
🙏 পারণ: ${paronD.getDate()}/${paronD.getMonth()+1} — ${PARON[next.paksha]||'সকালে'}`;
        }
      }
      return'🌙 একাদশী পেজে সম্পূর্ণ তালিকা ও পারণের সময় দেখুন।';
    }

    // Paron
    if(ql.includes('পারণ')){
      return'🙏 পারণ হলো একাদশীর পরের দিন সকালে উপবাস ভাঙা। শুক্লপক্ষে ০৬:০০–০৮:৩০ AM, কৃষ্ণপক্ষে ০৬:৩০–০৮:৪৫ AM এর মধ্যে পারণ করুন।';
    }

    // Timings
    if(ql.includes('পূজা')||ql.includes('আরতি')||ql.includes('সময়')||ql.includes('টাইম')){
      if(db&&db.timings&&db.timings.length>0){
        const times=db.timings.map(t=>`• ${t.name}: ${t.time} ${t.ampm||''}`).join('
');
        return`🔔 পূজার সময়সূচি:
${times}`;
      }
      return'⏰ পূজার সময়সূচি হোম পেজে দেওয়া আছে।';
    }

    // Donation / Seva
    if(ql.includes('দান')||ql.includes('অনুদান')||ql.includes('সেবা')||ql.includes('বিকাশ')||ql.includes('নগদ')){
      const seva=db?.seva_options||[];
      if(seva.length>0){
        const list=seva.map(sv=>`• ${sv.icon} ${sv.name}: ৳${sv.amount}`).join('
');
        return`🌸 সেবার বিকল্পসমূহ:
${list}

💳 সেবা ও দান পেজে গিয়ে অনুদান করুন।`;
      }
      return'💰 "সেবা ও দান" পেজে গিয়ে বিকাশ/নগদ/রকেট/ব্যাংকে দান করুন।';
    }

    // Address / Location
    if(ql.includes('ঠিকানা')||ql.includes('কোথায়')||ql.includes('location')||ql.includes('address')){
      return`📍 মন্দিরের ঠিকানা:
${s.address||'মন্দির রোড, বাংলাদেশ'}
📞 ${s.phone||''}`;
    }

    // Events
    if(ql.includes('ইভেন্ট')||ql.includes('উৎসব')||ql.includes('অনুষ্ঠান')||ql.includes('কবে')){
      const upcoming=(db?.events||[]).filter(e=>new Date(e.date)>=new Date()).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,3);
      if(upcoming.length){
        const list=upcoming.map(e=>`• ${e.title}: ${e.date} (${e.time||''} ${e.ampm||''})`).join('
');
        return`🎊 আসন্ন উৎসব:
${list}

উৎসব পেজে বিস্তারিত দেখুন।`;
      }
      return'🎊 আসন্ন কোনো উৎসব নেই। উৎসব পেজে দেখুন।';
    }

    // Calendar / Panjika
    if(ql.includes('ক্যালেন্ডার')||ql.includes('পঞ্জিকা')||ql.includes('calendar')){
      return'📅 পঞ্জিকা পেজে একাদশী, পারণ, উৎসব সব একসাথে দেখতে পাবেন। তারিখে ক্লিক করলে বিস্তারিত তথ্য পাবেন।';
    }

    // Committee
    if(ql.includes('কমিটি')||ql.includes('সভাপতি')||ql.includes('সম্পাদক')||ql.includes('কর্মকর্তা')){
      const members=(db?.committee||[]).slice(0,3);
      if(members.length){
        const list=members.map(m=>`• ${m.name} — ${m.role}${m.phone?' ('+m.phone+')':''}`).join('
');
        return`👥 কমিটি:
${list}

সব সদস্য কমিটি পেজে দেখুন।`;
      }
      return'👥 কমিটি সদস্যদের তথ্য কমিটি পেজে পাবেন।';
    }

    // Deities
    if(ql.includes('দেব')||ql.includes('দেবী')||ql.includes('কৃষ্ণ')||ql.includes('শিব')||ql.includes('দুর্গা')||ql.includes('লক্ষ্মী')||ql.includes('গণেশ')||ql.includes('সরস্বতী')){
      const deities=(db?.deities||[]).map(d=>d.name).join(', ');
      return`🙏 মন্দিরে পূজিত দেব-দেবী: ${deities||'রাধাকৃষ্ণ, শিব, দুর্গা, গণেশ, লক্ষ্মী, সরস্বতী'}

দেব-দেবী পেজে বিস্তারিত দেখুন।`;
    }

    // Music
    if(ql.includes('গান')||ql.includes('সংগীত')||ql.includes('music')||ql.includes('কীর্তন')){
      return'🎵 Nav এর ▶ বোতামে ক্লিক করলে ভক্তিমূলক সংগীত বাজবে। Admin চাইলে কাস্টম মিউজিক আপলোড করতে পারবেন।';
    }

    // Organization
    if(ql.includes('সংগঠন')||ql.includes('ছাত্রসংঘ')||ql.includes('organization')){
      const org=db?.organization||{};
      return`🏛 ${org.name||'ছাত্রসংঘ'}
${org.mission||'মন্দিরের উদ্যোগে পরিচালিত সংগঠন'}
পরিচিতি পেজে বিস্তারিত দেখুন।`;
    }

    // Phone / Contact
    if(ql.includes('ফোন')||ql.includes('যোগাযোগ')||ql.includes('contact')||ql.includes('নম্বর')){
      return`📞 যোগাযোগ:
ফোন: ${s.phone||'N/A'}
ইমেইল: ${s.email||'N/A'}
ঠিকানা: ${s.address||'N/A'}`;
    }

    // Gallery / Photos
    if(ql.includes('ছবি')||ql.includes('গ্যালারি')||ql.includes('photo')){
      return'🖼 প্রতিটি ইভেন্ট পেজে ছবির গ্যালারি আছে। ছবি সিলেক্ট করে ডাউনলোড করতে পারবেন।';
    }

    // About / History
    if(ql.includes('ইতিহাস')||ql.includes('পরিচিতি')||ql.includes('about')||ql.includes('প্রতিষ্ঠা')){
      const org=db?.organization||{};
      return`🏛 ${s.mandir_name||'মন্দির'} — ${org.history?org.history.substring(0,150)+'...':"পরিচিতি পেজে বিস্তারিত দেখুন।"}`;
    }

    // Fallback
    const fallbacks=[
      '🙏 হরে কৃষ্ণ! পূজার সময়, একাদশী, ইভেন্ট, দান, কমিটি — এসব বিষয়ে জিজ্ঞেস করুন।',
      '🌸 আমি মন্দির সংক্রান্ত যেকোনো প্রশ্নের উত্তর দিতে পারি। আরও নির্দিষ্টভাবে জিজ্ঞেস করুন।',
      'ওম শান্তি 🙏 পূজা সময়, একাদশী, অনুদান, উৎসব — কোন বিষয়ে জানতে চান?'
    ];
    return pick(fallbacks);
  }
}

// ================================================================
// 18. PWA MANIFEST & SERVICE WORKER
// ================================================================
function initPWA(){
  // Dynamic manifest
  const manifest={
    name:'শ্রী রাধাকৃষ্ণ মন্দির',short_name:'মন্দির',
    start_url:'/public/index.html',display:'standalone',
    background_color:'#050505',theme_color:'#D4A017',
    description:'শ্রী রাধাকৃষ্ণ মহাদেব মন্দির — ভক্তি, শান্তি, মোক্ষ',
    icons:[{src:'icons/icon-192.png',sizes:'192x192',type:'image/png'},{src:'icons/icon-512.png',sizes:'512x512',type:'image/png'}]
  };
  const blob=new Blob([JSON.stringify(manifest)],{type:'application/json'});
  const link=document.createElement('link');
  link.rel='manifest'; link.href=URL.createObjectURL(blob);
  document.head.appendChild(link);
  // Register SW
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../sw.js').catch(()=>{});
  }
}

// ================================================================
// 19. PUSH NOTIFICATION SETUP
// ================================================================
async function requestNotifications(){
  if(!('Notification' in window))return false;
  if(Notification.permission==='granted')return true;
  const perm=await Notification.requestPermission();
  return perm==='granted';
}

function scheduleEkadashiNotification(){
  if(typeof getNextEkadashi==='undefined')return;
  const next=getNextEkadashi(); if(!next)return;
  const target=new Date(next.date); target.setHours(6,0,0,0);
  const now=new Date(); const diff=target-now;
  if(diff<0||diff>7*24*3600*1000)return;
  setTimeout(async()=>{
    const granted=await requestNotifications();
    if(granted) new Notification('🌙 আজ একাদশী!',{body:`${next.name} — ব্রত ও পূজায় অংশ নিন।`,icon:'../icons/icon-192.png'});
  }, Math.max(0,diff));
}

// ================================================================
// 20. EXPORT FULL SITE DATA
// ================================================================
function exportSiteData(){
  const db=typeof DB!=='undefined'?DB.get():{};
  const exportData={
    exported_at:new Date().toISOString(),
    version:'3.0',
    ...db
  };
  const blob=new Blob([JSON.stringify(exportData,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`mandir_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}

function importSiteData(jsonStr){
  try{
    const data=JSON.parse(jsonStr);
    if(typeof DB!=='undefined'){
      Object.entries(data).forEach(([k,v])=>{ if(!['exported_at','version'].includes(k)) DB.set(k,v); });
    }
    return true;
  }catch(e){ return false; }
}

// ================================================================
// 21. COLOR THEME SELECTOR (4 themes)
// ================================================================
const THEMES={
  temple:{
    '--gold':'#D4A017','--gold-light':'#FFD700','--saffron':'#E8830A',
    '--black':'#0A0A0A','--dark':'#111111','--dark2':'#1A1A1A',
    '--border':'rgba(212,160,23,0.3)','--white':'#FAFAFA',
    name:'মন্দির স্বর্ণ',emoji:'🏛'
  },
  galaxy:{
    '--gold':'#9D4EDD','--gold-light':'#C77DFF','--saffron':'#7B2FBE',
    '--black':'#03001C','--dark':'#06003C','--dark2':'#0A0050',
    '--border':'rgba(157,78,221,0.4)','--white':'#E0AAFF',
    name:'গ্যালাক্সি নীল',emoji:'🌌'
  },
  lotus:{
    '--gold':'#E91E8C','--gold-light':'#FF6BD6','--saffron':'#C2185B',
    '--black':'#0D0008','--dark':'#1A000F','--dark2':'#260015',
    '--border':'rgba(233,30,140,0.35)','--white':'#FCE4EC',
    name:'লোটাস গোলাপি',emoji:'🌸'
  },
  emerald:{
    '--gold':'#00BFA5','--gold-light':'#1DE9B6','--saffron':'#00897B',
    '--black':'#00100D','--dark':'#00201A','--dark2':'#003028',
    '--border':'rgba(0,191,165,0.35)','--white':'#E0F2F1',
    name:'পান্না সবুজ',emoji:'💚'
  }
};

function applyTheme(themeKey){
  const theme=THEMES[themeKey]; if(!theme)return;
  const root=document.documentElement;
  Object.entries(theme).forEach(([k,v])=>{ if(k.startsWith('--'))root.style.setProperty(k,v); });
  localStorage.setItem('mandir_theme',themeKey);
}

function initTheme(){
  const saved=localStorage.getItem('mandir_theme')||'temple';
  applyTheme(saved);
}

function showThemePicker(){
  const old=document.getElementById('theme-picker');
  if(old){old.remove();return;}
  const div=document.createElement('div');
  div.id='theme-picker';
  div.style.cssText='position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:rgba(10,0,20,.97);border:1px solid rgba(212,160,23,.4);border-radius:20px;padding:1rem 1.5rem;z-index:9995;display:flex;gap:.8rem;flex-wrap:wrap;justify-content:center;font-family:inherit;';
  Object.entries(THEMES).forEach(([key,t])=>{
    const btn=document.createElement('button');
    btn.style.cssText='background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:.6rem 1rem;cursor:pointer;color:#fff;font-family:inherit;font-size:.82rem;display:flex;flex-direction:column;align-items:center;gap:.3rem;min-width:70px;transition:all .2s;';
    btn.innerHTML=`<span style="font-size:1.4rem">${t.emoji}</span><span>${t.name}</span>`;
    btn.onclick=()=>{ applyTheme(key); div.remove(); showToast&&showToast(`${t.emoji} ${t.name} থিম চালু!`); };
    div.appendChild(btn);
  });
  document.body.appendChild(div);
  setTimeout(()=>div.remove(),8000);
}

// ================================================================
// GLOBAL INIT — Called from each page
// ================================================================
window.MandirFX={
  GalaxyBackground, PetalRain, Fireworks, HoliSplash, DiyaEffect,
  MouseTrail, FloatingBlessings, AudioVisualizer, rainbowBurst,
  FireAura, thousandDiyas, MoonPhase, showBlessingPopup,
  GradientWave, initParallax, shareEvent, showShareMenu,
  DevotionalChatbot, initPWA, requestNotifications,
  scheduleEkadashiNotification, exportSiteData, importSiteData,
  applyTheme, initTheme, showThemePicker, THEMES, PALETTE
};
