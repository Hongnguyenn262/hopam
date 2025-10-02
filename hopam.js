
/* ===== Bảng voicing cho hợp âm ===== */
const chordShapes = {
  "A":["A","A:2","A:3","A:4","A:5","A:6","A:7"],
  "A#":["A#","A#:2","A#:3","A#:4","A#:5","A#:6","A#:7"],
  "Ab":["Ab","Ab:2","Ab:3","Ab:4","Ab:5","Ab:6","Ab:7"],
  "Bb":["Bb","Bb:2","Bb:1","Bb:3","Bb:4","Bb:5","Bb:6"],
  "B":["B","B:2","B:3","B:4","B:5","B:6","B:7"],
  "C":["C","C:2","C:3","C:4","C:5","C:6","C:7"],
  "C#":["C#","C#:2","C#:3","C#:4","C#:5","C#:6","C#:7"],
  "Db":["Db","Db:2","Db:3","Db:4","Db:5","Db:6","Db:7"],
  "D":["D","D:2","D:3","D:4","D:5","D:6","D:7"],
  "D#":["D#","D#:2","D#:3","D#:4","D#:5","D#:6","D#:7"],
  "Eb":["Eb","Eb:2","Eb:3","Eb:4","Eb:5","Eb:6","Eb:7"],
  "Dm7":["Dm7","Dm7:2","Dm7:3","Dm7:4","Dm7:5","Dm7:6","Dm7:7"],
  "Em7":["Em7","Em7:2","Em7:3","Em7:4","Em7:5","Em7:6","Em7:7"],
  "E":["E","E:2","E:3","E:4","E:5","E:6","E:7"],
  "F":["F","F:1","F:2","F:3","F:4","F:5","F:6","F:7","F:8"],
  "F#":["F#","F#:2","F#:3","F#:4","F#:5","F#:6","F#:7"],
  "Gb":["Gb","Gb:2","Gb:3","Gb:4","Gb:5","Gb:6","Gb:7"],
  "G":["G","G:2","G:3","G:4","G:5","G:6","G:7"],
  "G#":["G#","G#:2","G#:3","G#:4","G#:5","G#:6","G#:7"],
  "Cm":["Cm","Cm:2","Cm:3","Cm:4","Cm:5","Cm:6","Cm:7"],
  "C#m":["C#m","C#m:2","C#m:3","C#m:4","C#m:5","C#m:6","C#m:7"],
  "Dbm":["Dbm","Dbm:2","Dbm:3","Dbm:4","Dbm:5","Dbm:6","Dbm:7"],
  "Dm":["Dm","Dm:2","Dm:3","Dm:4","Dm:5","Dm:6","Dm:7"],
  "D#m":["D#m","D#m:2","D#m:3","D#m:4","D#m:5","D#m:6","D#m:7"],
  "Ebm":["Ebm","Ebm:2","Ebm:3","Ebm:4","Ebm:5","Ebm:6","Ebm:7"],
  "Em":["Em","Em:2","Em:3","Em:4","Em:5","Em:6","Em:7"],
  "Fm":["Fm","Fm:1","Fm:2","Fm:3","Fm:4","Fm:5","Fm:6"],
  "F#m":["F#m","F#m:2","F#m:3","F#m:4","F#m:5","F#m:6","F#m:7"],
  "Gbm":["Gbm","Gbm:2","Gbm:3","Gbm:4","Gbm:5","Gbm:6","Gbm:7"],
  "Gm":["Gm","Gm:2","Gm:3","Gm:4","Gm:5","Gm:6","Gm:7"],
  "G#m":["G#m","G#m:2","G#m:3","G#m:4","G#m:5","G#m:6","G#m:7"],
  "Abm":["Abm","Abm:2","Abm:3","Abm:4","Abm:5","Abm:6","Abm:7"],
  "Am":["Am","Am:2","Am:3","Am:4","Am:5","Am:6","Am:7"],
  "A#m":["A#m","A#m:2","A#m:1","A#m:3","A#m:4","A#m:5","A#m:6"],
  "Bbm":["Bbm","Bbm:1","Bbm:2","Bbm:3","Bbm:4","Bbm:5","Bbm:6"],
  "Bm":["Bm","Bm:2","Bm:3","Bm:4","Bm:5","Bm:6","Bm:7"],
  "A7":["A7","A7:2","A7:3","A7:4","A7:5","A7:6","A7:7"],
  "A#7":["A#7","A#7:2","A#7:3","A#7:4","A#7:5","A#7:6","A#7:7"],
  "B7":["B7","B7:2","B7:3","B7:4","B7:5","B7:6","B7:7"],
  "C7":["C7","C7:2","C7:3","C7:4","C7:5","C7:6","C7:7"],
  "C#7":["C#7","C#7:2","C#7:3","C#7:4","C#7:5","C#7:6","C#7:7"],
  "Db7":["Db7","Db7:2","Db7:3","Db7:4","Db7:5","Db7:6","Db7:7"],
  "D7":["D7","D7:2","D7:3","D7:4","D7:5","D7:6","D7:7"],
  "D#7":["D#7","D#7:2","D#7:3","D#7:4","D#7:5","D#7:6","D#7:7"],
  "Eb7":["Eb7","Eb7:2","Eb7:3","Eb7:4","Eb7:5","Eb7:6","Eb7:7"],
  "E7":["E7","E7:2","E7:3","E7:4","E7:5","E7:6","E7:7"],
  "F7":["F7","F7:1","F7:8"],
  "F#7":["F#7","F#7:2","F#7:3","F#7:4","F#7:5","F#7:6","F#7:9"],
  "Gb7":["Gb7","Gb7:2","Gb7:3","Gb7:4","Gb7:5","Gb7:6","Gb7:9"],
  "G7":["G7","G7:2","G7:3","G7:4","G7:5","G7:6","G7:7","G7:9","G7:10"],
  "Asus2":["Asus2","Asus2:2","Asus2:3","Asus2:4","Asus2:5"],
  "Cmaj7":["Cmaj7","Cmaj7:2","Cmaj7:3","Cmaj7:4","Cmaj7:5"],
  "Bsus4":["Bsus4","Bsus4:2","Bsus4:3","Bsus4:4","Bsus4:5"],
};

/* ===== Biến dùng chung ===== */
const BASE_NOTES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const chords = Object.keys(chordShapes);
let currentSemitones=0, originalFirstChord="", autoScrollInterval=null, currentZoom=100, scrollMode=0;

/* ===== Hợp âm ===== */
function transposeChord(chord, step){
  if(!chord) return chord;
  const m=chord.match(/^([A-Ga-g][#b]?)(.*)$/i);
  if(!m) return chord;
  let idx=BASE_NOTES.indexOf(m[1].toUpperCase());
  if(idx<0) return chord;
  return BASE_NOTES[(idx+step+12)%12]+m[2];
}

function updateToneDisplay(){
  document.getElementById('current-tone').textContent=transposeChord(originalFirstChord,currentSemitones);
}

function updateSongContent(step){
  currentSemitones+=step; updateToneDisplay();
  document.querySelectorAll("#song-content .chord-highlight").forEach(el=>{
    el.textContent=`[${transposeChord(el.dataset.originalChord,currentSemitones)}]`;
  });
  updateChordDiagrams();
}

function resetTone(){
  currentSemitones=0; updateToneDisplay();
  document.querySelectorAll("#song-content .chord-highlight").forEach(el=>{
    el.textContent=`[${el.dataset.originalChord}]`;
  });
  updateChordDiagrams();
}

function updateChordDiagrams(){
  const wrap=document.getElementById("chord-diagrams");
  wrap.innerHTML="";
  const uniq=new Set([...document.querySelectorAll(".chord-highlight")].map(el=>el.textContent.replace(/\[|\]/g,"")));
  uniq.forEach(chord=>{
    const w=document.createElement("div"); w.className="chord-svg-wrapper"; w.dataset.chord=chord; w.dataset.index=0;
    const box=document.createElement("div"); box.className="jtab"; box.textContent=(chordShapes[chord]||[chord])[0]; w.appendChild(box);
    const ctr=document.createElement("div"); ctr.className="chord-controls"; ctr.innerHTML=`<button class="chord-prev">⬅️</button><span class="chord-label">thế bấm</span><button class="chord-next">➡️</button>`;
    w.appendChild(ctr); wrap.appendChild(w); jtab.render(box);
    ctr.querySelector(".chord-prev").addEventListener("click",()=>changeVoicing(w,chord,-1));
    ctr.querySelector(".chord-next").addEventListener("click",()=>changeVoicing(w,chord,1));
  });
}

function changeVoicing(w,chord,step){
  const arr=chordShapes[chord]||[chord];
  let idx=(+w.dataset.index+step+arr.length)%arr.length;
  w.dataset.index=idx;
  const old=w.querySelector(".jtab");
  const n=document.createElement("div"); n.className="jtab"; n.textContent=arr[idx];
  w.replaceChild(n,old); jtab.render(n);
}

/* ===== Zoom ===== */
function applyZoom(){ document.querySelectorAll('.post-body p').forEach(p=>p.style.fontSize=currentZoom+"%"); }
function zoomIn(){ currentZoom=Math.min(200,currentZoom+10); applyZoom(); }
function zoomOut(){ currentZoom=Math.max(50,currentZoom-10); applyZoom(); }
function resetZoom(){ currentZoom=100; applyZoom(); }

/* ===== Auto Scroll ===== */
function toggleAutoScroll(){
  const btn=document.getElementById("auto-scroll-btn"), step=1, target=document.getElementById("chord-diagrams"), fallback=document.body.scrollHeight;
  scrollMode=(scrollMode+1)%3; if(autoScrollInterval){clearInterval(autoScrollInterval); autoScrollInterval=null;}
  if(scrollMode===0){btn.textContent="\u21E9 Cuộn";return;}
  const speed=scrollMode===1?140:100; btn.textContent=scrollMode===1?"\u21E9 Nhanh":"ll Dừng";
  autoScrollInterval=setInterval(()=>{
    if((target&&target.getBoundingClientRect().top<=innerHeight)||(scrollY+innerHeight>=fallback)){stopAutoScroll(btn);}
    else scrollBy(0,step);
  },speed);
}
function stopAutoScroll(btn){clearInterval(autoScrollInterval);autoScrollInterval=null;scrollMode=0;btn.textContent="\u21E9 Cuộn";}
function scrollToTop(){scrollTo({top:0,behavior:"smooth"});}

// Đổi "anh" <-> "em" khi là từ độc lập theo Unicode
function doiAnhEm(txt) {
  return txt.replace(
    /(\[[^\]]+\])|((^|[^\p{L}])(anh|em)(?=[^\p{L}]|$))/giu,
    function (_match, chord, _whole, pre, word) {
      if (chord) return chord; // giữ nguyên phần hợp âm [Em], [Dm7], ...
      const swapped = word.toLowerCase() === "anh" ? "em" : "anh";
      return (pre || "") + matchCase(word, swapped);
    } );}
// Bảo toàn kiểu hoa thường ANH em
function matchCase(src, dst) {
  if (src === src.toUpperCase()) return dst.toUpperCase(); 
  if (src[0] === src[0].toUpperCase() && src.slice(1) === src.slice(1).toLowerCase())
    return dst[0].toUpperCase() + dst.slice(1);        
  return dst;                                                               
}
/* ===== Init ===== */
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("tone-up").addEventListener("click",()=>updateSongContent(1));
  document.getElementById("tone-down").addEventListener("click",()=>updateSongContent(-1));
  document.getElementById("tone-reset").addEventListener("click",resetTone);
  const song=document.getElementById("song-content");
  if(song){
    song.innerHTML=song.innerHTML.replace(new RegExp(`\\[(\\b(${chords.join("|")})\\b)\\]`,"g"),'<span class="chord-highlight" data-original-chord="$1">[$1]</span>');
    const first=document.querySelector(".chord-highlight"); originalFirstChord=first?first.dataset.originalChord:"Gốc";
    updateChordDiagrams(); updateToneDisplay();
  }
  const toggleBtn=document.getElementById("toggle-anh-em");
  if(toggleBtn&&song){let tog=false, orig=song.innerHTML;toggleBtn.addEventListener("click",()=>{song.innerHTML=tog?orig:doiAnhEm(orig);toggleBtn.textContent=tog?"Đổi Anh/Em":"Trở lại gốc";tog=!tog;});}
});

/*nâng cấp in và tách lời */
// Lấy tiêu đề bài hát từ DOM / meta / document.title
function getSongTitle() {
  const h = document.querySelector(
    '.post-title, .entry-title, article h1, header h1, .entry-header h1'
  );
  if (h && h.textContent.trim()) return h.textContent.trim();
  const og = document.querySelector('meta[property="og:title"]');
  if (og && og.content) return og.content.trim();
  // Fallback: cắt bỏ tên site sau dấu | hoặc - nếu có
  return (document.title || 'Bài hát').replace(/\s*[\|\-–]\s*[^|\-–]+$/, '').trim();
}
// Escape để chèn vào HTML an toàn
function escapeHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
/* ===== In bài hát ===== */
function printSong() {
  const songContent = document.getElementById("song-content");
  const chordDiagrams = document.getElementById("chord-diagrams");
  if (!songContent) return;
const title = escapeHtml(getSongTitle());
  // Lấy HTML cần in
  const content = `
    <html>
      <head>
        <style> body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; } .chord-highlight { font-weight: bold; color: #d33; } .chord-svg-wrapper { display: inline-block; margin: 10px; }.chord-controls {   DISPLAY: NONE !important; }
        #baihat {   DISPLAY: NONE !important; }   #separator {   DISPLAY: NONE !important; }    .separator {   DISPLAY: NONE !important; } .baihat {   DISPLAY: NONE !important; }     </style>
      </head>
      <body>     <h2>${title}</h2>      <div>${songContent.innerHTML}</div>
<p>Nguồn: Timhopam.com </p>
     </body>  </html> `;
  const win = window.open("", "_blank");
  win.document.write(content); win.document.close();
  win.print();
}
/* ===== Tách lời bài hát (ẩn/hiện hợp âm) ===== */
let lyricsOnly = false;
function toggleLyricsOnly() {
  const btn = document.getElementById("btn-toggle-lyrics");
  const songContent = document.getElementById("song-content");
  if (!songContent) return;
  if (!lyricsOnly) {
    // Ẩn hợp âm (giữ lại lyrics)
    songContent.querySelectorAll(".chord-highlight").forEach(el => {
      el.style.display = "none";
    });
    btn.textContent = "\u266C Hiện";
    lyricsOnly = true;
  } else {
    // Hiện lại hợp âm
    songContent.querySelectorAll(".chord-highlight").forEach(el => {
      el.style.display = "inline";
    });
    btn.textContent = "\u266C  Ẩn";
    lyricsOnly = false;
  }
}
/* ===== Gắn sự kiện ===== */
document.addEventListener("DOMContentLoaded", () => {
  const printBtn = document.getElementById("btn-print");
  const lyricsBtn = document.getElementById("btn-toggle-lyrics");
  if (printBtn) printBtn.addEventListener("click", printSong);
  if (lyricsBtn) lyricsBtn.addEventListener("click", toggleLyricsOnly);
});
