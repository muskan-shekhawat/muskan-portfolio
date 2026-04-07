/* =====================================================
   MUSKAN SHEKHAWAT — PORTFOLIO SCRIPTS
   Features: Particles, Typing, Scroll Reveal,
             Cursor, Theme Toggle, Navbar, Form
   ===================================================== */

/* ── 1. LOADER ── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => { loader.classList.add('hidden'); }, 1000);
});

/* ── 2. CUSTOM CURSOR ── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (window.innerWidth > 768 && dot && ring) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state for interactive elements
  document.querySelectorAll('a, button, .project-card, .skill-group, .cert-card, .achieve-card, .trait-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

/* ── 3. PARTICLE CANVAS ── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const NUM = 60;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function getRand(min, max) { return Math.random() * (max - min) + min; }

  function createParticle() {
    return {
      x: getRand(0, canvas.width),
      y: getRand(0, canvas.height),
      r: getRand(1, 3),
      vx: getRand(-0.2, 0.2),
      vy: getRand(-0.3, -0.05),
      alpha: getRand(0.1, 0.6),
      color: ['#a78bfa','#f472b6','#38bdf8'][Math.floor(Math.random()*3)]
    };
  }

  for (let i = 0; i < NUM; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) particles[i] = { ...createParticle(), y: canvas.height + 10 };
    });

    // Draw subtle connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#a78bfa';
          ctx.globalAlpha = (1 - dist/100) * 0.08;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 4. TYPING ANIMATION ── */
(function initTyping() {
  const texts = [
    'MERN Stack Apps',
    'Scalable APIs',
    'Beautiful UIs',
    'Full Stack Solutions',
    'Creative Projects'
  ];
  const el = document.getElementById('typingText');
  if (!el) return;

  let ti = 0, ci = 0, deleting = false;

  function type() {
    const current = texts[ti];
    if (deleting) {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; setTimeout(type, 400); return; }
    } else {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    }
    setTimeout(type, deleting ? 50 : 85);
  }
  setTimeout(type, 600);
})();

/* ── 5. NAVBAR ── */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  toggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── 6. SCROLL REVEAL ── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling cards
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
})();

/* ── 7. SKILL BARS ── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.pill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('animate'), 300);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => observer.observe(f));
})();

/* ── 8. THEME TOGGLE ── */
(function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Persist across visits
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  icon.className = saved === 'dark' ? 'ri-moon-line' : 'ri-sun-line';

  btn?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    icon.className = next === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
    localStorage.setItem('theme', next);
  });
})();

/* ── 9. BACK TO TOP ── */
(function initBackTop() {
  const btn = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── 10. CONTACT FORM ── */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = form.name.value.trim();
    const email = form.email.value.trim();
    const msg   = form.message.value.trim();
    if (!name || !email || !msg) return;

    // Simulate submission (replace with real endpoint)
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      success.classList.add('show');
      form.reset();
      btn.innerHTML = '<i class="ri-send-plane-line"></i> Send Message';
      btn.disabled = false;
      setTimeout(() => success.classList.remove('show'), 4000);
    }, 1200);
  });
})();

/* ── 11. ACTIVE NAV HIGHLIGHT on scroll ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ── 12. PROJECT CARD TILT ── */
(function initTilt() {
  if (window.innerWidth <= 768) return;
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const mx = (x / rect.width  - 0.5) * 10;
      const my = (y / rect.height - 0.5) * -10;
      card.style.transform = `translateY(-8px) rotateY(${mx}deg) rotateX(${my}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.35s cubic-bezier(0.4,0,0.2,1)';
    });
  });
})();

/* ── 13. STATS NUMBER ANIMATION ── */
(function initStats() {
  const stats = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.textContent);
        const suffix = el.textContent.replace(/[\d.]/g, '');
        const decimals = el.textContent.includes('.') ? 2 : 0;
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current.toFixed(decimals) + suffix;
          if (current >= target) clearInterval(timer);
        }, 20);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => observer.observe(s));
})();

/* ── 14. SMOOTH SECTION TRANSITIONS ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 15. DOWNLOAD RESUME ── */
document.getElementById('downloadResume')?.addEventListener('click', (e) => {
  e.preventDefault();
  // Replace the alert below with actual resume PDF link when available:
  // window.open('resume.pdf', '_blank');
  alert('Resume download will be available soon! Contact me at shekhawatmuskan118@gmail.com');
});
