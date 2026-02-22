/* ========================================
   SHUBHI MAHESHWARI MISHRA
   Premium Interactions · Scroll Reveal · Counters · Skill Bars
   ======================================== */

// ---------- NAVBAR SCROLL ----------
(function initNavbar() {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();

// ---------- MOBILE NAV ----------
(function initMobileNav() {
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
})();

// ---------- SCROLL REVEAL ----------
(function initReveal() {
  var singles = document.querySelectorAll(
    '.section-label, .section-heading, .about-layout, .exp-card, ' +
    '.skill-col, .edu-card, .cert-item, .cta-block, .metrics-strip, .about-heading'
  );
  singles.forEach(function (el) {
    el.classList.add('reveal');
  });

  var staggerGroups = document.querySelectorAll('.exp-tags, .about-cards, .cert-list');
  staggerGroups.forEach(function (el) {
    el.classList.add('reveal-stagger');
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

// ---------- COUNTER ANIMATION ----------
(function initCounters() {
  var counters = document.querySelectorAll('.metric-value');
  var hasRun = false;

  function animateCounters() {
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      var duration = 1800;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var ease = 1 - Math.pow(2, -10 * progress);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(step);
    });
  }

  var strip = document.querySelector('.metrics-strip');
  if (!strip) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(strip);
})();

// ---------- SKILL BAR ANIMATION ----------
(function initSkillBars() {
  var bars = document.querySelectorAll('.skill-fill');
  var hasRun = false;

  function animateBars() {
    bars.forEach(function (bar) {
      var width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(function () {
        bar.style.width = width;
      }, 100);
    });
  }

  var skillSection = document.getElementById('skills');
  if (!skillSection) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          animateBars();
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(skillSection);
})();

// ---------- SMOOTH SCROLL ----------
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var y = target.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
})();

// ---------- ACTIVE NAV HIGHLIGHTING ----------
(function initActiveNav() {
  var sections = document.querySelectorAll('.section, #hero');
  var navLinks = document.querySelectorAll('.nav-links a');

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--blue)';
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
  );

  sections.forEach(function (s) { observer.observe(s); });
})();
