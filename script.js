/* ============================================
   Portfolio — JS
   Scroll reveal, smooth nav, mobile menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile hamburger menu ---
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const body = document.body;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  body.appendChild(overlay);

  function openMenu() {
    mainNav.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    overlay.classList.add('active');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    body.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking overlay
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking a nav link
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Close menu on resize past breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('open')) {
      closeMenu();
    }
  });

  // --- Scroll-reveal for sections ---
  const revealTargets = document.querySelectorAll(
    '.section-header, .project-card, .contact-text, .contact-links, .footer-inner, .cronstar-card, .experience-item, .skill-card'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  revealTargets.forEach(el => observer.observe(el));

  // --- Staggered reveal for project cards ---
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.07}s`;
  });

  // --- Smooth scroll for anchor nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Header shrink on scroll ---
  const header = document.getElementById('header');

  // Apply sticky styles
  header.style.position = 'sticky';
  header.style.top = '0';
  header.style.zIndex = '50';
  header.style.transition = 'background 0.3s, border-bottom 0.3s, backdrop-filter 0.3s';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.backdropFilter = 'blur(12px)';
      header.style.webkitBackdropFilter = 'blur(12px)';
      header.style.background = 'transparent';
      header.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
    } else {
      header.style.backdropFilter = 'none';
      header.style.webkitBackdropFilter = 'none';
      header.style.background = 'transparent';
      header.style.borderBottom = '1px solid transparent';
    }
  }, { passive: true });

});
