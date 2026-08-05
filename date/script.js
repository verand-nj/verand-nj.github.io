/* ============================================================
   STYLE — couleurs, mise en page, animations
   (Pour changer les couleurs : modifie les variables ci-dessous)
   ============================================================ */
:root{
  --plum-1:#2b1524; --plum-2:#4a1f38; --plum-3:#6d2a49;
  --blush:#ff8fa3; --blush-soft:#ffb3c1; --gold:#e8c37e;
  --paper:#fdf6ec; --ink:#3a2a2e; --ink-soft:#7a5f66;
}

*{box-sizing:border-box; margin:0; padding:0;}
html,body{height:100%;}
body{
  font-family:'Nunito',system-ui,sans-serif;
  background:
    radial-gradient(1200px 700px at 50% -10%, var(--plum-3) 0%, transparent 55%),
    radial-gradient(900px 600px at 85% 110%, #7a2f52 0%, transparent 50%),
    linear-gradient(160deg, var(--plum-2) 0%, var(--plum-1) 100%);
  color:var(--paper); min-height:100dvh;
  display:flex; align-items:center; justify-content:center;
  overflow:hidden; position:relative; padding:20px;
}

/* Poussière d'étoiles */
.dust{position:fixed; inset:0; pointer-events:none; z-index:0;}
.dust span{position:absolute; width:3px; height:3px; border-radius:50%;
  background:var(--gold); opacity:.5; animation:twinkle 4s ease-in-out infinite;}
@keyframes twinkle{0%,100%{opacity:.15; transform:scale(.6);}50%{opacity:.7; transform:scale(1);}}

/* Zone centrale + gestion des écrans */
.stage{position:relative; z-index:2; width:100%; max-width:520px; text-align:center;}
.screen{display:none; animation:fadeUp .6s ease both;}
.screen.active{display:block;}
@keyframes fadeUp{from{opacity:0; transform:translateY(18px);}to{opacity:1; transform:translateY(0);}}

/* ---------- Enveloppe ---------- */
.env-wrap{position:relative; width:min(340px,82vw); margin:0 auto; cursor:pointer;
  animation:float 5s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-14px) rotate(1deg);}}
.env-wrap:focus-visible{outline:3px solid var(--gold); outline-offset:14px; border-radius:16px;}
.envelope{position:relative; width:100%; aspect-ratio:3/2; filter:drop-shadow(0 22px 40px rgba(0,0,0,.45));}
.env-body{position:absolute; inset:0; border-radius:10px;
  background:linear-gradient(155deg,#ffd9df 0%, #ffc2cd 100%);}
.env-body::before{content:""; position:absolute; inset:0; border-radius:10px;
  background:
    linear-gradient(45deg, rgba(0,0,0,.06) 0 50%, transparent 50%) 0 0/50% 100% no-repeat,
    linear-gradient(-45deg, rgba(0,0,0,.06) 0 50%, transparent 50%) 100% 0/50% 100% no-repeat;}
.env-flap{position:absolute; top:0; left:0; width:100%; height:58%;
  background:linear-gradient(155deg,#ffcad3,#ff9fb0);
  clip-path:polygon(0 0, 100% 0, 50% 96%);
  transform-origin:top center; transition:transform .7s cubic-bezier(.7,-0.2,.3,1.4);
  z-index:4; border-radius:10px 10px 0 0;}
.seal{position:absolute; top:38%; left:50%; transform:translate(-50%,-50%);
  width:64px; height:64px; border-radius:50%; z-index:5;
  background:radial-gradient(circle at 35% 30%, #ff6f86, #b52a4a);
  box-shadow:0 6px 14px rgba(0,0,0,.35), inset 0 2px 6px rgba(255,255,255,.35);
  display:flex; align-items:center; justify-content:center; font-size:30px; transition:opacity .3s;}
.seal::after{content:"♥"; color:#fff2f4;}
.env-tip{margin-top:26px; font-family:'Caveat',cursive; font-size:26px; color:var(--gold);}
.env-tip .pulse{display:inline-block; animation:tap 1.6s ease-in-out infinite;}
@keyframes tap{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
.env-wrap.opened{animation:none; cursor:default; transform:scale(.6); opacity:0;
  transition:transform .6s ease .3s, opacity .5s ease .35s;}
.env-wrap.opened .env-flap{transform:rotateX(180deg);}
.env-wrap.opened .seal{opacity:0;}

/* ---------- Lettre (carte blanche) ---------- */
.letter{background:var(--paper); color:var(--ink); border-radius:18px;
  padding:34px 26px 30px; box-shadow:0 26px 60px rgba(0,0,0,.5); position:relative;}
.letter::before{content:""; position:absolute; inset:9px; border:1.5px solid rgba(181,42,74,.28);
  border-radius:12px; pointer-events:none;}
.letter .eyebrow{font-family:'Caveat',cursive; color:#b52a4a; font-size:24px;}
.letter h1{font-family:'Cormorant Garamond',serif; font-weight:600; line-height:1.08;
  font-size:clamp(30px,7vw,42px); margin:6px 0 4px; color:var(--plum-1);}
.letter p.sub{color:var(--ink-soft); font-size:15px; margin-top:8px;}

/* ---------- Petit encadré "blague" ---------- */
.joke{background:#fff3f5; border:1.5px dashed rgba(181,42,74,.35); border-radius:14px;
  padding:12px 16px; margin:12px 0 8px;}
.joke p{font-family:'Caveat',cursive; font-weight:700; font-size:23px; line-height:1.25; color:#8a2a44;}
.joke-wink{display:block; margin-top:6px; font-size:13px; font-weight:600;
  font-family:'Nunito',sans-serif; color:var(--ink-soft);}

/* ---------- Boutons Oui / Non ---------- */
.qa-arena{position:relative; height:180px; margin-top:22px;}
.btn{font-family:'Nunito',sans-serif; font-weight:700; border:none; cursor:pointer;
  border-radius:999px; padding:15px 34px; font-size:18px; transition:transform .12s ease, box-shadow .2s;}
.btn:active{transform:scale(.96);}
.btn-yes{background:linear-gradient(135deg,#ff6f86,#b52a4a); color:#fff;
  box-shadow:0 12px 24px rgba(181,42,74,.4); position:absolute; left:50%; top:26px; transform:translateX(-50%);}
.btn-yes:hover{box-shadow:0 16px 30px rgba(181,42,74,.55);}
.btn-no{background:#efe3d8; color:var(--ink-soft); position:absolute; left:50%; top:96px; transform:translateX(-50%);}

/* ---------- Choix d'activité ---------- */
.choices{display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:22px;}
.choice{background:var(--paper); color:var(--ink); border:2px solid transparent;
  border-radius:14px; padding:16px 12px; cursor:pointer; text-align:center;
  font-weight:700; font-size:15px; transition:transform .12s, border-color .2s, background .2s;
  box-shadow:0 8px 18px rgba(0,0,0,.18);
  display:flex; flex-direction:column; align-items:center; justify-content:flex-start; min-height:122px;}
.choice .emoji{font-size:30px; margin-bottom:6px; line-height:1;}
.choice .c-title{line-height:1.15;}
.choice small{display:block; font-weight:400; color:var(--ink-soft); font-size:12px; margin-top:5px; line-height:1.25;}
.choice:hover{transform:translateY(-3px);}
.choice.selected{border-color:#b52a4a; background:#fff0f2;}
.choice:focus-visible{outline:3px solid var(--gold); outline-offset:3px;}

/* ---------- Champs date & heure ---------- */
.field{text-align:left; margin-top:18px;}
.field label{display:block; font-family:'Caveat',cursive; font-size:22px; color:#b52a4a; margin-bottom:6px;}
.field input{
  width:100%; font-family:'Nunito',sans-serif; font-size:17px; font-weight:600; color:var(--ink);
  background:#fff; border:2px solid rgba(181,42,74,.25); border-radius:12px; padding:14px 16px;
  box-shadow:0 6px 14px rgba(0,0,0,.10); appearance:none;
}
.field input:focus{outline:none; border-color:#b52a4a; box-shadow:0 0 0 3px rgba(181,42,74,.18);}

/* ---------- Bouton "continuer" ---------- */
.next-btn{margin-top:22px; width:100%; background:linear-gradient(135deg,#ff6f86,#b52a4a);
  color:#fff; font-weight:700; font-size:17px; border:none; border-radius:999px; padding:15px; cursor:pointer;
  box-shadow:0 12px 24px rgba(181,42,74,.4); transition:opacity .2s, transform .12s;}
.next-btn:disabled{opacity:.4; cursor:not-allowed;}
.next-btn:not(:disabled):active{transform:scale(.98);}

/* ---------- Petits points de progression ---------- */
.progress{display:flex; gap:7px; justify-content:center; margin-bottom:16px;}
.progress i{width:9px; height:9px; border-radius:50%; background:rgba(253,246,236,.28); transition:.3s;}
.progress i.on{background:var(--gold); transform:scale(1.25);}

/* ---------- Récap + mot doux ---------- */
.recap-line{display:flex; align-items:center; gap:12px; text-align:left;
  padding:12px 14px; border-radius:12px; background:#fff0f2; margin-top:10px;}
.recap-line .ico{font-size:24px;}
.recap-line b{display:block; font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:#b52a4a;}
.recap-line span{color:var(--ink); font-weight:600;}
.lovenote{font-family:'Caveat',cursive; font-size:23px; line-height:1.35; color:var(--plum-1);
  background:#fff7f0; border:1.5px dashed rgba(181,42,74,.4); border-radius:14px;
  padding:18px 16px; margin-top:18px;}
.send-status{margin-top:16px; font-weight:700; color:var(--plum-1); min-height:20px;}
.send-hint{margin-top:14px; font-size:13px; color:var(--ink-soft);}
.send-row{display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:10px;}
.send-btn{display:inline-flex; align-items:center; gap:8px; text-decoration:none;
  color:#fff; font-weight:700; border-radius:999px; padding:14px 24px;}
.send-btn.wa{background:#25D366; box-shadow:0 12px 24px rgba(37,211,102,.35);}   /* WhatsApp */
.send-btn.sms{background:#3a7afe; box-shadow:0 12px 24px rgba(58,122,254,.35);}  /* SMS */
.copy-btn{margin-top:12px; background:none; border:1.5px solid rgba(181,42,74,.4);
  color:#b52a4a; border-radius:999px; padding:11px 22px; font-weight:700; cursor:pointer; font-size:14px;}
.copy-btn.done{background:#b52a4a; color:#fff; border-color:#b52a4a;}

/* ---------- Pluie de cœurs ---------- */
.hearts-fall{position:fixed; inset:0; pointer-events:none; z-index:5; overflow:hidden;}
.fh{position:absolute; top:-40px; font-size:22px; animation:fall linear forwards;}
@keyframes fall{to{transform:translateY(110vh) rotate(360deg); opacity:0;}}

/* ---------- Réglages écrans / accessibilité ---------- */
@media (max-width:380px){ .letter{padding:28px 18px 24px;} }
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.001s !important; animation-iteration-count:1 !important;}
  .env-wrap{animation:none;}
}
