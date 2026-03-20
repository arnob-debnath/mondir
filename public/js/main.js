// ============================================================
// MANDIR WEBSITE v6 — main.js
// ============================================================

// ===== GITA SHLOKAS =====
const GITA_SHLOKAS = [
  {shloka:"যদা যদা হি ধর্মস্য গ্লানির্ভবতি ভারত।\nঅভ্যুত্থানমধর্মস্য তদাত্মানং সৃজাম্যহম্।।",chapter:"অধ্যায় ৪, শ্লোক ৭",meaning:"হে ভারত! যখনই ধর্মের গ্লানি ও অধর্মের অভ্যুত্থান হয়, তখনই আমি নিজেকে প্রকট করি।"},
  {shloka:"কর্মণ্যেবাধিকারস্তে মা ফলেষু কদাচন।\nমা কর্মফলহেতুর্ভূর্মা তে সঙ্গোঽস্ত্বকর্মণি।।",chapter:"অধ্যায় ২, শ্লোক ৪৭",meaning:"তোমার কর্মেই অধিকার, কর্মফলে নয়। কর্মফলের হেতু হয়ো না, আবার অকর্মেও আসক্ত হয়ো না।"},
  {shloka:"সর্বধর্মান্পরিত্যজ্য মামেকং শরণং ব্রজ।\nঅহং ত্বাং সর্বপাপেভ্যো মোক্ষয়িষ্যামি মা শুচঃ।।",chapter:"অধ্যায় ১৮, শ্লোক ৬৬",meaning:"সব ধর্ম পরিত্যাগ করে শুধু আমার শরণ নাও। আমি তোমাকে সব পাপ থেকে মুক্ত করব, শোক করো না।"},
  {shloka:"মন্মনা ভব মদ্ভক্তো মদ্যাজী মাং নমস্কুরু।\nমামেবৈষ্যসি সত্যং তে প্রতিজানে প্রিয়োঽসি মে।।",chapter:"অধ্যায় ১৮, শ্লোক ৬৫",meaning:"আমাতে মন স্থাপন করো, আমার ভক্ত হও। আমাকেই পাবে — এটা সত্য প্রতিজ্ঞা, তুমি আমার প্রিয়।"},
  {shloka:"অহমাত্মা গুডাকেশ সর্বভূতাশয়স্থিতঃ।\nঅহমাদিশ্চ মধ্যং চ ভূতানামন্ত এব চ।।",chapter:"অধ্যায় ১০, শ্লোক ২০",meaning:"হে গুডাকেশ! আমি সব প্রাণীর হৃদয়ে বিরাজিত আত্মা। আমিই সব ভূতের আদি, মধ্য এবং অন্ত।"},
];

function showGitaShloka() {
  if(document.getElementById('gita-popup'))return;
  const s=GITA_SHLOKAS[Math.floor(Math.random()*GITA_SHLOKAS.length)];
  const el=document.createElement('div');
  el.id='gita-popup';
  el.innerHTML=`<div class="gita-popup-overlay" onclick="this.parentElement.remove()"></div>
  <div class="gita-popup-box">
    <div class="gita-popup-om">ॐ</div>
    <div class="gita-popup-title">শ্রীমদ্ভগবদগীতা</div>
    <div class="gita-popup-chapter">${s.chapter}</div>
    <div class="gita-popup-shloka">${s.shloka.replace(/\n/g,'<br>')}</div>
    <div class="gita-popup-divider">✦ ✦ ✦</div>
    <div class="gita-popup-meaning">${s.meaning}</div>
    <button class="gita-popup-close" onclick="document.getElementById('gita-popup').remove()">🙏 ধন্যবাদ</button>
  </div>`;
  document.body.appendChild(el);
  setTimeout(()=>el.querySelector('.gita-popup-box').classList.add('show'),50);
}

// ===== LOTUS CURSOR TRAIL =====
class LotusCursorTrail {
  constructor(){
    this.canvas=document.createElement('canvas');
    this.canvas.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9990;';
    document.body.appendChild(this.canvas);
    this.ctx=this.canvas.getContext('2d');
    this.particles=[];
    this.resize();
    window.addEventListener('resize',()=>this.resize());
    window.addEventListener('mousemove',e=>this.spawn(e.clientX,e.clientY));
    window.addEventListener('touchmove',e=>{const t=e.touches[0];this.spawn(t.clientX,t.clientY);},{passive:true});
    this.animate();
  }
  resize(){this.canvas.width=window.innerWidth;this.canvas.height=window.innerHeight;}
  spawn(x,y){
    const syms=['🌸','✨','🪷','⭐','💫','🔱'];
    const cols=['#FFD700','#FF69B4','#DA70D6','#FF6347','#00CED1'];
    for(let i=0;i<2;i++){
      this.particles.push({x,y,vx:(Math.random()-0.5)*2.5,vy:(Math.random()-0.5)*2.5-1.5,
        size:Math.random()*12+8,alpha:1,color:cols[Math.floor(Math.random()*cols.length)],
        sym:syms[Math.floor(Math.random()*syms.length)],rot:Math.random()*Math.PI*2,
        rotSpeed:(Math.random()-0.5)*0.15,decay:0.025+Math.random()*0.02});
    }
  }
  animate(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.particles=this.particles.filter(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=0.04;p.alpha-=p.decay;p.rot+=p.rotSpeed;
      if(p.alpha<=0)return false;
      this.ctx.save();this.ctx.globalAlpha=p.alpha;this.ctx.translate(p.x,p.y);this.ctx.rotate(p.rot);
      this.ctx.font=`${p.size}px serif`;this.ctx.textAlign='center';this.ctx.textBaseline='middle';
      this.ctx.shadowBlur=8;this.ctx.shadowColor=p.color;this.ctx.fillText(p.sym,0,0);
      this.ctx.restore();return true;
    });
    requestAnimationFrame(()=>this.animate());
  }
}

// ===== FLOWER CANVAS =====
class FlowerAnimation {
  constructor(canvasId){
    this.canvas=document.getElementById(canvasId);
    if(!this.canvas)return;
    this.ctx=this.canvas.getContext('2d');
    this.petals=[];this.sparkles=[];this.orbs=[];
    this.resize();window.addEventListener('resize',()=>this.resize());
    this.init();this.animate();
  }
  resize(){if(!this.canvas)return;this.canvas.width=window.innerWidth;this.canvas.height=window.innerHeight;this.W=this.canvas.width;this.H=this.canvas.height;}
  pc(){const p=[{r:[220,255],g:[80,140],b:[0,30]},{r:[210,255],g:[160,220],b:[0,40]},{r:[220,255],g:[60,130],b:[100,180]},{r:[200,255],g:[0,80],b:[150,220]},{r:[230,255],g:[210,245],b:[200,240]},{r:[255,255],g:[200,230],b:[0,50]}];const t=p[Math.floor(Math.random()*p.length)];const r=(a,b)=>Math.floor(Math.random()*(b-a)+a);return`rgba(${r(t.r[0],t.r[1])},${r(t.g[0],t.g[1])},${r(t.b[0],t.b[1])},`;}
  mk(){return{x:Math.random()*this.W,y:-20-Math.random()*100,size:Math.random()*9+4,speedY:Math.random()*1.2+0.4,speedX:(Math.random()-0.5)*0.7,rotation:Math.random()*Math.PI*2,rotSpeed:(Math.random()-0.5)*0.06,alpha:Math.random()*0.6+0.25,shape:Math.floor(Math.random()*4),color:this.pc(),swing:Math.random()*0.025+0.005,swingOffset:Math.random()*Math.PI*2};}
  ms(){return{x:Math.random()*this.W,y:Math.random()*this.H,size:Math.random()*2+0.5,alpha:0,maxAlpha:Math.random()*0.5+0.15,phase:Math.random()*Math.PI*2,speed:Math.random()*0.03+0.01,color:this.pc()};}
  mo(){return{x:Math.random()*this.W,y:Math.random()*this.H,r:Math.random()*80+30,alpha:Math.random()*0.035+0.01,color:this.pc(),dx:(Math.random()-0.5)*0.25,dy:(Math.random()-0.5)*0.25};}
  init(){for(let i=0;i<38;i++){const p=this.mk();p.y=Math.random()*this.H;this.petals.push(p);}for(let i=0;i<60;i++)this.sparkles.push(this.ms());for(let i=0;i<8;i++)this.orbs.push(this.mo());}
  drawPetal(p,t){const ctx=this.ctx;ctx.save();const x=p.x+Math.sin(t*p.swing+p.swingOffset)*35;ctx.translate(x,p.y);ctx.rotate(p.rotation);ctx.globalAlpha=p.alpha;ctx.shadowBlur=p.size*2;ctx.shadowColor=p.color+'0.8)';ctx.fillStyle=p.color+p.alpha+')';ctx.beginPath();if(p.shape===0){ctx.ellipse(0,0,p.size,p.size*0.55,0,0,Math.PI*2);}else if(p.shape===1){ctx.moveTo(0,-p.size);ctx.bezierCurveTo(p.size*.7,-p.size*.3,p.size*.7,p.size*.3,0,p.size);ctx.bezierCurveTo(-p.size*.7,p.size*.3,-p.size*.7,-p.size*.3,0,-p.size);}else{ctx.moveTo(0,-p.size);ctx.lineTo(p.size*.5,0);ctx.lineTo(0,p.size*.7);ctx.lineTo(-p.size*.5,0);ctx.closePath();}ctx.fill();ctx.restore();}
  animate(){if(!this.canvas)return;const ctx=this.ctx,t=Date.now()*.001;ctx.clearRect(0,0,this.W,this.H);this.orbs.forEach(o=>{const g=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);g.addColorStop(0,o.color+(o.alpha*2.5)+')');g.addColorStop(1,o.color+'0)');ctx.save();ctx.fillStyle=g;ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);ctx.fill();ctx.restore();o.x+=o.dx;o.y+=o.dy;if(o.x<-o.r)o.x=this.W+o.r;if(o.x>this.W+o.r)o.x=-o.r;if(o.y<-o.r)o.y=this.H+o.r;if(o.y>this.H+o.r)o.y=-o.r;});this.sparkles.forEach(s=>{s.phase+=s.speed;s.alpha=s.maxAlpha*(0.5+0.5*Math.sin(s.phase));ctx.save();ctx.globalAlpha=s.alpha;ctx.fillStyle=s.color+s.alpha+')';ctx.beginPath();ctx.arc(s.x,s.y,s.size,0,Math.PI*2);ctx.fill();ctx.restore();});this.petals.forEach((p,i)=>{p.y+=p.speedY;p.x+=p.speedX;p.rotation+=p.rotSpeed;this.drawPetal(p,t);if(p.y>this.H+25)this.petals[i]=this.mk();});if(Math.random()<0.04&&this.petals.length<55)this.petals.push(this.mk());requestAnimationFrame(()=>this.animate());}
}

// ===== AUDIO ENGINE =====
class MandirAudio {
  constructor(){this.ctx=null;this.gain=null;this.playing=false;this._timer=null;this._el=null;}
  _init(){if(!this.ctx)this.ctx=new(window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')this.ctx.resume();}
  playUploaded(src){
    this.stop();if(!src)return;
    if(this._el){this._el.pause();this._el.remove();}
    const a=document.createElement('audio');a.src=src;a.loop=true;a.volume=0.25;a.style.display='none';document.body.appendChild(a);this._el=a;
    a.play().then(()=>{this.playing=true;updateMusicBtn(true);}).catch(()=>{});
  }
  playSynth(){
    try{
      this._init();if(this.playing)return;
      const ctx=this.ctx;this.gain=ctx.createGain();this.gain.gain.setValueAtTime(0,ctx.currentTime);this.gain.gain.linearRampToValueAtTime(0.14,ctx.currentTime+2.5);this.gain.connect(ctx.destination);
      const notes={'Sa':261.63,'Re':293.66,'Ga':329.63,'Ma':349.23,'Pa':392.00,'Dha':440.00,'Ni':493.88,'Sa2':523.25,'_':0};
      const melody=['Pa','_','Dha','Pa','Ma','Ga','Re','Sa','Sa','Re','Ga','Ma','Pa','Dha','Pa','_','Dha','Sa2','_','Sa2','Dha','Pa','Ma','Pa','Ga','Ma','Pa','Ma','Ga','Re','Sa','_'];
      const nd=0.44;let t=ctx.currentTime+0.15;this.playing=true;
      const loop=()=>{
        if(!this.playing)return;
        melody.forEach((n,i)=>{if(n==='_')return;const freq=notes[n],st=t+i*nd;const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(this.gain);o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(0,st);g.gain.linearRampToValueAtTime(0.45,st+0.04);g.gain.linearRampToValueAtTime(0,st+nd*0.9);o.start(st);o.stop(st+nd);});
        t+=melody.length*nd;this._timer=setTimeout(loop,Math.max((t-ctx.currentTime-1.2)*1000,50));
      };loop();
    }catch(e){}
  }
  stop(){
    this.playing=false;clearTimeout(this._timer);
    if(this._el)this._el.pause();
    if(this.gain&&this.ctx){this.gain.gain.cancelScheduledValues(this.ctx.currentTime);this.gain.gain.linearRampToValueAtTime(0,this.ctx.currentTime+1);}
  }
  _getMusicSrc(){
    // Priority: 1) Admin uploaded → 2) default_music.mp3 → 3) synth
    try{const s=(typeof DB!=='undefined')?DB.get('settings'):{};if(s&&s.bg_music)return{type:'uploaded',src:s.bg_music};}catch(e){}
    return{type:'default',src:'music/default_music.mp3'};
  }
  toggle(){
    if(this.playing){this.stop();return false;}
    const m=this._getMusicSrc();
    if(m.type==='uploaded'||m.type==='default'){
      this._tryAudio(m.src,()=>this.playSynth());
    }else{this.playSynth();}
    return true;
  }
  _tryAudio(src,fallback){
    if(this._el){this._el.pause();this._el.remove();}
    const a=document.createElement('audio');a.src=src;a.loop=true;a.volume=0.25;a.style.display='none';document.body.appendChild(a);this._el=a;
    a.play().then(()=>{this.playing=true;updateMusicBtn(true);}).catch(()=>{a.remove();if(fallback)fallback();});
  }
  autoStart(){
    const go=()=>{
      if(this.playing)return;
      ['click','keydown','touchstart'].forEach(e=>document.removeEventListener(e,go));
      const m=this._getMusicSrc();
      if(m.type==='uploaded'||m.type==='default'){
        this._tryAudio(m.src,()=>{this.playSynth();updateMusicBtn(true);});
      }else{this.playSynth();updateMusicBtn(true);}
    };
    ['click','keydown','touchstart'].forEach(e=>document.addEventListener(e,go,{once:true}));
  }
  playBell(){
    const s=(typeof DB!=='undefined')?DB.get('settings'):{};
    if(s&&s.bell_sound){try{const a=new Audio(s.bell_sound);a.volume=0.6;a.play();}catch(e){}}
    else{try{this._init();const ctx=this.ctx,m=ctx.createGain();m.gain.value=0.4;m.connect(ctx.destination);[440,880,1320,1760].forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(m);o.type='sine';o.frequency.value=f;const t=ctx.currentTime+i*0.015;g.gain.setValueAtTime(0.5/(i+1),t);g.gain.exponentialRampToValueAtTime(0.001,t+3);o.start(t);o.stop(t+3);});}catch(e){}}
  }
  playConch(){
    const s=(typeof DB!=='undefined')?DB.get('settings'):{};
    if(s&&s.conch_sound){try{const a=new Audio(s.conch_sound);a.volume=0.6;a.play();}catch(e){}}
    else{try{this._init();const ctx=this.ctx,m=ctx.createGain();m.connect(ctx.destination);const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.connect(lg);lfo.frequency.value=5;lg.gain.value=12;const o=ctx.createOscillator();lg.connect(o.frequency);o.type='sawtooth';o.frequency.value=196;const f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=1200;o.connect(f);f.connect(m);const t=ctx.currentTime;m.gain.setValueAtTime(0,t);m.gain.linearRampToValueAtTime(0.35,t+0.3);m.gain.linearRampToValueAtTime(0,t+3.5);lfo.start(t);o.start(t);lfo.stop(t+3.5);o.stop(t+3.5);}catch(e){}}
  }
}
window.mandirAudio=new MandirAudio();
function updateMusicBtn(p){document.querySelectorAll('.nav-music-btn').forEach(b=>{b.innerHTML=p?'⏸ সংগীত':'▶ সংগীত';b.style.color=p?'#2ECC71':'';});}

// ===== EKADASHI DATA =====
const EKADASHI_LIST=[
  {date:'2025-01-10',name:'সফলা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'পৌষ'},{date:'2025-01-25',name:'পুত্রদা একাদশী',paksha:'শুক্লপক্ষ',month:'পৌষ'},
  {date:'2025-02-08',name:'ষট্তিলা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'মাঘ'},{date:'2025-02-23',name:'জয়া একাদশী',paksha:'শুক্লপক্ষ',month:'মাঘ'},
  {date:'2025-03-10',name:'বিজয়া একাদশী',paksha:'কৃষ্ণপক্ষ',month:'ফাল্গুন'},{date:'2025-03-25',name:'আমলকী একাদশী',paksha:'শুক্লপক্ষ',month:'ফাল্গুন'},
  {date:'2025-04-08',name:'পাপমোচনী একাদশী',paksha:'কৃষ্ণপক্ষ',month:'চৈত্র'},{date:'2025-04-24',name:'কামদা একাদশী',paksha:'শুক্লপক্ষ',month:'চৈত্র'},
  {date:'2025-05-08',name:'বরুথিনী একাদশী',paksha:'কৃষ্ণপক্ষ',month:'বৈশাখ'},{date:'2025-05-23',name:'মোহিনী একাদশী',paksha:'শুক্লপক্ষ',month:'বৈশাখ'},
  {date:'2025-06-06',name:'অপরা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'জ্যৈষ্ঠ'},{date:'2025-06-21',name:'নির্জলা একাদশী',paksha:'শুক্লপক্ষ',month:'জ্যৈষ্ঠ'},
  {date:'2025-07-06',name:'যোগিনী একাদশী',paksha:'কৃষ্ণপক্ষ',month:'আষাঢ়'},{date:'2025-07-21',name:'শয়নী একাদশী',paksha:'শুক্লপক্ষ',month:'আষাঢ়'},
  {date:'2025-08-05',name:'কামিকা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'শ্রাবণ'},{date:'2025-08-19',name:'পবিত্রা একাদশী',paksha:'শুক্লপক্ষ',month:'শ্রাবণ'},
  {date:'2025-09-03',name:'অজা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'ভাদ্র'},{date:'2025-09-18',name:'পার্শ্ব একাদশী',paksha:'শুক্লপক্ষ',month:'ভাদ্র'},
  {date:'2025-10-02',name:'ইন্দিরা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'আশ্বিন'},{date:'2025-10-17',name:'পাশাঙ্কুশা একাদশী',paksha:'শুক্লপক্ষ',month:'আশ্বিন'},
  {date:'2025-11-01',name:'রমা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'কার্তিক'},{date:'2025-11-15',name:'প্রবোধিনী একাদশী',paksha:'শুক্লপক্ষ',month:'কার্তিক'},
  {date:'2025-11-30',name:'উৎপন্না একাদশী',paksha:'কৃষ্ণপক্ষ',month:'অগ্রহায়ণ'},{date:'2025-12-15',name:'মোক্ষদা একাদশী',paksha:'শুক্লপক্ষ',month:'অগ্রহায়ণ'},
  {date:'2026-01-13',name:'পুত্রদা একাদশী',paksha:'শুক্লপক্ষ',month:'পৌষ'},{date:'2026-01-29',name:'ষট্তিলা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'মাঘ'},
  {date:'2026-02-12',name:'জয়া একাদশী',paksha:'শুক্লপক্ষ',month:'মাঘ'},{date:'2026-02-27',name:'বিজয়া একাদশী',paksha:'কৃষ্ণপক্ষ',month:'ফাল্গুন'},
  {date:'2026-03-14',name:'আমলকী একাদশী',paksha:'শুক্লপক্ষ',month:'ফাল্গুন'},{date:'2026-03-29',name:'পাপমোচনী একাদশী',paksha:'কৃষ্ণপক্ষ',month:'চৈত্র'},
  {date:'2026-04-13',name:'কামদা একাদশী',paksha:'শুক্লপক্ষ',month:'চৈত্র'},{date:'2026-04-28',name:'বরুথিনী একাদশী',paksha:'কৃষ্ণপক্ষ',month:'বৈশাখ'},
  {date:'2026-05-12',name:'মোহিনী একাদশী',paksha:'শুক্লপক্ষ',month:'বৈশাখ'},{date:'2026-05-27',name:'অপরা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'জ্যৈষ্ঠ'},
  {date:'2026-06-11',name:'নির্জলা একাদশী',paksha:'শুক্লপক্ষ',month:'জ্যৈষ্ঠ'},{date:'2026-06-25',name:'যোগিনী একাদশী',paksha:'কৃষ্ণপক্ষ',month:'আষাঢ়'},
  {date:'2026-07-10',name:'শয়নী একাদশী',paksha:'শুক্লপক্ষ',month:'আষাঢ়'},{date:'2026-07-25',name:'কামিকা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'শ্রাবণ'},
  {date:'2026-08-09',name:'পবিত্রা একাদশী',paksha:'শুক্লপক্ষ',month:'শ্রাবণ'},{date:'2026-08-23',name:'অজা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'ভাদ্র'},
  {date:'2026-09-07',name:'পার্শ্ব একাদশী',paksha:'শুক্লপক্ষ',month:'ভাদ্র'},{date:'2026-09-22',name:'ইন্দিরা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'আশ্বিন'},
  {date:'2026-10-07',name:'পাশাঙ্কুশা একাদশী',paksha:'শুক্লপক্ষ',month:'আশ্বিন'},{date:'2026-10-21',name:'রমা একাদশী',paksha:'কৃষ্ণপক্ষ',month:'কার্তিক'},
  {date:'2026-11-05',name:'প্রবোধিনী একাদশী',paksha:'শুক্লপক্ষ',month:'কার্তিক'},{date:'2026-11-20',name:'উৎপন্না একাদশী',paksha:'কৃষ্ণপক্ষ',month:'অগ্রহায়ণ'},
  {date:'2026-12-05',name:'মোক্ষদা একাদশী',paksha:'শুক্লপক্ষ',month:'অগ্রহায়ণ'},
];
const PARON_TIMES={'শুক্লপক্ষ':'সূর্যোদয়ের পর ০৬:০০–০৮:৩০ AM','কৃষ্ণপক্ষ':'সূর্যোদয়ের পর ০৬:৩০–০৮:৪৫ AM'};

function getEkadashiList(){
  try{const c=(typeof DB!=='undefined')?(DB.get('ekadashi')||[]):[];if(c.length>0)return c.sort((a,b)=>new Date(a.date)-new Date(b.date));}catch(e){}
  return EKADASHI_LIST;
}
function getNextEkadashi(){const t=new Date();t.setHours(0,0,0,0);return getEkadashiList().find(e=>new Date(e.date)>=t);}

// ===== UTILITIES =====
function showToast(msg,type='info',dur=3500){
  const old=document.querySelector('.toast-msg');if(old)old.remove();
  const t=document.createElement('div');t.className=`toast-msg toast ${type}`;t.innerHTML=msg;document.body.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),300);},dur);
}
function openModal(id){const m=document.getElementById(id);if(m){m.classList.add('open');document.body.style.overflow='hidden';}}
function closeModal(id){const m=document.getElementById(id);if(m){m.classList.remove('open');document.body.style.overflow='';}}
document.addEventListener('click',e=>{if(e.target.classList.contains('modal-overlay')){e.target.classList.remove('open');document.body.style.overflow='';}});

function initScrollAnim(){
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:0.06});
  document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
}

function initNav(){
  const cur=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a,.mobile-nav a').forEach(a=>{if(a.getAttribute('href')===cur)a.classList.add('active');});
  const ham=document.querySelector('.nav-hamburger'),mob=document.querySelector('.mobile-nav');
  if(ham&&mob)ham.addEventListener('click',()=>mob.classList.toggle('open'));
  const btn=document.querySelector('.nav-music-btn');
  if(btn)btn.addEventListener('click',()=>{const p=window.mandirAudio.toggle();updateMusicBtn(p);});
}

function getNavHTML(s){
  s=s||{};const name=s.mandir_name||'শ্রী রাধাকৃষ্ণ মন্দির';
  const pages=[['index.html','হোম'],['events.html','উৎসব'],['ekadashi.html','একাদশী'],['calendar.html','পঞ্জিকা'],['deities.html','দেব-দেবী'],['committee.html','কমিটি'],['about.html','পরিচিতি'],['payment.html','সেবা']];
  const links=pages.map(([h,l])=>`<li><a href="${h}">${l}</a></li>`).join('');
  const mLinks=pages.map(([h,l])=>`<a href="${h}">${l}</a>`).join('');
  const logo=s.logo?`<img src="${s.logo}" alt="Logo">`:`<div class="nav-logo-placeholder">ॐ</div>`;
  return `<nav class="main-nav"><a href="index.html" class="nav-logo">${logo}<span class="nav-logo-text">${name}</span></a><ul class="nav-links">${links}</ul><button class="nav-music-btn" title="সংগীত চালু/বন্ধ">▶ সংগীত</button><div class="nav-hamburger"><span></span><span></span><span></span></div></nav><div class="mobile-nav">${mLinks}</div>`;
}

function getTickerHTML(text){
  const t=text||'হরে কৃষ্ণ হরে কৃষ্ণ | ওম নমঃ শিবায় | রাধে রাধে';
  return `<div class="ticker-wrap"><div class="ticker">${Array(4).fill(`<span class="ticker-item">🌸 ${t} ✦</span>`).join('')}</div></div>`;
}

function getFooterHTML(s){
  s=s||{};const name=s.mandir_name||'মন্দির';
  return `<footer class="main-footer"><span class="footer-om">ॐ</span><p class="footer-mantra">সর্বে ভবন্তু সুখিনঃ | সর্বে সন্তু নিরামযাঃ</p><nav class="footer-nav"><a href="index.html">হোম</a><a href="events.html">উৎসব</a><a href="ekadashi.html">একাদশী</a><a href="calendar.html">পঞ্জিকা</a><a href="committee.html">কমিটি</a><a href="payment.html">সেবা</a></nav><p class="footer-copy">© ${new Date().getFullYear()} ${name}. সর্বস্বত্ব সংরক্ষিত।</p></footer>`;
}

function formatDateBn(ds){if(!ds)return'';const d=new Date(ds);const m=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];return`${d.getDate()} ${m[d.getMonth()]}, ${d.getFullYear()}`;}
function fmtTime(time,ampm){if(!time)return'';return`${time} ${ampm||''}`.trim();}

document.addEventListener('DOMContentLoaded',()=>{
  new FlowerAnimation('flower-canvas');
  initNav();initScrollAnim();
  window.mandirAudio.autoStart();
  new LotusCursorTrail();
  setTimeout(showGitaShloka,2000);
});
