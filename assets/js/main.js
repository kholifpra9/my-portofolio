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
  // Gunakan TreeWalker agar hanya text node yang dipecah,
  // bukan karakter di dalam tag HTML (mencegah tag rusak)
  const walker = document.createTreeWalker(heroName, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);

  textNodes.forEach(textNode => {
    const frag = document.createDocumentFragment();
    [...textNode.textContent].forEach(char => {
      if (/[A-Za-z]/.test(char)) {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = char;
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(char));
      }
    });
    textNode.parentNode.replaceChild(frag, textNode);
  });

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

// ─── SKILLS PHYSICS BALLS (Matter.js) ───
const skillsCanvas = document.getElementById('skillsCanvas');
if (skillsCanvas && typeof Matter !== 'undefined') {
  const { Engine, Render, Runner, Bodies, Body, Events, Mouse, MouseConstraint, World, Vector } = Matter;

  const wrap = skillsCanvas.parentElement;
  const W = wrap.offsetWidth;
  const H = wrap.offsetHeight;
  skillsCanvas.width = W;
  skillsCanvas.height = H;

  const SKILLS = [
    { label: 'PHP',        color: '#7b7fb5', emoji: '🐘', img: 'assets/images/icons/php.png' },
    { label: 'TypeScript', color: '#3178c6', emoji: '📘', img: 'assets/images/icons/ts.png' },
    { label: 'JavaScript', color: '#f0db4f', emoji: '🟨', img: 'assets/images/icons/js.png' },
    { label: 'Dart',       color: '#00b4ab', emoji: '🎯', img: 'assets/images/icons/dart.png' },
    { label: 'Laravel',    color: '#ff2d20', emoji: '🔥', img: 'assets/images/icons/Laravel.svg.png' },
    { label: 'Node.js',    color: '#68a063', emoji: '🟢', img: 'assets/images/icons/nodejs.png' },
    { label: 'Bun.js',     color: '#fbf0df', emoji: '🧡', img: 'assets/images/icons/bunjs.png' },
    { label: 'React',      color: '#61dafb', emoji: '⚛️', img: 'assets/images/icons/react.png' },
    { label: 'Flutter',    color: '#54c5f8', emoji: '💙', img: 'assets/images/icons/flutter.png' },
    { label: 'MySQL',      color: '#00758f', emoji: '🗄️', img: 'assets/images/icons/mysql.png' },
    { label: 'Tailwind',   color: '#38bdf8', emoji: '🌊', img: 'assets/images/icons/tailwind.png' },
    { label: 'Git',        color: '#f05032', emoji: '🔀', img: 'assets/images/icons/git.png' },
    { label: 'Figma',      color: '#a259ff', emoji: '🎨', img: 'assets/images/icons/figma.png' },
    { label: 'Groq AI',    color: '#00ff88', emoji: '🤖', img: 'assets/images/icons/groqai.webp' },
    { label: 'Midtrans',   color: '#003d79', emoji: '💳', img: 'assets/images/icons/Midtrans.png' },
  ];

  const imgCache = {};
  let loaded = 0;
  SKILLS.forEach(s => {
    const image = new Image();
    image.src = s.img;
    image.onload = () => { imgCache[s.label] = image; };
    image.onerror = () => { imgCache[s.label] = null; }; // fallback ke emoji
  });

  const engine = Engine.create({ gravity: { x: 0, y: 0 } }); // zero gravity = space
  const world = engine.world;

  const R = Math.min(W, H) * 0.072;
  const WALL = 60;

  // Invisible boundary walls (thick so balls never escape)
  const walls = [
    Bodies.rectangle(W/2, -WALL/2, W + WALL*2, WALL, { isStatic: true }),
    Bodies.rectangle(W/2, H+WALL/2, W + WALL*2, WALL, { isStatic: true }),
    Bodies.rectangle(-WALL/2, H/2, WALL, H + WALL*2, { isStatic: true }),
    Bodies.rectangle(W+WALL/2, H/2, WALL, H + WALL*2, { isStatic: true }),
  ];
  World.add(world, walls);

  // Create balls
  const balls = SKILLS.map((s, i) => {
    const cols = Math.ceil(Math.sqrt(SKILLS.length));
    const col = i % cols, row = Math.floor(i / cols);
    const x = R * 2 + col * ((W - R*4) / (cols - 1));
    const y = R * 2 + row * ((H - R*4) / Math.ceil(SKILLS.length / cols));
    const ball = Bodies.circle(x, y, R, {
      restitution: 0.92,   // bouncy but not gaining energy
      friction: 0,
      frictionAir: 0.008,  // tiny air drag = space feel
      frictionStatic: 0,
      label: s.label,
    });
    // small random initial velocity
    Body.setVelocity(ball, {
      x: (Math.random() - 0.5) * 1.2,
      y: (Math.random() - 0.5) * 1.2,
    });
    ball.meta = s;
    return ball;
  });
  World.add(world, balls);

  // Mouse constraint for drag
  const mouse = Mouse.create(skillsCanvas);
  mouse.pixelRatio = window.devicePixelRatio || 1;
  const mc = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.08, damping: 0.1, render: { visible: false } }
  });
  World.add(world, mc);

  // Click smash — push nearby balls away from click point
  skillsCanvas.addEventListener('click', e => {
    if (mc.body) return; // was dragging
    const rect = skillsCanvas.getBoundingClientRect();
    const cx = (e.clientX - rect.left) * (W / rect.width);
    const cy = (e.clientY - rect.top) * (H / rect.height);
    balls.forEach(b => {
      const dx = b.position.x - cx;
      const dy = b.position.y - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < R * 4 && dist > 0) {
        const force = (R * 4 - dist) / (R * 4) * 0.018;
        Body.applyForce(b, b.position, { x: (dx/dist)*force, y: (dy/dist)*force });
      }
    });
  });

  // Custom canvas renderer
  const sc = skillsCanvas.getContext('2d');

  function drawScene() {
    sc.clearRect(0, 0, W, H);
    balls.forEach(b => {
      const { x, y } = b.position;
      const s = b.meta;

      // Glow ring
      const grd = sc.createRadialGradient(x - R*0.3, y - R*0.3, R*0.05, x, y, R);
      grd.addColorStop(0, s.color + 'dd');
      grd.addColorStop(0.6, s.color + '55');
      grd.addColorStop(1, s.color + '11');
      sc.beginPath();
      sc.arc(x, y, R, 0, Math.PI*2);
      sc.fillStyle = grd;
      sc.fill();

      // Border
      sc.beginPath();
      sc.arc(x, y, R, 0, Math.PI*2);
      sc.strokeStyle = s.color + 'bb';
      sc.lineWidth = 1.5;
      sc.stroke();

      // Emoji
      const icon = imgCache[s.label];
      if (icon) {
        const size = R * 1.1;
        sc.drawImage(icon, x - size/2, y - size/2 - R*0.1, size, size);
      } else {
        sc.font = `${R * 0.65}px serif`;
        sc.textAlign = 'center';
        sc.textBaseline = 'middle';
        sc.fillStyle = '#fff';
        sc.fillText(s.emoji, x, y - R * 0.15);
      }

      // Label
      sc.font = `bold ${R * 0.27}px 'Space Mono', monospace`;
      sc.fillStyle = '#ffffffcc';
      sc.fillText(s.label, x, y + R * 0.58);
    });
  }

  const runner = Runner.create();
  Runner.run(runner, engine);
  setInterval(() => {
    balls.forEach(b => {
      const v = b.speed;
      if (v < 0.3) {
        Body.applyForce(b, b.position, {
          x: (Math.random() - 0.5) * 0.0022,
          y: (Math.random() - 0.5) * 0.0022,
        });
      }
    });
  }, 200);
  // Scroll gravity — bola ikut arah scroll
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const delta = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;

    const forceY = Math.max(Math.min(delta * 0.00012, 0.003), -0.003);

    balls.forEach(b => {
      Body.applyForce(b, b.position, {
        x: (Math.random() - 0.5) * Math.abs(forceY) * 0.3,
        y: forceY,
      });
    });
  });
  Events.on(engine, 'afterUpdate', drawScene);
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
// Smooth scroll via data-target (URL tetap clean)
document.querySelectorAll('[data-target]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(a.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Active nav on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.dataset.target === current ? 'var(--accent)' : '';
  });
});