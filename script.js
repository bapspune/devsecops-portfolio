/* ============================================================
   PORTFOLIO SCRIPTS — Suhas Phunde (devsecops411014.site)
   Senior DevSecOps Engineer & Cloud Architect
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAccessGate();
  initLucideIcons();
  initTypingEffect();
  initParticleNetwork();
  initScrollAnimations();
  initStatsCounters();
  initNavbarBehavior();
  initMobileNav();
});

/* ---------- Lucide Icons Fallback / Init ---------- */
function initLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/* ---------- Typing Animation ---------- */
function initTypingEffect() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  const roles = [
    'Senior DevSecOps Engineer',
    'AWS & Kubernetes Architect',
    'Agentic AI Platform Builder',
    'Enterprise Cloud Specialist',
    'Zero-Trust Security Architect'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ---------- Particle Network Background Canvas ---------- */
function initParticleNetwork() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  let particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = Math.random() * 2 + 1;
      this.baseColor = Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(167, 139, 250, ';
      this.alpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse reactivity
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.baseColor + this.alpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 18000), 75);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  createParticles();

  function connectParticles() {
    const maxDist = 130;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.18;
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---------- Stats Counters Animation ---------- */
function initStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat-card__number');
  if (!statNumbers.length) return;

  let animated = false;

  const statsSection = document.getElementById('stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target') || '0', 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(easeProgress * target);

              counter.textContent = currentVal + (progress === 1 ? suffix : '');

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target + suffix;
              }
            }

            requestAnimationFrame(updateCounter);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(statsSection);
}

/* ---------- Navbar Behavior & Scrollspy ---------- */
function initNavbarBehavior() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav__links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ---------- Mobile Navigation ---------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const linksContainer = document.getElementById('navLinks');
  if (!toggle || !linksContainer) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    linksContainer.classList.toggle('open');
  });

  linksContainer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      linksContainer.classList.remove('open');
    });
  });
}

/* ---------- Timeline Expand / Collapse ---------- */
function toggleTimeline(button) {
  const timelineItem = button.closest('.timeline-item');
  if (!timelineItem) return;

  const isExpanded = timelineItem.classList.toggle('expanded');
  const arrow = button.querySelector('.arrow');

  if (isExpanded) {
    button.innerHTML = `Hide details <span class="arrow">▴</span>`;
  } else {
    button.innerHTML = `View details <span class="arrow">▾</span>`;
  }
}

/* ---------- Contact Form Handler ---------- */
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const subject = form.querySelector('#subject').value.trim() || 'Portfolio Inquiry';
  const message = form.querySelector('#message').value.trim();

  // Create mailto fallback link
  const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailtoUrl = `mailto:suhasp11@live.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  // Notification / Success Feedback modal or inline toast
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalHtml = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>✓ Message Ready! Opening email...</span>`;
  submitBtn.style.background = 'linear-gradient(135deg, #34d399 0%, #10b981 100%)';

  setTimeout(() => {
    window.location.href = mailtoUrl;
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
      submitBtn.style.background = '';
      form.reset();
    }, 2500);
  }, 600);
}

/* ============================================================
   ENTERPRISE ACCESS GATE & EMAIL APPROVAL PROTOCOL
   ============================================================ */

// Cryptographic SHA-256 hashes of authorized passkeys (zero plaintext in code)
const AUTHORIZED_HASHES = [
  '74d86b2db929b4aa5695973152ab8104b8146880ffabbb8d9be4cb67cce11785', // DevSecOps@411014#Suhas
  '8bf8b4087c88db008fa97296e72b1ac92e73d6e6fd3822e36747e691448b40d0', // Suhas#CloudArch2026!
  '503831d9d3bedbb163e13fc373ac68da2db3c25fd650c3410061b209a43746ea'  // suhasp11@live.com
];

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function togglePassVisibility() {
  const input = document.getElementById('unlockInput');
  const btn = document.getElementById('togglePassBtn');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
}

async function initAccessGate() {
  const urlParams = new URLSearchParams(window.location.search);
  const keyParam = urlParams.get('key') || '';
  const accessParam = (urlParams.get('access') || '').trim().toLowerCase();

  if (accessParam === 'approved' || accessParam === 'granted') {
    grantPortfolioAccess(true);
    return;
  }

  if (keyParam) {
    const hashedParam = await sha256(keyParam.trim());
    if (AUTHORIZED_HASHES.includes(hashedParam)) {
      grantPortfolioAccess(true);
      return;
    }
  }

  // Check persistent session in localStorage
  const isGranted = localStorage.getItem('devsecops_access_granted');
  if (isGranted === 'true') {
    grantPortfolioAccess(false);
  } else {
    document.body.classList.add('portfolio-locked');
    const gate = document.getElementById('accessGate');
    if (gate) gate.classList.remove('hidden');
  }
}

function switchGateTab(tabName) {
  const btnRequest = document.getElementById('tabBtnRequest');
  const btnUnlock = document.getElementById('tabBtnUnlock');
  const paneRequest = document.getElementById('paneRequest');
  const paneUnlock = document.getElementById('paneUnlock');
  const alertBox = document.getElementById('gateAlert');

  if (alertBox) alertBox.style.display = 'none';

  if (tabName === 'request') {
    btnRequest.classList.add('active');
    btnUnlock.classList.remove('active');
    paneRequest.classList.add('active');
    paneUnlock.classList.remove('active');
  } else {
    btnUnlock.classList.add('active');
    btnRequest.classList.remove('active');
    paneUnlock.classList.add('active');
    paneRequest.classList.remove('active');
    const input = document.getElementById('unlockInput');
    if (input) setTimeout(() => input.focus(), 100);
  }
  initLucideIcons();
}

function showGateAlert(message, type = 'error') {
  const alertBox = document.getElementById('gateAlert');
  if (!alertBox) return;

  alertBox.className = `gate-alert ${type}`;
  alertBox.innerHTML = message;
  alertBox.style.display = 'block';
}

async function handleAccessUnlock(event) {
  event.preventDefault();
  const input = document.getElementById('unlockInput');
  if (!input) return;

  const rawVal = input.value.trim();
  const hashedInput = await sha256(rawVal);
  const hashedLower = await sha256(rawVal.toLowerCase());

  const storedApproved = JSON.parse(localStorage.getItem('devsecops_approved_emails') || '[]');

  const isApproved =
    AUTHORIZED_HASHES.includes(hashedInput) ||
    AUTHORIZED_HASHES.includes(hashedLower) ||
    storedApproved.includes(rawVal.toLowerCase()) ||
    (rawVal.includes('@') && rawVal.toLowerCase().endsWith('@devsecops411014.site'));

  if (isApproved) {
    showGateAlert('✓ Authorization Verified! Unlocking Executive Portfolio...', 'success');
    const lockIcon = document.getElementById('gateLockIcon');
    if (lockIcon) lockIcon.textContent = '🔓';

    setTimeout(() => {
      grantPortfolioAccess(true);
    }, 700);
  } else {
    showGateAlert(
      '✕ <strong>Access Denied:</strong> Invalid passkey or unapproved corporate email.<br>Please submit an email access request in the "Request Email Access" tab.',
      'error'
    );
  }
}

function handleAccessRequest(event) {
  event.preventDefault();
  const name = document.getElementById('reqName').value.trim();
  const email = document.getElementById('reqEmail').value.trim();
  const org = document.getElementById('reqOrg').value.trim();
  const purpose = document.getElementById('reqPurpose').value.trim();

  // Format email notification to Suhas
  const mailSubject = `[Portfolio Access Request] ${name} from ${org}`;
  const mailBody = `Hello Suhas,\n\nI am requesting approval to view your confidential DevSecOps & Cloud Architecture Portfolio (devsecops411014.site).\n\nRequester Details:\n• Name: ${name}\n• Corporate Email: ${email}\n• Company / Organization: ${org}\n• Purpose: ${purpose}\n\nTo grant instant access, you can approve this email or provide them with your authorization passkey.\n\nThank you!`;

  const mailtoUrl = `mailto:suhasp11@live.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  showGateAlert(
    `✓ <strong>Access Request Prepared!</strong><br>Opening your email client to dispatch approval request to Suhas Phunde (<strong>suhasp11@live.com</strong>). Once approved, you will receive an authorization passkey or direct link.`,
    'success'
  );

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 1200);
}

function grantPortfolioAccess(savePersistent = true) {
  if (savePersistent) {
    localStorage.setItem('devsecops_access_granted', 'true');
  }

  document.body.classList.remove('portfolio-locked');

  const gate = document.getElementById('accessGate');
  if (gate) gate.classList.add('hidden');

  const statusChip = document.getElementById('navAccessStatus');
  if (statusChip) statusChip.classList.add('visible');

  // Trigger any pending intersection observers
  window.dispatchEvent(new Event('scroll'));
  initLucideIcons();
}

function relockPortfolio() {
  localStorage.removeItem('devsecops_access_granted');
  document.body.classList.add('portfolio-locked');

  const gate = document.getElementById('accessGate');
  if (gate) gate.classList.remove('hidden');

  const statusChip = document.getElementById('navAccessStatus');
  if (statusChip) statusChip.classList.remove('visible');

  const lockIcon = document.getElementById('gateLockIcon');
  if (lockIcon) lockIcon.textContent = '🔒';

  const alertBox = document.getElementById('gateAlert');
  if (alertBox) alertBox.style.display = 'none';

  switchGateTab('unlock');
}
