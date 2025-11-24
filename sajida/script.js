// Smooth scroll for nav links
function enableSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          closeMobileMenu();
        }
      }
    });
  });
}

// Mobile nav toggle
function setupMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function closeMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!menu || !toggle) return;
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

// Reveal on scroll using Intersection Observer
function setupRevealOnScroll() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// Loader handling
function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.style.opacity = '0';
  loader.style.transition = 'opacity 300ms ease';
  setTimeout(() => loader.remove(), 320);
}

// Set year in footer
function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  enableSmoothScroll();
  setupMobileNav();
  setupRevealOnScroll();
  setCurrentYear();
});

window.addEventListener('load', () => {
  // Ensure loader hides after assets load
  hideLoader();
  startMatrix();
});

// Matrix background animation
function startMatrix() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    if (columns !== Math.floor(canvas.width / fontSize)) {
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(167,139,250,0.85)';
    ctx.font = fontSize + 'px JetBrains Mono, monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = characters[Math.floor(Math.random() * characters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
}


