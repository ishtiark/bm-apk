
const { useState, useMemo, useEffect } = React;
const WA = "https://wa.me/8801568251443?text=" + encodeURIComponent("Hi, I’d like to book a class.");
const BASE = "https://ishtiark.github.io/bmacademy/src/";
const url = (n, special) => BASE + encodeURIComponent("BM Academy – " + (special || n + " Day-by-Day Lesson Plan") + ".html");

const MODS = [
 ["Foundations & Prompt Engineering",20,4,"f","Foundations & Prompt Engineering Lesson Plan","AI fundamentals, prompt formulas, fact-checking and a 25-prompt library.","এআই-এর মূল ধারণা, প্রম্পট ফর্মুলা, তথ্য যাচাই এবং ২৫টি প্রম্পটের লাইব্রেরি।"],
 ["ChatGPT",40,7,"a",0,"Custom GPTs, research, reports, data summaries and professional writing.","কাস্টম GPT, গবেষণা, রিপোর্ট, ডেটা সারাংশ ও পেশাদার লেখা।"],
 ["Microsoft Copilot",20,4,"a","Copilot Day-by-Day Lesson Plan","Copilot across Word, Excel, PowerPoint and Outlook.","ওয়ার্ড, এক্সেল, পাওয়ারপয়েন্ট ও আউটলুকে কোপাইলট।"],
 ["Deepseek",20,4,"a",0,"Step-by-step reasoning, mathematics, logic and code generation.","ধাপে ধাপে যুক্তি, গণিত, লজিক ও কোড তৈরি।"],
 ["Gemini",30,5,"a",0,"Google Workspace, deep research, document understanding and planning.","গুগল ওয়ার্কস্পেস, ডিপ রিসার্চ, ডকুমেন্ট বোঝা ও পরিকল্পনা।"],
 ["Grammarly",15,3,"w",0,"Grammar, tone, clarity, plagiarism checks and AI-assisted rewriting.","ব্যাকরণ, টোন, স্পষ্টতা, প্লেজিয়ারিজম চেক ও এআই রিরাইটিং।"],
 ["Quillbot",15,3,"w",0,"Responsible paraphrasing, summarising, citations and co-writing.","দায়িত্বশীল প্যারাফ্রেজ, সারাংশ, সাইটেশন ও সহ-লেখা।"],
 ["Jasper",20,4,"w",0,"Brand voice, ad copy, product descriptions, SEO and campaign writing.","ব্র্যান্ড ভয়েস, বিজ্ঞাপনের কপি, পণ্যের বিবরণ, এসইও ও ক্যাম্পেইন লেখা।"],
 ["Canva",35,6,"d",0,"Brand kits, social posts, presentations, posters and short videos.","ব্র্যান্ড কিট, সোশ্যাল পোস্ট, প্রেজেন্টেশন, পোস্টার ও ছোট ভিডিও।"],
 ["Pixlr",20,4,"d",0,"AI photo editing, retouching, generative fill and platform resizing.","এআই ফটো এডিটিং, রিটাচ, জেনারেটিভ ফিল ও প্ল্যাটফর্ম অনুযায়ী রিসাইজ।"],
 ["Invideo",25,5,"d",0,"Text-to-video, scripts, stock media, captions and format conversion.","টেক্সট-টু-ভিডিও, স্ক্রিপ্ট, স্টক মিডিয়া, ক্যাপশন ও ফরম্যাট কনভার্সন।"],
 ["Eleven Labs",20,4,"d",0,"Text-to-speech, multilingual voiceovers, audio and ethical voice use.","টেক্সট-টু-স্পিচ, বহুভাষিক ভয়েসওভার, অডিও ও নৈতিক ভয়েস ব্যবহার।"],
 ["Capstone Project",20,4,"c","Capstone Project Lesson Plan","Research, copy, design, video and a complete AI-powered campaign.","গবেষণা, কপি, ডিজাইন, ভিডিও এবং সম্পূর্ণ এআই-চালিত ক্যাম্পেইন।"],
];

const T = {
 en: {
  nav:["Courses","AI course","Learning path","Portfolio"], book:"Book a class", dark:"Dark", light:"Light",
  h1:"Learn it. Then show your working.",
  lead:"Brightmind Academy is a learning center for high school students. We teach the reasoning behind every answer, so grades improve and stay improved.",
  how:"See how we teach", pills:["Classes of 8 or fewer","Written plan for every student","Monthly note to guardians"],
  solve:"Solve: 3x + 7 = 22", s1:"take 7 from both sides", note:"Right answer. Better: you told me why.",
  subjH:"Five subjects, taught for understanding", subjP:"Every course follows your school syllabus, then goes further where the student is ready.",
  subs:[["Mathematics","Algebra, geometry, trigonometry and the first ideas of calculus, built from why a method works.","Grades 9 to 12"],
   ["Physics and chemistry","Weekly demonstrations and lab-style problems that turn formulas into things you can see.","Grades 9 to 12"],
   ["Biology","From cells to ecosystems, using diagrams students draw and explain themselves.","Grades 9 to 12"],
   ["English and writing","Clear essays, confident speaking and close reading of set texts.","Grades 9 to 12"],
   ["University preparation","SAT and IELTS practice, application essays and help choosing subjects.","Grades 11 and 12"]],
  aiH:"BM Academy AI Course Module", aiP:"A 300-hour, tool-by-tool programme covering 11 AI tools, practical assignments and a final capstone portfolio.",
  st:["total hours","teaching days","AI tools","modules"],
  note2:"The 300 instructional hours follow the 57-day lesson plan (about 5 hours 16 minutes per day on average). Daily hours vary by module.",
  search:"Search course modules", cats:{all:"All modules",f:"Foundations",a:"AI assistants",w:"Writing tools",d:"Design & media",c:"Capstone"},
  none:"No modules match your search.", d:"days", open:"Open lesson plan ↗",
  pathH:"Four steps from stuck to sure", pathP:"Every student follows the same path, at their own pace. Guardians see each step in writing.",
  steps:[["Start with where you are","A 40-minute conversation and a short task show what the student knows and where they get stuck.","week 1"],
   ["Agree where you are going","Goals, topics and weekly targets go on one page. Students and guardians each get a copy.","week 1"],
   ["Learn in small groups","A short explanation, then guided practice. Every student answers and shows their working in every class.","weeks 2 to 12"],
   ["Check and adjust","A monthly mock test and a progress note. If the results ask for a new plan, we write one.","every month"]],
  bookH:"Book a class on WhatsApp", bookP:"Message us with the class you are interested in and we can help arrange a time.", wa:"Message us on WhatsApp",
  role:"AI COURSE INSTRUCTOR", bio:"Background, skills, and selected projects.", port:"View portfolio ↗"
 },
 bn: {
  nav:["কোর্সসমূহ","এআই কোর্স","শেখার পথ","পোর্টফোলিও"], book:"ক্লাস বুক করুন", dark:"ডার্ক", light:"লাইট",
  h1:"শিখুন। তারপর দেখান কীভাবে করলেন।",
  lead:"ব্রাইটমাইন্ড একাডেমি উচ্চ বিদ্যালয়ের শিক্ষার্থীদের জন্য একটি লার্নিং সেন্টার। আমরা প্রতিটি উত্তরের পেছনের যুক্তি শেখাই, যাতে ফলাফল ভালো হয় এবং ভালো থাকে।",
  how:"কীভাবে শেখাই দেখুন", pills:["সর্বোচ্চ ৮ জনের ক্লাস","প্রত্যেক শিক্ষার্থীর জন্য লিখিত পরিকল্পনা","অভিভাবকের জন্য মাসিক প্রতিবেদন"],
  solve:"সমাধান করুন: 3x + 7 = 22", s1:"দুই পাশ থেকে ৭ বিয়োগ করুন", note:"উত্তর সঠিক। আরও ভালো: তুমি কারণটাও বলেছ।",
  subjH:"বোঝার জন্য শেখানো পাঁচটি বিষয়", subjP:"প্রতিটি কোর্স আপনার স্কুলের সিলেবাস অনুসরণ করে, তারপর শিক্ষার্থী প্রস্তুত হলে আরও এগিয়ে যায়।",
  subs:[["গণিত","বীজগণিত, জ্যামিতি, ত্রিকোণমিতি ও ক্যালকুলাসের প্রথম ধারণা, পদ্ধতিটি কেন কাজ করে তা থেকে গড়া।","নবম থেকে দ্বাদশ শ্রেণি"],
   ["পদার্থবিজ্ঞান ও রসায়ন","সাপ্তাহিক ডেমোনস্ট্রেশন ও ল্যাব-ধাঁচের সমস্যা, যা সূত্রকে চোখে দেখা বিষয়ে পরিণত করে।","নবম থেকে দ্বাদশ শ্রেণি"],
   ["জীববিজ্ঞান","কোষ থেকে বাস্তুতন্ত্র, শিক্ষার্থীদের নিজেদের আঁকা ও ব্যাখ্যা করা চিত্রের মাধ্যমে।","নবম থেকে দ্বাদশ শ্রেণি"],
   ["ইংরেজি ও লেখালেখি","স্পষ্ট প্রবন্ধ, আত্মবিশ্বাসী বক্তৃতা ও নির্ধারিত পাঠ্যের মনোযোগী পাঠ।","নবম থেকে দ্বাদশ শ্রেণি"],
   ["বিশ্ববিদ্যালয় প্রস্তুতি","SAT ও IELTS অনুশীলন, আবেদনের রচনা এবং বিষয় বেছে নিতে সহায়তা।","একাদশ ও দ্বাদশ শ্রেণি"]],
  aiH:"বিএম একাডেমি এআই কোর্স মডিউল", aiP:"৩০০ ঘণ্টার টুল-ভিত্তিক প্রোগ্রাম: ১১টি এআই টুল, ব্যবহারিক অ্যাসাইনমেন্ট এবং চূড়ান্ত ক্যাপস্টোন পোর্টফোলিও।",
  st:["মোট ঘণ্টা","শিক্ষাদিবস","এআই টুল","মডিউল"],
  note2:"৩০০ ঘণ্টার পাঠদান ৫৭ দিনের পাঠ পরিকল্পনা অনুসরণ করে (গড়ে দৈনিক প্রায় ৫ ঘণ্টা ১৬ মিনিট)। মডিউলভেদে দৈনিক সময় ভিন্ন হয়।",
  search:"কোর্স মডিউল খুঁজুন", cats:{all:"সব মডিউল",f:"ভিত্তি",a:"এআই সহকারী",w:"লেখার টুল",d:"ডিজাইন ও মিডিয়া",c:"ক্যাপস্টোন"},
  none:"আপনার খোঁজের সাথে কোনো মডিউল মেলেনি।", d:"দিন", open:"পাঠ পরিকল্পনা খুলুন ↗",
  pathH:"আটকে থাকা থেকে নিশ্চিত হওয়া: চার ধাপ", pathP:"প্রত্যেক শিক্ষার্থী নিজের গতিতে একই পথ অনুসরণ করে। অভিভাবকরা প্রতিটি ধাপ লিখিতভাবে দেখতে পান।",
  steps:[["আপনি এখন কোথায় তা দিয়ে শুরু","৪০ মিনিটের আলাপ ও একটি ছোট কাজ থেকে বোঝা যায় শিক্ষার্থী কী জানে এবং কোথায় আটকে যায়।","সপ্তাহ ১"],
   ["কোথায় যেতে চান ঠিক করুন","লক্ষ্য, বিষয় ও সাপ্তাহিক টার্গেট এক পাতায় লেখা হয়। শিক্ষার্থী ও অভিভাবক দুজনেই একটি করে কপি পান।","সপ্তাহ ১"],
   ["ছোট দলে শিখুন","সংক্ষিপ্ত ব্যাখ্যা, তারপর নির্দেশিত অনুশীলন। প্রতিটি ক্লাসে প্রত্যেক শিক্ষার্থী উত্তর দেয় ও কীভাবে করল তা দেখায়।","সপ্তাহ ২ থেকে ১২"],
   ["যাচাই করুন ও সমন্বয় করুন","মাসিক মক টেস্ট ও অগ্রগতির প্রতিবেদন। ফল নতুন পরিকল্পনা চাইলে আমরা তা লিখি।","প্রতি মাসে"]],
  bookH:"হোয়াটসঅ্যাপে ক্লাস বুক করুন", bookP:"যে ক্লাসে আগ্রহী তা জানিয়ে আমাদের মেসেজ করুন, আমরা সময় ঠিক করতে সাহায্য করব।", wa:"হোয়াটসঅ্যাপে মেসেজ করুন",
  role:"এআই কোর্স ইনস্ট্রাক্টর", bio:"পটভূমি, দক্ষতা ও নির্বাচিত প্রজেক্ট।", port:"পোর্টফোলিও দেখুন ↗"
 }
};

const store = {
  get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
};

function App(){
  const [lang,setLang] = useState(() => store.get("bm-lang") || "en");
  const [theme,setTheme] = useState(() => store.get("bm-theme") || "");
  const [q,setQ] = useState("");
  const [cat,setCat] = useState("all");
  const t = T[lang];
  useEffect(() => { document.documentElement.lang = lang; store.set("bm-lang",lang); }, [lang]);
  useEffect(() => { document.documentElement.dataset.theme = theme; store.set("bm-theme",theme); }, [theme]);
  const isDark = theme ? theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  const L = lang === "bn" ? 2 : 1;
  const shown = useMemo(() => MODS.map((m,i) => ({m,i})).filter(({m}) => {
    const hay = (m[0] + " " + m[5] + " " + m[6]).toLowerCase();
    return (cat === "all" || m[3] === cat) && hay.includes(q.trim().toLowerCase());
  }), [q,cat]);
  const ids = ["courses","course-module","path","portfolio"];

  return (<>
    <header><div className="wrap nav">
      <a className="logo" href="#top">Bright<span>mind</span></a>
      <nav className="links">{t.nav.map((n,i) => <a key={i} href={"#"+ids[i]}>{n}</a>)}</nav>
      <div className="tools">
        <button className="btn" onClick={() => setLang(lang === "en" ? "bn" : "en")} aria-label="Language">{lang === "en" ? "বাংলা" : "English"}</button>
        <button className="btn" onClick={() => setTheme(isDark ? "light" : "dark")}>{isDark ? t.light : t.dark}</button>
        <a className="btn p" href="#join">{t.book}</a>
      </div>
    </div></header>

    <main id="top">
      <section><div className="wrap hero">
        <div>
          <h1>{t.h1}</h1><p className="sub">{t.lead}</p>
          <a className="btn p" href="#path">{t.how}</a>{" "}<a className="btn" href="#join">{t.book}</a>
          <div className="pills">{t.pills.map(p => <span className="pill" key={p}>{p}</span>)}</div>
        </div>
        <div className="board">
          <div>{t.solve}</div>
          <div>3x = 22 − 7<em>{t.s1}</em></div>
          <div>3x = 15</div><div>x = 5</div>
          <div>3(5) + 7 = 22 <span className="ok">✓</span></div>
          <div className="note">{t.note}</div>
        </div>
      </div></section>

      <section id="courses"><div className="wrap">
        <h2>{t.subjH}</h2><p className="sub">{t.subjP}</p>
        <div className="grid">{t.subs.map((s,i) => (
          <a className="card" href="#join" key={i}><h3>{s[0]}</h3><p>{s[1]}</p><span className="tag">{s[2]}</span></a>
        ))}</div>
      </div></section>

      <section id="course-module"><div className="wrap">
        <h2>{t.aiH}</h2><p className="sub">{t.aiP}</p>
        <div className="stats">{["300","57","11","13"].map((n,i) => <div className="stat" key={i}><b>{n}</b><span>{t.st[i]}</span></div>)}</div>
        <p className="sub">{t.note2}</p>
        <div className="bar">
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} aria-label={t.search} />
          {Object.keys(t.cats).map(k => <button key={k} className="chip" aria-pressed={cat === k} onClick={() => setCat(k)}>{t.cats[k]}</button>)}
        </div>
        {shown.length === 0 && <p className="empty">{t.none}</p>}
        <div className="grid">{shown.map(({m,i}) => (
          <a className="card mod" key={i} href={url(m[0], m[4])} target="_blank" rel="noopener">
            <div className="n">{String(i).padStart(2,"0")} · {m[1]}h · {m[2]} {t.d}</div>
            <h3>{m[0]}</h3><p>{m[4+L]}</p><span className="tag">{t.open}</span>
          </a>
        ))}</div>
      </div></section>

      <section id="path"><div className="wrap">
        <h2>{t.pathH}</h2><p className="sub">{t.pathP}</p>
        <div className="steps">{t.steps.map((s,i) => <div className="step" key={i}><h3>{s[0]}</h3><p>{s[1]}</p><span className="tag">{s[2]}</span></div>)}</div>
      </div></section>

      <section id="join"><div className="wrap"><div className="box">
        <div><h2>{t.bookH}</h2><p className="sub" style={{margin:0}}>{t.bookP}</p><p style={{margin:"10px 0 0",fontWeight:600}}>+8801568251443</p></div>
        <a className="btn p" href={WA} target="_blank" rel="noopener">{t.wa}</a>
      </div></div></section>

      <section id="portfolio"><div className="wrap"><div className="box">
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          <div className="avatar">AIE</div>
          <div><span className="tag">{t.role}</span><h3 style={{margin:"2px 0",fontSize:22}}>{lang === "bn" ? "আরিফ ইশতিয়াক ইমন" : "Arif Ishtiaq Emon"}</h3><span style={{color:"var(--muted)",fontSize:14.5}}>{t.bio}</span></div>
        </div>
        <a className="btn" href="https://ishtiark.github.io/Portfolio/" target="_blank" rel="noopener">{t.port}</a>
      </div></div></section>
    </main>

    <footer><div className="wrap f"><span>© 2026 Brightmind Academy</span>
      <span>{t.nav.map((n,i) => <a key={i} href={"#"+ids[i]} style={{marginRight:14}}>{n}</a>)}</span></div></footer>
  </>);
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
