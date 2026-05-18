// 이숭호 한의원 사이트 초기화: 모바일 메뉴, 이메일 조합, 스크롤 애니메이션

(function () {
  'use strict';

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    const toggleMenu = (show) => {
      const isExpanded = show !== undefined ? !show : toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      menu.classList.toggle('open', !isExpanded);
    };

    toggle.addEventListener('click', () => toggleMenu());

    // Close menu on link click
    menu.querySelectorAll('.nav-link, .lang-link').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      });
    });

    // Accessibility: Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggleMenu(false);
        toggle.focus();
      }
    });
  }

  // Email obfuscation (spam bot prevention)
  const emailEl = document.getElementById('email-display');
  if (emailEl) {
    const user = 'cmdslee';
    const domain = 'gmail.com';
    const addr = `${user}@${domain}`;
    const a = document.createElement('a');
    a.href = `mailto:${addr}`;
    a.textContent = addr;
    emailEl.appendChild(a);
  }

  // Scroll reveal (IntersectionObserver fallback for browsers without animation-range)
  if (!CSS.supports('animation-range', 'entry')) {
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      reveals.forEach((el) => observer.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('revealed'));
    }
  }

  // Language Dropdown Toggle (Mobile/Touch)
  const langSwitcher = document.getElementById('lang-switcher');
  if (langSwitcher) {
    const langToggle = langSwitcher.querySelector('.lang-toggle');
    
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langSwitcher.classList.contains('open');
      langSwitcher.classList.toggle('open', !isOpen);
      langToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      if (langSwitcher.classList.contains('open')) {
        langSwitcher.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu and dropdown on link click
    langSwitcher.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        langSwitcher.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
        if (toggle && menu) {
          toggle.setAttribute('aria-expanded', 'false');
          menu.classList.remove('open');
        }
      });
    });
  }

  // Active nav link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveNav = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Floating CTA visibility on scroll
  const floatingCta = document.querySelector('.floating-cta');
  if (floatingCta) {
    const toggleFloatingCta = () => {
      if (window.scrollY > 200) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', toggleFloatingCta, { passive: true });
    toggleFloatingCta();
  }
})();
