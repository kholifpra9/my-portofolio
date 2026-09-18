document.addEventListener('DOMContentLoaded', async () => {
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

  // 2. Mobile Drawer Elements & Handlers
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      drawer.classList.toggle('hidden');
      drawer.classList.toggle('flex');
      document.body.style.overflow = drawer.classList.contains('flex') ? 'hidden' : '';
    });
  }

  if (drawerClose && drawer) {
    drawerClose.addEventListener('click', () => {
      drawer.classList.add('hidden');
      drawer.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer) {
        drawer.classList.add('hidden');
        drawer.classList.remove('flex');
      }
      document.body.style.overflow = '';
    });
  });

  // 3. Scroll Progress Bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

  // 4. Active Navigation Link Indicator on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) {
        current = s.id;
      }
    });

    navLinks.forEach(a => {
      const isActive = a.getAttribute('href') === '#' + current;
      a.classList.toggle('text-primary-container', isActive);
      a.classList.toggle('border-b-2', isActive);
      a.classList.toggle('border-primary-container', isActive);
      a.classList.toggle('pb-1', isActive);
      a.classList.toggle('text-on-surface-variant', !isActive);
    });
  });

  // 5. Project Carousel & Slider
  (function initProjectSlider() {
    const slider = document.getElementById('project-slider');
    const prevBtn = document.getElementById('proj-prev');
    const nextBtn = document.getElementById('proj-next');
    const dots = document.querySelectorAll('.proj-dot');

    if (!slider) return;

    function updateDots() {
      const cardWidth = slider.firstElementChild ? slider.firstElementChild.offsetWidth + 24 : 444;
      const activeIndex = Math.min(Math.round(slider.scrollLeft / cardWidth), dots.length - 1);

      dots.forEach((dot, i) => {
        dot.className = i === activeIndex
          ? 'proj-dot h-2 w-8 bg-primary rounded-full transition-all duration-300'
          : 'proj-dot h-2 w-2 bg-outline-variant rounded-full transition-all duration-300';
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cw = slider.firstElementChild ? slider.firstElementChild.offsetWidth + 24 : 444;
        slider.scrollBy({ left: -cw, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cw = slider.firstElementChild ? slider.firstElementChild.offsetWidth + 24 : 444;
        slider.scrollBy({ left: cw, behavior: 'smooth' });
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const cw = slider.firstElementChild ? slider.firstElementChild.offsetWidth + 24 : 444;
        slider.scrollTo({ left: i * cw, behavior: 'smooth' });
      });
    });

    slider.addEventListener('scroll', () => requestAnimationFrame(updateDots), { passive: true });
  })();
});