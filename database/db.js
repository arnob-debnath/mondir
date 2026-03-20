// ============================================================
// MANDIR DATABASE v6 — db.js
// ============================================================
const DB = {
  KEY: 'mandir_db',

  defaultData() {
    return {
      settings: {
        mandir_name: 'শ্রী রাধাকৃষ্ণ মহাদেব মন্দির',
        mandir_name_en: 'Sri Radha Krishna Mahadev Mandir',
        tagline: 'ভক্তি • শান্তি • মোক্ষ',
        established: '১৯৭৫',
        address: 'মেহেন্দিগঞ্জ, বরিশাল',
        phone: '+880-XXXX-XXXXXX',
        email: 'mandir@example.com',
        ticker_text: 'হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে | হরে রাম হরে রাম রাম রাম হরে হরে | ওম নমঃ শিবায়',
        logo: null,
        bg_music: null, bg_music_name: null,
        bell_sound: null, conch_sound: null,
        committee_template: null,
        hero_announcements: [
          { text: 'আসন্ন দুর্গাপূজা ২০২৬ — বিস্তারিত জানতে ক্লিক করুন', link: 'events.html', active: true },
          { text: 'প্রতিদিন সন্ধ্যা ৬টায় সন্ধ্যারতি অনুষ্ঠিত হয়', link: '', active: true },
        ],
      },
      timings: [
        { id:1, icon:'🌅', name:'মঙ্গল আরতি', time:'5:00', ampm:'AM', days:'প্রতিদিন' },
        { id:2, icon:'☀️', name:'প্রাতঃপূজা', time:'7:00', ampm:'AM', days:'প্রতিদিন' },
        { id:3, icon:'🌞', name:'ভোগ আরতি', time:'11:30', ampm:'AM', days:'প্রতিদিন' },
        { id:4, icon:'🌇', name:'সন্ধ্যারতি', time:'6:00', ampm:'PM', days:'প্রতিদিন' },
        { id:5, icon:'🌙', name:'শয়ন আরতি', time:'8:30', ampm:'PM', days:'প্রতিদিন' },
        { id:6, icon:'🔔', name:'বিশেষ পূজা', time:'10:00', ampm:'AM', days:'শনি ও রবিবার' },
      ],
      events: [
        { id:1001, title:'রামনবমী উৎসব', date:'2026-04-06', end_date:'2026-04-06', time:'6:00', ampm:'AM', end_time:'9:00', end_ampm:'PM', description:'শ্রী রামচন্দ্রের পবিত্র জন্মতিথি উপলক্ষে সারাদিনব্যাপী বিশেষ পূজা ও ভজন কীর্তনের আয়োজন করা হয়েছে।', tag:'বিশেষ পূজা', theme_image:null, photos:[], donation_enabled:true, donation_title:'রামনবমী উপলক্ষে অনুদান', status:'upcoming' },
        { id:1002, title:'অক্ষয় তৃতীয়া', date:'2026-04-29', end_date:'2026-04-29', time:'7:00', ampm:'AM', end_time:'8:00', end_ampm:'PM', description:'অক্ষয় তৃতীয়ার পুণ্য তিথিতে বিশেষ পূজার্চনা। এই দিনে দান, পূজা ও উপবাসের বিশেষ মাহাত্ম্য রয়েছে।', tag:'পুণ্য তিথি', theme_image:null, photos:[], donation_enabled:true, donation_title:'অক্ষয় তৃতীয়া অনুদান', status:'upcoming' },
      ],
      past_events: [
        { id:2001, title:'সরস্বতী পূজা ২০২৫', date:'2025-02-03', description:'বিদ্যার দেবী মা সরস্বতীর পূজা সম্পন্ন হয়েছে।', photos:[], images:[] },
        { id:2002, title:'হোলি উৎসব ২০২৫', date:'2025-03-14', description:'রঙের উৎসব দোলযাত্রা পালিত হয়েছে।', photos:[], images:[] },
      ],
      ekadashi: [],
      calendar_notes: [],
      committee: [
        { id:1, name:'শ্রী রামকৃষ্ণ দাস', role:'সভাপতি', phone:'+880-1XXX-XXXXXX', bio:'', facebook:'', order:1, image:null },
        { id:2, name:'শ্রীমতী সীতা রানী', role:'সম্পাদিকা', phone:'+880-1XXX-XXXXXX', bio:'', facebook:'', order:2, image:null },
        { id:3, name:'শ্রী গোবিন্দ চন্দ্র', role:'কোষাধ্যক্ষ', phone:'+880-1XXX-XXXXXX', bio:'', facebook:'', order:3, image:null },
      ],
      organization: {
        name: 'ছাত্রসংঘ',
        founded: '১৯৮০',
        members: '৫০০+',
        volunteers: '১২০+',
        programs_yearly: '৩৫+',
        history: 'এই সংগঠনটি মন্দিরের সাথে সম্পৃক্ত তরুণ প্রজন্মের দ্বারা পরিচালিত। বহু বছর ধরে ধর্মীয় ও সামাজিক কাজে অগ্রণী ভূমিকা রাখছে।',
        mission: 'হিন্দু ধর্ম ও সংস্কৃতির সংরক্ষণ এবং তরুণ প্রজন্মের মধ্যে ধর্মীয় চেতনা জাগ্রত করা।',
        vision: 'একটি সুশৃঙ্খল ও ধর্মপ্রাণ সমাজ গঠন।',
        logo: null,
        cover_photo: null,
        facebook_link: '',
        website_link: '',
        highlights: ['বার্ষিক পূজা আয়োজন', 'সেবামূলক কার্যক্রম', 'তরুণ প্রজন্মের উন্নয়ন'],
      },
      deities: [
        { id:1, name:'শ্রী রাধাকৃষ্ণ', title:'প্রেমের দেবতা', description:'ভগবান শ্রীকৃষ্ণ ও রাধারানীর যুগলমূর্তি মন্দিরের প্রধান বিগ্রহ।', image:null, sound:'bell' },
        { id:2, name:'শিব', title:'মহাদেব', description:'শ্রী শিব মহাদেবের লিঙ্গমূর্তি মন্দিরে পূজিত হয়।', image:null, sound:'conch' },
        { id:3, name:'দুর্গামাতা', title:'শক্তির দেবী', description:'মা দুর্গার দশভুজামূর্তি বিশেষ পূজিত।', image:null, sound:'bell' },
      ],
      seva_options: [
        { id:1, icon:'🌸', name:'দৈনিক পূজা সেবা', amount:501, description:'প্রতিদিনের পূজায় অংশগ্রহণ', featured:false },
        { id:2, icon:'🪔', name:'আরতি সেবা', amount:1001, description:'বিশেষ আরতিতে সহায়তা', featured:true },
        { id:3, icon:'🍚', name:'অন্নপ্রসাদ সেবা', amount:2001, description:'ভক্তদের প্রসাদ বিতরণ', featured:false },
        { id:4, icon:'💐', name:'ফুলের সেবা', amount:251, description:'দেব-দেবীকে ফুল অর্পণ', featured:false },
        { id:5, icon:'🏛', name:'মন্দির সংস্কার', amount:5001, description:'মন্দির উন্নয়নে সহায়তা', featured:true },
      ],
      donations: [],
      member_opinions: [],
      visitor_log: {},
      visitor_total: 0,
      admin: { username: 'admin', password: 'admin123' },
      admin_session: null,
    };
  },

  get(key) {
    try {
      const raw = localStorage.getItem(this.KEY);
      const db = raw ? JSON.parse(raw) : this.defaultData();
      return key ? (db[key] ?? this.defaultData()[key]) : db;
    } catch(e) { return key ? this.defaultData()[key] : this.defaultData(); }
  },

  set(key, value) {
    try {
      const db = this.get();
      db[key] = value;
      localStorage.setItem(this.KEY, JSON.stringify(db));
      return true;
    } catch(e) { console.error('DB.set error:', e); return false; }
  },

  init() {
    const db = this.get();
    if (!db.settings) {
      localStorage.setItem(this.KEY, JSON.stringify(this.defaultData()));
    }
    // Track visitor
    const today = new Date().toISOString().split('T')[0];
    const vlog = db.visitor_log || {};
    const lastVisit = sessionStorage.getItem('mandir_visited');
    if (lastVisit !== today) {
      sessionStorage.setItem('mandir_visited', today);
      vlog[today] = (vlog[today] || 0) + 1;
      db.visitor_log = vlog;
      db.visitor_total = (db.visitor_total || 0) + 1;
      localStorage.setItem(this.KEY, JSON.stringify(db));
    }
  },

  getVisitorStats() {
    const db = this.get();
    const vlog = db.visitor_log || {};
    const today = new Date().toISOString().split('T')[0];
    const monthly = {}, annual = {};
    Object.entries(vlog).forEach(([d, c]) => {
      const mon = d.substring(0,7);
      const yr = d.substring(0,4);
      monthly[mon] = (monthly[mon] || 0) + c;
      annual[yr] = (annual[yr] || 0) + c;
    });
    return { daily: vlog, monthly, annual, total: db.visitor_total || 0, todayCount: vlog[today] || 0 };
  },

  addOpinion(op) {
    const db = this.get();
    db.member_opinions = db.member_opinions || [];
    db.member_opinions.push({ id: Date.now(), name: op.name, text: op.text, date: new Date().toISOString(), approved: false });
    localStorage.setItem(this.KEY, JSON.stringify(db));
  },

  addDonation(don) {
    const db = this.get();
    db.donations = db.donations || [];
    db.donations.unshift({ id: Date.now(), ...don, date: new Date().toISOString() });
    localStorage.setItem(this.KEY, JSON.stringify(db));
    return db.donations[0].id;
  },

  checkEventStatus() {
    const db = this.get();
    const today = new Date().toISOString().split('T')[0];
    let changed = false;
    (db.events || []).forEach(ev => {
      const end = ev.end_date || ev.date;
      if (end < today && ev.status !== 'past') {
        ev.status = 'past';
        db.past_events = db.past_events || [];
        if (!db.past_events.find(p => p.id === ev.id)) {
          db.past_events.unshift({ ...ev });
        }
        changed = true;
      }
    });
    if (changed) {
      db.events = (db.events || []).filter(ev => (ev.end_date || ev.date) >= today);
      localStorage.setItem(this.KEY, JSON.stringify(db));
    }
  },

  isAdminLoggedIn() {
    return sessionStorage.getItem('mandir_admin') === 'true';
  },

  adminLogin(user, pass) {
    const db = this.get();
    const adm = db.admin || {};
    if ((adm.username || 'admin') === user && (adm.password || 'admin123') === pass) {
      sessionStorage.setItem('mandir_admin', 'true');
      sessionStorage.setItem('mandir_admin_time', new Date().toISOString());
      return true;
    }
    return false;
  },

  adminLogout() {
    sessionStorage.removeItem('mandir_admin');
    sessionStorage.removeItem('mandir_admin_time');
  },
};
