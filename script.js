/* ============================
   CURSEUR PERSONNALISÉ
   ============================ */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Anneau avec lag (effet smooth)
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Effet hover sur les éléments cliquables
document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    ring.style.transform   = 'translate(-50%, -50%) scale(1.5)';
    ring.style.opacity     = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.transform   = 'translate(-50%, -50%) scale(1)';
    ring.style.opacity     = '0.5';
  });
});

/* ============================
   NAVBAR AU SCROLL
   ============================ */
const navbar  = document.getElementById('navbar');
const heroNum = document.getElementById('heroNum');

window.addEventListener('scroll', () => {
  // Navbar devient opaque
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Fade du grand chiffre en fond du hero
  if (heroNum) {
    const opacity = Math.max(0, 1 - window.scrollY / 400);
    heroNum.style.opacity = opacity;
  }
});

/* ============================
   ANIMATION D'ENTRÉE DU HERO
   ============================ */
window.addEventListener('DOMContentLoaded', () => {
  const heroElements = ['heroTag', 'heroTitle', 'heroSub', 'heroBtns'];
  heroElements.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      // Forcer le reflow pour déclencher la transition CSS
      el.style.opacity   = '1';
      el.style.transform = 'none';
    }
  });
});

/* ============================
   REVEAL AU SCROLL (IntersectionObserver)
   ============================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

/* ============================
   COMPTEURS ANIMÉS (stats about)
   ============================ */
function animateCounter(el, target, duration) {
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    // Easing cubic out
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach((el) => {
        const target   = parseInt(el.dataset.target, 10);
        const duration = target > 100 ? 1800 : 900;
        animateCounter(el, target, duration);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.about-stats').forEach((el) => {
  counterObserver.observe(el);
});

/* ============================
   BARRES DE COMPÉTENCES ANIMÉES
   ============================ */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
        bar.style.width = bar.dataset.w + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-container').forEach((el) => {
  barObserver.observe(el);
});

/* ============================
   SMOOTH SCROLL SUR LES LIENS NAV
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
