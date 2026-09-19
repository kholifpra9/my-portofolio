document.addEventListener('DOMContentLoaded', async () => {
  // 0. Smooth Scroll Engine (Lenis)
  const lenis = new Lenis({
    duration: 1.2, // Durasi scroll (makin besar makin mulus & tenang)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth cubic easing
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Hubungkan Lenis dengan pemicu Scroll Observer yang sudah ada
  lenis.on('scroll', () => {
    // Memastikan active nav indicator & scroll progress tetap akurat
    window.dispatchEvent(new Event('scroll'));
  });
  
  // 1. Dynamic Section HTML Loader
  const includes = document.querySelectorAll('[data-include]');
  await Promise.all(
    Array.from(includes).map(async (el) => {
      const file = el.getAttribute('data-include');
      try {
        const response = await fetch(file);
        if (response.ok) {
          el.innerHTML = await response.text();
        } else {
          console.error(`Error loading ${file}: ${response.statusText}`);
        }
      } catch (err) {
        console.error(`Fetch error for ${file}:`, err);
      }
    })
  );

  // ----------------------------------------------------------------------
  // DILAKUKAN SETELAH SELURUH HTML TERLOAD
  // ----------------------------------------------------------------------

  // 2. Mobile Drawer Elements & Handlers (Smooth Slide-Down)
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    if (drawer) {
      drawer.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
      drawer.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    if (drawer) {
      drawer.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
      drawer.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  };

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Scroll Reveal Animation Observer
  const initScrollReveal = () => {
    const sectionsToAnimate = document.querySelectorAll('main section');
    
    sectionsToAnimate.forEach((section) => {
      section.classList.add('reveal-section');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Sekali muncul, biarkan tetap terpampang tanpa mengulang animasi
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    sectionsToAnimate.forEach((section) => observer.observe(section));
  };

  initScrollReveal();

  // 4. Active Navigation Link Indicator & Smooth Nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const updateActiveLinks = () => {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) {
        current = s.id;
      }
    });

    // Update Desktop Nav
    navLinks.forEach((a) => {
      const isActive = a.getAttribute('href') === '#' + current;
      a.classList.toggle('text-primary', isActive);
      a.classList.toggle('after:w-full', isActive);
      a.classList.toggle('text-on-surface-variant', !isActive);
    });

    // Update Mobile Drawer
    drawerLinks.forEach((a) => {
      const isActive = a.getAttribute('href') === '#' + current;
      a.classList.toggle('text-primary', isActive);
      a.classList.toggle('bg-surface-container-high', isActive);
      a.classList.toggle('text-on-surface', !isActive);

      const arrow = a.querySelector('.drawer-arrow');
      if (arrow) {
        arrow.classList.toggle('opacity-100', isActive);
        arrow.classList.toggle('translate-x-0', isActive);
        arrow.classList.toggle('opacity-0', !isActive);
        arrow.classList.toggle('-translate-x-2', !isActive);
      }
    });
  };

  window.addEventListener('scroll', updateActiveLinks, { passive: true });
  updateActiveLinks();

  // 5. Project Carousel & Slider (Fix Responsive Dots Mismatch)
  (function initProjectSlider() {
    const slider = document.getElementById('project-slider');
    const prevBtn = document.getElementById('proj-prev');
    const nextBtn = document.getElementById('proj-next');
    const dots = document.querySelectorAll('.proj-dot');

    if (!slider) return;

    // Menghitung lebar 1 kartu + gap antar kartu
    function getStepWidth() {
      if (!slider.firstElementChild) return 420;
      const card = slider.firstElementChild;
      const style = window.getComputedStyle(slider);
      const gap = parseFloat(style.gap) || 24;
      return card.offsetWidth + gap;
    }

    function updateDots() {
      const stepWidth = getStepWidth();
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      
      // Jika sudah hampir mentok di paling kanan, aktifkan dot terakhir
      if (maxScroll > 0 && Math.ceil(slider.scrollLeft) >= maxScroll - 10) {
        dots.forEach((dot, i) => {
          const isLast = i === dots.length - 1;
          dot.className = isLast
            ? 'proj-dot h-2 w-8 bg-primary rounded-full transition-all duration-300 cursor-pointer'
            : 'proj-dot h-2 w-2 bg-outline-variant hover:bg-primary/50 rounded-full transition-all duration-300 cursor-pointer';
        });
        return;
      }

      // Hitung indeks aktif berdasarkan posisi scroll
      const activeIndex = Math.min(Math.round(slider.scrollLeft / stepWidth), dots.length - 1);

      dots.forEach((dot, i) => {
        dot.className = i === activeIndex
          ? 'proj-dot h-2 w-8 bg-primary rounded-full transition-all duration-300 cursor-pointer'
          : 'proj-dot h-2 w-2 bg-outline-variant hover:bg-primary/50 rounded-full transition-all duration-300 cursor-pointer';
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -getStepWidth(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: getStepWidth(), behavior: 'smooth' });
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        slider.scrollTo({ left: i * getStepWidth(), behavior: 'smooth' });
      });
    });

    slider.addEventListener('scroll', () => requestAnimationFrame(updateDots), { passive: true });
    window.addEventListener('resize', updateDots, { passive: true });
  })();

  // Custom Smooth Cursor Follower (Fixed Jump Bug)
  (function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (!dot || !ring || window.innerWidth < 768) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Titik kecil langsung presisi ikuti posisi mouse tanpa offset lag
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    // Pergerakan meluncur halus untuk outer ring
    function render() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      requestAnimationFrame(render);
    }
    render();

    // Event Delegation agar tetap berfungsi walau elemen HTML di-fetch secara dinamis
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, input, [role="button"]')) {
        document.body.classList.add('cursor-hover-active');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, input, [role="button"]')) {
        document.body.classList.remove('cursor-hover-active');
      }
    });
  })();
});