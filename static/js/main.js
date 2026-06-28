/* =====================================================
   ARULMIGU PUNGAMARATHU AYYAN - Main JavaScript
   ===================================================== */

'use strict';

// ---- LANGUAGE SYSTEM ----
let currentLang = 'ta';

function switchLang(lang) {
  currentLang = lang;
  document.getElementById('html-root').lang = lang === 'ta' ? 'ta' : 'en';

  // Toggle buttons
  document.getElementById('btn-ta').classList.toggle('active', lang === 'ta');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');

  // Update all elements with data-ta / data-en
  document.querySelectorAll('[data-ta][data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null && text !== "") el.innerHTML = text;
  });

  // Save preference
  try { localStorage.setItem('siteLang', lang); } catch(e) {}
}

// ---- COUNTDOWN TIMER ----
function updateCountdown() {
  const festivalDate = new Date('2026-06-30T05:00:00+05:30');
  const now = new Date();
  const diff = festivalDate - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ---- MOBILE NAV TOGGLE ----
function toggleNav() {
  const links = document.getElementById('nav-links');
  const toggleBtn = document.querySelector('.nav-toggle');
  const isOpen = links.classList.toggle('open');
  if (toggleBtn) {
    toggleBtn.innerHTML = isOpen ? '&#10005;' : '&#9776;';
  }
}

function closeMobileNav() {
  const links = document.getElementById('nav-links');
  const toggleBtn = document.querySelector('.nav-toggle');
  links.classList.remove('open');
  if (toggleBtn) toggleBtn.innerHTML = '&#9776;';
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    closeMobileNav();
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  const links = document.getElementById('nav-links');
  const toggle = document.querySelector('.nav-toggle');
  if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) {
    closeMobileNav();
  }
});

// ---- SCROLL TO TOP ----
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- SMOOTH ANCHOR SCROLLING ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = 96;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- SCROLL FADE-IN ANIMATIONS ----
function initScrollAnimations() {
  const els = document.querySelectorAll(
    '.story-card, .bus-card, .date-card, .qr-card, .address-card, .contact-card, .schedule-table-wrap, .guideline-card, .deity-banner-item'
  );
  els.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

// ---- PARTICLES ----
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const isGold = Math.random() > 0.5;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 20 + 15;

    p.style.cssText = `
      position: absolute;
      left: ${left}%;
      bottom: -20px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${isGold ? 'rgba(201,168,76,' : 'rgba(192,57,43,'}${0.4 + Math.random() * 0.6});
      animation: particleRise ${duration}s ${delay}s linear infinite;
      pointer-events: none;
      box-shadow: ${isGold ? '0 0 8px rgba(201,168,76,0.8)' : '0 0 8px rgba(192,57,43,0.8)'};
    `;
    container.appendChild(p);
  }

  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes particleRise {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 0.5; }
        100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 60}px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ---- FIREWORKS / CRACKER BURSTS ----
function initFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const fireworks = [];
  const sparks = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Spark {
    constructor(x, y, color, angle, speed) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = 0.015 + Math.random() * 0.01;
      this.radius = 1 + Math.random() * 2.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05;
      this.vx *= 0.98;
      this.alpha -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(this.alpha, 0);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  class Firework {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 10;
      this.targetY = Math.random() * canvas.height * 0.35 + canvas.height * 0.15;
      this.speed = 8 + Math.random() * 5;
      this.color = ['#C9A84C', '#F0D060', '#C0392B', '#FF4444', '#FFFFFF'][Math.floor(Math.random() * 5)];
      this.trail = [];
      this.exploded = false;
    }
    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 12) this.trail.shift();
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.explode();
      }
    }
    drawTrail() {
      for (let i = 0; i < this.trail.length; i++) {
        const point = this.trail[i];
        const alpha = (i + 1) / this.trail.length * 0.7;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fillRect(point.x, point.y, 2, 2);
        ctx.restore();
      }
    }
    explode() {
      const count = 50 + Math.floor(Math.random() * 50);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 5;
        sparks.push(new Spark(this.x, this.y, this.color, angle, speed));
      }
      this.exploded = true;
    }
  }

  function launchFirework() {
    fireworks.push(new Firework());
  }

  function scheduleFirework() {
    const delay = 900 + Math.random() * 1800;
    setTimeout(() => {
      launchFirework();
      scheduleFirework();
    }, delay);
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = fireworks.length - 1; i >= 0; i--) {
      const fw = fireworks[i];
      if (!fw.exploded) {
        fw.update();
        fw.drawTrail();
      } else {
        fireworks.splice(i, 1);
      }
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const spark = sparks[i];
      spark.update();
      if (spark.alpha <= 0) {
        sparks.splice(i, 1);
      } else {
        spark.draw();
      }
    }

    requestAnimationFrame(render);
  }

  launchFirework();
  scheduleFirework();
  render();
}

// ---- ACTIVE NAV LINK ON SCROLL ----
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active-link',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

const navStyle = document.createElement('style');
navStyle.textContent = '.nav-links a.active-link { color: var(--gold-light) !important; background: rgba(201,168,76,0.15) !important; }';
document.head.appendChild(navStyle);

// ---- INIT ON LOAD ----
document.addEventListener('DOMContentLoaded', () => {
  try {
    const saved = localStorage.getItem('siteLang');
    if (saved && (saved === 'ta' || saved === 'en')) {
      switchLang(saved);
    }
  } catch(e) {}

  initScrollAnimations();
  initParticles();
  initFireDroplets();
  initFireworks();
  initActiveNav();
  initPhotoStack();

  document.querySelectorAll('.story-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
  });

  // Back to top button visibility on scroll
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
});

// ---- LIGHTBOX GALLERY ----
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (lightbox && img) {
    img.src = src;
    lightbox.classList.add('active');
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}

// ---- PHOTO STACK CAROUSEL ----
const GALLERY_IMAGES = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','14.jpg'];

function initPhotoStack() {
  const stack = document.getElementById('photoStack');
  const prevBtn = document.getElementById('stackPrev');
  const nextBtn = document.getElementById('stackNext');
  if (!stack || !prevBtn || !nextBtn) return;

  const basePath = window.GALLERY_PATH || '';
  const n = GALLERY_IMAGES.length;
  let index = 0;
  let animating = false;

  function render() {
    stack.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const idx = (index + i) % n;
      const card = document.createElement('div');
      card.className = 'stack-card';
      card.dataset.depth = String(i);

      const img = document.createElement('img');
      img.src = basePath + GALLERY_IMAGES[idx];
      img.alt = 'Temple photo ' + (idx + 1);
      img.loading = i === 0 ? 'eager' : 'lazy';

      card.appendChild(img);
      card.style.zIndex = String(30 - i);

      if (i === 0) {
        card.style.transform = 'translate(0,0) scale(1) rotate(0deg)';
        card.style.opacity = '1';
      } else if (i === 1) {
        // Shift right, so it peeks out on the right
        card.style.transform = 'translate(45px, 12px) scale(0.9) rotate(4deg)';
        card.style.opacity = '0.9';
      } else {
        // Shift left, so it peeks out on the left
        card.style.transform = 'translate(-45px, 22px) scale(0.8) rotate(-4deg)';
        card.style.opacity = '0.75';
      }
      stack.appendChild(card);
    }
    attachSwipe(stack.querySelector('.stack-card[data-depth="0"]'));
  }

  function goNext() {
    if (animating) return;
    index = (index + 1) % n;
    render();
  }
  function goPrev() {
    if (animating) return;
    index = (index - 1 + n) % n;
    render();
  }

  function flyAway(card, direction, after) {
    animating = true;
    card.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
    const dist = direction === 'left' ? -420 : 420;
    const rot = direction === 'left' ? -28 : 28;
    requestAnimationFrame(() => {
      card.style.transform = `translate(${dist}px, -30px) rotate(${rot}deg)`;
      card.style.opacity = '0';
    });
    setTimeout(() => {
      animating = false;
      after();
    }, 280);
  }

  function attachSwipe(card) {
    if (!card) return;
    let startX = 0, dx = 0, dragging = false, moved = false;

    function onStart(x) {
      dragging = true;
      startX = x;
      moved = false;
      card.style.transition = 'none';
    }
    function onMove(x) {
      if (!dragging) return;
      dx = x - startX;
      if (Math.abs(dx) > 3) moved = true;
      card.style.transform = `translate(${dx}px, 0) rotate(${dx / 18}deg)`;
    }
    function onEnd() {
      if (!dragging) return;
      dragging = false;
      card.style.transition = 'transform 0.25s ease';
      if (dx < -60) {
        flyAway(card, 'left', goNext);
      } else if (dx > 60) {
        flyAway(card, 'right', goPrev);
      } else {
        card.style.transform = 'translate(0,0) scale(1) rotate(0deg)';
      }
      dx = 0;
    }

    card.addEventListener('mousedown', (e) => { e.preventDefault(); onStart(e.clientX); });
    window.addEventListener('mousemove', (e) => onMove(e.clientX));
    window.addEventListener('mouseup', (e) => {
      onEnd();
      if (!moved && (e.target === card || card.contains(e.target))) {
        const img = card.querySelector('img');
        if (img) openLightbox(img.src);
      }
    });

    card.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX), { passive: true });
    card.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
    card.addEventListener('touchend', (e) => {
      onEnd();
      if (!moved) {
        const img = card.querySelector('img');
        if (img) openLightbox(img.src);
      }
    });
  }

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  render();
}

// ---- EXTRA RED FIRE DROPLETS ----
function initFireDroplets() {
  const container = document.getElementById('particles');
  if (!container) return;

  if (!document.getElementById('droplet-style')) {
    const style = document.createElement('style');
    style.id = 'droplet-style';
    style.textContent = `
      @keyframes fireDropletFall {
        0% { transform: translateY(-10px) translateX(0); opacity: 0; }
        8% { opacity: 1; }
        85% { opacity: 0.8; }
        100% { transform: translateY(110vh) translateX(var(--drift, 0px)); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  function spawnDroplet() {
    const d = document.createElement('div');
    const size = 2 + Math.random() * 3;
    const left = Math.random() * 100;
    const duration = 4 + Math.random() * 5;
    const drift = (Math.random() - 0.5) * 80;
    d.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: -10px;
      width: ${size}px;
      height: ${size * 1.6}px;
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      background: radial-gradient(circle at 30% 30%, #FFD27A, #C0392B 70%, #6B0000);
      box-shadow: 0 0 10px rgba(192,57,43,0.9), 0 0 4px rgba(255,150,60,0.8);
      --drift: ${drift}px;
      animation: fireDropletFall ${duration}s linear forwards;
      pointer-events: none;
    `;
    container.appendChild(d);
    setTimeout(() => d.remove(), duration * 1000 + 200);
  }

  setInterval(spawnDroplet, 350);
  for (let i = 0; i < 6; i++) {
    setTimeout(spawnDroplet, i * 150);
  }
}