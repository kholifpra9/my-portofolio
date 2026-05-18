// Hamburger menu
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
});

function animateRing() {
  rx += (mx - rx - 18) * 0.12;
  ry += (my - ry - 18) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .btn, .tag, .project-card, .stat, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    ring.style.transform = 'scale(1.5)';
    ring.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform = 'scale(1)';
    ring.style.opacity = '0.4';
  });
});

// ─── PARTICLE CANVAS ───
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.7 ? '0,229,255' : '0,255,136';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

// draw connecting lines between close particles
function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,255,136,${0.08 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ─── TYPING TEXT ───
const roles = ['Full-Stack Engineer', 'Backend Developer', 'AI-Integrated Systems', 'Mobile Developer', 'Frontend Developer'];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeLoop() {
  if (!typingEl) return;
  const current = roles[roleIdx];
  if (isDeleting) {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    setTimeout(typeLoop, 60);
  } else {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { isDeleting = true; setTimeout(typeLoop, 1800); return; }
    setTimeout(typeLoop, 90);
  }
}
setTimeout(typeLoop, 1200);

// ─── HERO LETTER SPLIT (hover per-letter) ───
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.innerHTML = heroName.innerHTML.replace(/([A-Za-z])/g, '<span class="letter">$1</span>');
  document.querySelectorAll('.letter').forEach(l => {
    l.addEventListener('mouseenter', () => {
      l.style.color = 'var(--accent)';
      l.style.transform = `translateY(-8px) rotate(${(Math.random()-0.5)*15}deg)`;
      l.style.textShadow = '0 0 20px var(--accent)';
      setTimeout(() => {
        l.style.color = '';
        l.style.transform = '';
        l.style.textShadow = '';
      }, 500);
    });
  });
}

// ─── MOUSE PARALLAX (hero elements) ───
const home = document.getElementById('home');
if (home) {
  home.addEventListener('mousemove', e => {
    const { left, top, width, height } = home.getBoundingClientRect();
    const px = (e.clientX - left) / width - 0.5;
    const py = (e.clientY - top) / height - 0.5;
    const heroNameEl = home.querySelector('.hero-name');
    const heroDesc = home.querySelector('.hero-desc');
    const terminal = home.querySelector('.terminal');
    if (heroNameEl) heroNameEl.style.transform = `translate(${px * 18}px, ${py * 10}px)`;
    if (heroDesc) heroDesc.style.transform = `translate(${px * 10}px, ${py * 6}px)`;
    if (terminal) terminal.style.transform = `translateY(-40%) translate(${px * -22}px, ${py * -14}px)`;
  });
  home.addEventListener('mouseleave', () => {
    const heroNameEl = home.querySelector('.hero-name');
    const heroDesc = home.querySelector('.hero-desc');
    const terminal = home.querySelector('.terminal');
    if (heroNameEl) heroNameEl.style.transform = '';
    if (heroDesc) heroDesc.style.transform = '';
    if (terminal) terminal.style.transform = 'translateY(-40%)';
  });
}

// ─── MAGNETIC BUTTONS ───
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ─── 3D TILT — project cards ───
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});

// ─── DRAGGABLE TERMINAL ───
const terminal = document.querySelector('.terminal');
if (terminal) {
  const bar = terminal.querySelector('.terminal-bar');
  let dragging = false, startX, startY, initLeft, initTop;

  bar.style.cursor = 'grab';
  bar.addEventListener('mousedown', e => {
    dragging = true;
    bar.style.cursor = 'grabbing';
    const rect = terminal.getBoundingClientRect();
    startX = e.clientX; startY = e.clientY;
    initLeft = rect.left; initTop = rect.top;
    terminal.style.position = 'fixed';
    terminal.style.right = 'auto';
    terminal.style.top = initTop + 'px';
    terminal.style.left = initLeft + 'px';
    terminal.style.transform = 'none';
    terminal.style.zIndex = 200;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    terminal.style.left = initLeft + dx + 'px';
    terminal.style.top = initTop + dy + 'px';
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    bar.style.cursor = 'grab';
  });
}

// ─── COUNTER ANIMATION (about stats) ───
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const isFloat = el.dataset.target.includes('.');
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = (isFloat ? current.toFixed(2) : Math.floor(current)) + suffix;
    if (current >= target) clearInterval(timer);
  }, 20);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => animateCount(el));
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stats').forEach(el => statObserver.observe(el));

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ─── ACTIVE NAV ON SCROLL ───
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : ''; });
});