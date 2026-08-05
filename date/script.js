/* ============================================================
   👉 À PERSONNALISER — c'est ICI et NULLE PART AILLEURS
   ============================================================ */
const CONFIG = {
  herName:  "Madame",                 // ex: "Léa" (laisse vide "" si tu veux la surprise)
  myName:   "Verand",           // ton prénom
  myPhone:  "33695492708",      // ton numéro international SANS le "+"  (FR: 06 12 34 56 78 -> "33612345678")
};
/* ============================================================ */


/* ---- Poussière d'étoiles (décor) ---- */
const dust = document.getElementById('dust');
for(let i=0;i<26;i++){
  const s=document.createElement('span');
  s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%';
  s.style.animationDelay=(Math.random()*4)+'s'; s.style.transform=`scale(${.5+Math.random()})`;
  dust.appendChild(s);
}

/* ---- Navigation entre les écrans ---- */
const screens = ['screen-env','screen-ask','screen-when','screen-what','screen-done'];
function show(id){ screens.forEach(s=>document.getElementById(s).classList.toggle('active', s===id)); }

/* ---- Écran 1 : ouverture de l'enveloppe ---- */
const envWrap = document.getElementById('envWrap');
function openEnvelope(){
  if(envWrap.classList.contains('opened')) return;
  envWrap.classList.add('opened');
  const title=document.getElementById('askTitle');
  if(CONFIG.herName.trim()) title.innerHTML=`${CONFIG.herName},<br>veux-tu sortir<br>avec moi&nbsp;?`;
  setTimeout(()=>show('screen-ask'), 950);
}
envWrap.addEventListener('click', openEnvelope);
envWrap.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();openEnvelope();}});

/* ---- Écran 2 : le "Non" qui s'enfuit ---- */
const arena=document.getElementById('arena');
const btnYes=document.getElementById('btnYes');
const btnNo=document.getElementById('btnNo');
// Les phrases qui s'affichent sur le bouton "Non" au fur et à mesure :
const taunts=["Non","T'es sûre ?","Réfléchis…","Vraiment ?","Attends…","Regarde le Oui 👀","Dernière chance","Allez quoi 🥺","Impossible 😌"];
let dodges=0;
function fleeNo(){
  dodges++;
  const a=arena.getBoundingClientRect();
  const bw=btnNo.offsetWidth, bh=btnNo.offsetHeight;
  const maxX=Math.max(0,a.width-bw), maxY=Math.max(0,a.height-bh);
  btnNo.style.left=(Math.random()*maxX)+'px';
  btnNo.style.top=(Math.random()*maxY)+'px';
  btnNo.style.transform='none';
  btnNo.textContent=taunts[Math.min(dodges,taunts.length-1)];
  btnYes.style.transform=`translateX(-50%) scale(${Math.min(1+dodges*0.12,1.9)})`; // le Oui grossit
}
btnNo.addEventListener('mouseenter', fleeNo);
btnNo.addEventListener('mousedown', e=>{e.preventDefault(); fleeNo();});
btnNo.addEventListener('touchstart', e=>{e.preventDefault(); fleeNo();}, {passive:false});
btnNo.addEventListener('click', e=>{e.preventDefault(); fleeNo();});
btnYes.addEventListener('click', ()=>{ burstHearts(28); prepDate(); show('screen-when'); });

/* ---- Écran 3 : date & heure ---- */
const pick={ date:null, time:null, act:null };
const dateInput=document.getElementById('dateInput');
const timeInput=document.getElementById('timeInput');
const whenNext=document.getElementById('whenNext');
function prepDate(){
  dateInput.min=new Date().toISOString().split('T')[0]; // empêche de choisir une date passée
}
function checkWhen(){ whenNext.disabled=!(dateInput.value && timeInput.value); }
dateInput.addEventListener('change', ()=>{ pick.date=dateInput.value; checkWhen(); });
timeInput.addEventListener('change', ()=>{ pick.time=timeInput.value; checkWhen(); });
whenNext.onclick=()=>show('screen-what');

/* ---- Écran 4 : activité ---- */
// Pour modifier les activités : change/ajoute des lignes ici (e=emoji, t=titre, s=sous-titre)
const acts=[
  {e:"🍝",t:"Restau",s:"Une bonne table"},
  {e:"🎬",t:"Ciné",s:"Un film + popcorn"},
  {e:"🍹",t:"Un verre",s:"Bar cosy"},
  {e:"🚶",t:"Balade",s:"Marche & discussion"},
  {e:"☕",t:"Café",s:"Simple & sympa"},
  {e:"🎲",t:"Surprise",s:"Je gère tout"}
];
const whatNext=document.getElementById('whatNext');
const actC=document.getElementById('actChoices');
acts.forEach(it=>{
  const b=document.createElement('button');
  b.className='choice';
  b.innerHTML=`<span class="emoji">${it.e}</span>${it.t}<small>${it.s}</small>`;
  b.onclick=()=>{
    [...actC.children].forEach(c=>c.classList.remove('selected'));
    b.classList.add('selected'); pick.act=it.t; whatNext.disabled=false;
  };
  actC.appendChild(b);
});
whatNext.onclick=()=>{ buildRecap(); burstHearts(40); show('screen-done'); };

/* ---- Écran 5 : récap + mot doux + message WhatsApp ---- */
function frDate(iso){
  const d=new Date(iso+'T00:00:00');
  return d.toLocaleDateString('fr-FR',{weekday:'long', day:'numeric', month:'long'});
}
function buildRecap(){
  const dTxt=frDate(pick.date), tTxt=pick.time.replace(':','h');

  document.getElementById('recapBox').innerHTML=`
    <div class="recap-line"><span class="ico">📆</span><div><b>Quand</b><span>${dTxt} à ${tTxt}</span></div></div>
    <div class="recap-line"><span class="ico">💫</span><div><b>Activité</b><span>${pick.act}</span></div></div>`;

  // Le petit mot doux (tu peux réécrire ce texte comme tu veux) :
  document.getElementById('loveNote').innerHTML=
    `Alors c'est noté 🌹<br>Je passe te chercher ${dTxt} à ${tTxt}…<br>et je viens les bras chargés de fleurs 💐<br>Habille-toi bien, je m'occupe du reste. ✨`;

  // Le message pré-rempli qu'elle t'envoie :
  const who=CONFIG.herName.trim()?CONFIG.herName.trim()+' — ':'';
  const msg=`Coucou ${CONFIG.myName} ! C'est OUI 💖 ${who}Je suis dispo le ${dTxt} à ${tTxt} et j'adorerais un ${pick.act.toLowerCase()}. Viens me chercher avec mes fleurs 🌹😄`;
  document.getElementById('waBtn').href=`https://wa.me/${CONFIG.myPhone}?text=${encodeURIComponent(msg)}`;

  const copyBtn=document.getElementById('copyBtn');
  copyBtn.onclick=async()=>{
    try{ await navigator.clipboard.writeText(msg); copyBtn.textContent='Message copié ✓'; copyBtn.classList.add('done'); }
    catch(_){ copyBtn.textContent='Copie indisponible'; }
  };
}

/* ---- Pluie de cœurs ---- */
function burstHearts(n){
  const layer=document.getElementById('heartsFall');
  const set=['💖','💕','💗','❤️','🌹','✨'];
  for(let i=0;i<n;i++){
    const h=document.createElement('div');
    h.className='fh'; h.textContent=set[Math.floor(Math.random()*set.length)];
    h.style.left=Math.random()*100+'%'; h.style.fontSize=(16+Math.random()*20)+'px';
    h.style.animationDuration=(2.5+Math.random()*2.5)+'s'; h.style.animationDelay=(Math.random()*.6)+'s';
    layer.appendChild(h); setTimeout(()=>h.remove(),5500);
  }
}