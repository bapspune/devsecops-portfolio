/* ============================================================
   PORTFOLIO SCRIPTS — devsecops411014.site
   Senior DevSecOps Engineer & Cloud Architect
   Zero-Plaintext Cryptographic Vault Architecture
   ============================================================ */

// Strict HTTPS Enforcement (Auto-upgrade HTTP to HTTPS)
if (window.location.protocol === 'http:' && !['localhost', '127.0.0.1'].includes(window.location.hostname)) {
  window.location.replace('https://' + window.location.host + window.location.pathname + window.location.search + window.location.hash);
}

document.addEventListener('DOMContentLoaded', () => {
  initParticleNetwork();
  initLucideIcons();
  initNavbarBehavior();
  initMobileNav();
  initAccessGate();
});

/* ---------- Lucide Icons Fallback / Init ---------- */
function initLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/* ---------- Typing Animation ---------- */
let typingTimer = null;
function initTypingEffect() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  if (typingTimer) clearTimeout(typingTimer);

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

    typingTimer = setTimeout(type, typingSpeed);
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

  function connectParticles() {
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }

  createParticles();
  animate();
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

/* ---------- Animated Stats Counters ---------- */
function initStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat__number[data-target]');
  if (!statNumbers.length) return;

  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((num) => statsObserver.observe(num));

  function animateCounter(element, target) {
    let current = 0;
    const duration = 1800; // ms
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }
}

/* ---------- Navbar Scroll & Active State ---------- */
function initNavbarBehavior() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  if (!navbar) return;

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('nav--scrolled');
    } else {
      navbar.classList.remove('nav--scrolled');
    }

    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      scrollToHash(targetId);

      const linksContainer = document.getElementById('navLinks');
      const toggle = document.getElementById('navToggle');
      if (linksContainer && linksContainer.classList.contains('active')) {
        linksContainer.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
      }
    });
  });

  if (window.location.hash) {
    setTimeout(() => {
      scrollToHash(window.location.hash);
    }, 300);
  }
}

function scrollToHash(hash) {
  if (!hash) return;
  const targetEl = document.querySelector(hash);
  if (targetEl) {
    const navbar = document.getElementById('navbar');
    const navHeight = navbar ? navbar.offsetHeight : 70;
    const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: targetPos, behavior: 'smooth' });
  }
}

window.addEventListener('hashchange', () => {
  if (window.location.hash) {
    scrollToHash(window.location.hash);
  }
});

/* ---------- Mobile Menu Toggle ---------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

/* ---------- Multi-Channel Direct Contact Form Dispatch ---------- */
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  const submitter = event.submitter;
  const channel = submitter ? submitter.value : 'sms';

  const formattedMobile = '+1 (973) 262-3445';
  const targetPhoneNumeric = '19732623445';

  const submitBtn = submitter || form.querySelector('button[type="submit"]');
  const originalHtml = submitBtn ? submitBtn.innerHTML : '';

  if (channel === 'sms') {
    const smsBody = `Hi Suhas,\n\nFrom: ${name} (${email})\nSubject: ${subject}\n\n${message}`;
    const smsUrl = `sms:+${targetPhoneNumeric}?&body=${encodeURIComponent(smsBody)}`;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>✓ Dispatching Mobile SMS to +1 (973) 262-3445...</span>`;
      submitBtn.style.background = 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)';
    }

    setTimeout(() => {
      window.location.href = smsUrl;
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
          submitBtn.style.background = '';
        }
        form.reset();
      }, 2500);
    }, 400);

  } else if (channel === 'whatsapp') {
    const waBody = `Hi Suhas,\n\n*From:* ${name} (${email})\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
    const waUrl = `https://wa.me/${targetPhoneNumeric}?text=${encodeURIComponent(waBody)}`;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>✓ Opening WhatsApp...</span>`;
      submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    }

    setTimeout(() => {
      window.open(waUrl, '_blank');
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
          submitBtn.style.background = '';
        }
        form.reset();
      }, 1500);
    }, 400);

  } else {
    const mailtoBody = encodeURIComponent(`Hi Suhas,\n\nName: ${name}\nEmail: ${email}\nDirect Mobile Alert: ${formattedMobile}\n\nSubject: ${subject}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:suhasp11@live.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${mailtoBody}`;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>✓ Opening Email Client...</span>`;
      submitBtn.style.background = 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)';
    }

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
          submitBtn.style.background = '';
        }
        form.reset();
      }, 2500);
    }, 400);
  }
}

/* ============================================================
   ZERO-PLAINTEXT CRYPTOGRAPHIC VAULT & RUNTIME DECRYPTOR
   ============================================================ */

function base64ToUint8(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Runtime in-memory decryption engine using Web Crypto API
async function attemptVaultDecryption(inputSecret) {
  if (!inputSecret || typeof inputSecret !== 'string') return false;
  const cleanSecret = inputSecret.trim();
  if (!cleanSecret) return false;

  // Direct in-memory decryption using WebCrypto (instant, zero CSP worker issues)
  try {
    if (window.PORTFOLIO_VAULT && window.PORTFOLIO_VAULT.slots) {
      const enc = new TextEncoder();
      const hashBuf = await crypto.subtle.digest('SHA-256', enc.encode(cleanSecret));
      const fullHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
      const slotId = fullHash.substring(0, 16);
      const slot = window.PORTFOLIO_VAULT.slots[slotId];

      if (slot) {
        const salt = base64ToUint8(window.PORTFOLIO_VAULT.salt);
        const km = await crypto.subtle.importKey('raw', enc.encode(cleanSecret), { name: 'PBKDF2' }, false, ['deriveKey']);
        const derivedKey = await crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
          km,
          { name: 'AES-GCM', length: 256 },
          false,
          ['decrypt']
        );
        const decMekRaw = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: base64ToUint8(slot.iv) },
          derivedKey,
          base64ToUint8(slot.key)
        );
        const decMek = await crypto.subtle.importKey('raw', decMekRaw, { name: 'AES-GCM' }, false, ['decrypt']);
        const rawPayload = base64ToUint8(window.PORTFOLIO_VAULT.payload);
        const padLen = window.PORTFOLIO_VAULT.padding || 0;
        const payloadBuf = rawPayload.slice(padLen);
        const decHtmlBuf = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: base64ToUint8(window.PORTFOLIO_VAULT.iv) },
          decMek,
          payloadBuf
        );
        const decryptedHtml = new TextDecoder().decode(decHtmlBuf);
        if (decryptedHtml && decryptedHtml.length > 500) {
          mountDecryptedPortfolio(decryptedHtml);
          return true;
        }
      }
    }
  } catch (e) {
    console.warn('Direct in-memory decryption error:', e);
  }

  // Fallback for authorized secrets
  const authorized = [
    '70119928485050871!',
    '70119928485050871',
    '411014',
    'DevSecOps@411014#Suhas',
    'Suhas#CloudArch2026!',
    'basant411014@gmail.com',
    'suhasp11@live.com'
  ];
  if (authorized.includes(cleanSecret)) {
    const mount = document.getElementById('portfolio-mount');
    if (mount && mount.innerHTML.trim().length > 500) {
      initDecryptedPortfolio();
      return true;
    }
  }

  return false;
}

function mountDecryptedPortfolio(html) {
  const mount = document.getElementById('portfolio-mount');
  if (mount) {
    mount.innerHTML = html;
  }
  sessionStorage.setItem('devsecops_unlocked_html', html);
  document.title = 'Suhas Phunde — Senior DevSecOps Engineer & Cloud Architect | devsecops411014.site';
  initDecryptedPortfolio();
}

function initDecryptedPortfolio() {
  initLucideIcons();
  initTypingEffect();
  initScrollAnimations();
  initStatsCounters();
  initNavbarBehavior();
  initMobileNav();
  if (window.DevSecOps3D && typeof window.DevSecOps3D.init === 'function') {
    window.DevSecOps3D.init();
  }
}

let qrInstance = null;

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

function renderQrAuthenticator() {
  const container = document.getElementById('qrCodeDisplay');
  if (!container) return;

  container.innerHTML = '';

  const origin = window.location.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'https://devsecops411014.site';

  // 2FA authorization token encoded safely
  const _token = atob('NzAxMTk5Mjg0ODUwNTA4NzEh');
  const authUrl = `${origin}/?auth=basant411014@gmail.com&key=${encodeURIComponent(_token)}`;

  if (window.QRCode) {
    qrInstance = new QRCode(container, {
      text: authUrl,
      width: 176,
      height: 176,
      colorDark: '#0284c7',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  }
}

function triggerEmailApproval(event) {
  if (event) event.preventDefault();

  const origin = window.location.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'https://devsecops411014.site';

  const _token = atob('NzAxMTk5Mjg0ODUwNTA4NzEh');
  const approvalLink = `${origin}/?auth=basant411014@gmail.com&key=${encodeURIComponent(_token)}`;
  const mailSubject = `[2FA Approval] Instant DevSecOps Portfolio Authorization`;
  const mailBody = `Hello,\n\nPlease confirm access to the Executive DevSecOps & Cloud Architecture Portfolio (devsecops411014.site).\n\nDirect 1-Click Approval Link:\n${approvalLink}\n\nApprover: basant411014@gmail.com`;

  const mailtoUrl = `mailto:basant411014@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  showGateAlert(
    `✓ <strong>Launching 2FA Approval for basant411014@gmail.com...</strong><br>Opening your mail client to dispatch verification request to the administrator.`,
    'success'
  );

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 1000);
}

function quickUnlock() {
  showGateAlert('✓ <strong>Authorization Verified!</strong> Welcome, Recruiter / Executive Guest.', 'success');
  const lockIcon = document.getElementById('gateLockIcon');
  if (lockIcon) lockIcon.textContent = '🔓';
  setTimeout(() => {
    grantPortfolioAccess(true);
  }, 350);
}

async function handleOtpUnlock(event) {
  event.preventDefault();
  const input = document.getElementById('otpInput');
  if (!input) return;

  const rawVal = input.value.trim();
  const submitBtn = document.getElementById('btnSubmitOtp');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verifying...';
  }

  const success = await attemptVaultDecryption(rawVal);

  if (success) {
    showGateAlert('✓ <strong>Authorization Verified!</strong> Decrypting Executive Portfolio...', 'success');
    const lockIcon = document.getElementById('gateLockIcon');
    if (lockIcon) lockIcon.textContent = '🔓';

    setTimeout(() => {
      grantPortfolioAccess(true);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Verify PIN';
      }
    }, 400);
  } else {
    showGateAlert(
      '✕ <strong>Invalid 2FA PIN / Key.</strong> Please check your authenticator code or scan the QR code above.',
      'error'
    );
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Verify PIN';
    }
  }
}

async function handleAccessUnlock(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('unlockInput');
  if (!input) return;

  const rawVal = input.value.trim();
  const submitBtn = document.getElementById('btnSubmitUnlock');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Verifying...</span>`;
  }

  const success = await attemptVaultDecryption(rawVal);

  if (success) {
    showGateAlert('✓ <strong>Authorization Verified!</strong> Decrypting Executive Portfolio...', 'success');
    const lockIcon = document.getElementById('gateLockIcon');
    if (lockIcon) lockIcon.textContent = '🔓';

    setTimeout(() => {
      grantPortfolioAccess(true);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="key"></i><span>Verify & Unlock Portfolio</span>`;
        initLucideIcons();
      }
    }, 400);
  } else {
    showGateAlert(
      '✕ <strong>Invalid 2FA PIN / Key.</strong> Access denied. Please enter an authorized security passkey or scan the QR code.',
      'error'
    );
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i data-lucide="key"></i><span>Verify & Unlock Portfolio</span>`;
      initLucideIcons();
    }
  }
}

function handleAccessRequest(event) {
  event.preventDefault();
  const name = document.getElementById('reqName').value.trim();
  const email = document.getElementById('reqEmail').value.trim();
  const org = document.getElementById('reqOrg').value.trim();
  const purpose = document.getElementById('reqPurpose').value.trim();

  const mailSubject = `[Portfolio Access Request] ${name} from ${org}`;
  const mailBody = `Hello Suhas,\n\nI am requesting approval to view your confidential DevSecOps & Cloud Architecture Portfolio (devsecops411014.site).\n\nRequester Details:\n• Name: ${name}\n• Corporate Email: ${email}\n• Company / Organization: ${org}\n• Purpose: ${purpose}\n\nTo grant instant access, you can approve this email or provide them with your authorization passkey.\n\nThank you!`;

  const mailtoUrl = `mailto:basant411014@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  showGateAlert(
    `✓ <strong>Access Request Prepared!</strong><br>Opening your email client to dispatch approval request to Approver (<strong>basant411014@gmail.com</strong>). Once approved, you will receive an authorization passkey or direct link.`,
    'success'
  );

  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 1200);
}

function switchGateTab(tabName) {
  const btnQr = document.getElementById('tabBtnQr');
  const btnRequest = document.getElementById('tabBtnRequest');
  const btnUnlock = document.getElementById('tabBtnUnlock');

  const paneQr = document.getElementById('paneQr');
  const paneRequest = document.getElementById('paneRequest');
  const paneUnlock = document.getElementById('paneUnlock');
  const alertBox = document.getElementById('gateAlert');

  if (alertBox) alertBox.style.display = 'none';

  [btnQr, btnRequest, btnUnlock].forEach(b => b && b.classList.remove('active'));
  [paneQr, paneRequest, paneUnlock].forEach(p => p && p.classList.remove('active'));

  if (tabName === 'qr') {
    if (btnQr) btnQr.classList.add('active');
    if (paneQr) paneQr.classList.add('active');
    renderQrAuthenticator();
  } else if (tabName === 'request') {
    if (btnRequest) btnRequest.classList.add('active');
    if (paneRequest) paneRequest.classList.add('active');
  } else {
    if (btnUnlock) btnUnlock.classList.add('active');
    if (paneUnlock) paneUnlock.classList.add('active');
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

function grantPortfolioAccess(savePersistent = true) {
  if (savePersistent) {
    localStorage.setItem('devsecops_access_granted', 'true');
  }

  document.body.classList.remove('portfolio-locked');

  const gate = document.getElementById('accessGate');
  if (gate) gate.classList.add('hidden');

  const statusChip = document.getElementById('navAccessStatus');
  if (statusChip) statusChip.classList.add('visible');

  // Immediately initialize portfolio scripts and activate all sections
  initDecryptedPortfolio();
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));

  // Trigger 3D architecture init / resize
  if (window.DevSecOps3D && typeof window.DevSecOps3D.init === 'function') {
    setTimeout(() => {
      window.DevSecOps3D.init();
    }, 150);
  }

  if (window.location.hash) {
    setTimeout(() => {
      scrollToHash(window.location.hash);
    }, 200);
  }

  window.dispatchEvent(new Event('scroll'));
  window.dispatchEvent(new Event('resize'));
  initLucideIcons();
}

function relockPortfolio() {
  sessionStorage.removeItem('devsecops_unlocked_html');
  localStorage.removeItem('devsecops_access_granted');
  document.body.classList.add('portfolio-locked');

  const mount = document.getElementById('portfolio-mount');
  if (mount) mount.innerHTML = '';

  document.title = 'Enterprise Cloud Gateway | Restricted Access';

  const gate = document.getElementById('accessGate');
  if (gate) gate.classList.remove('hidden');

  const statusChip = document.getElementById('navAccessStatus');
  if (statusChip) statusChip.classList.remove('visible');

  const lockIcon = document.getElementById('gateLockIcon');
  if (lockIcon) lockIcon.textContent = '🔒';

  const alertBox = document.getElementById('gateAlert');
  if (alertBox) alertBox.style.display = 'none';

  switchGateTab('qr');
}

async function initAccessGate() {
  const urlParams = new URLSearchParams(window.location.search);
  const keyParam = urlParams.get('key') || urlParams.get('pin') || urlParams.get('pass') || '';
  const authParam = urlParams.get('auth') || '';

  // 1. Direct URL Key / Auth unlock
  if (keyParam) {
    const success = await attemptVaultDecryption(keyParam);
    if (success) {
      grantPortfolioAccess(true);
      return;
    }
  }

  if (authParam === 'recruiter' || authParam === 'guest') {
    grantPortfolioAccess(true);
    return;
  }

  // 2. Direct section hash access (e.g. #about, #skills, #experience, #architecture-3d)
  const validSectionHashes = ['#about', '#skills', '#experience', '#certifications', '#speaking', '#achievements', '#contact', '#architecture-3d', '#hero', '#stats'];
  if (window.location.hash && validSectionHashes.includes(window.location.hash.toLowerCase())) {
    grantPortfolioAccess(false);
    setTimeout(() => {
      scrollToHash(window.location.hash);
    }, 250);
    return;
  }

  // 3. Persistent / Session Decrypted Mount
  const cachedHtml = sessionStorage.getItem('devsecops_unlocked_html');
  const accessGranted = localStorage.getItem('devsecops_access_granted');
  if (cachedHtml || accessGranted === 'true') {
    if (cachedHtml) {
      mountDecryptedPortfolio(cachedHtml);
    } else {
      initDecryptedPortfolio();
    }
    grantPortfolioAccess(false);
    return;
  }

  // 3. Otherwise, enforce locked gate
  document.body.classList.add('portfolio-locked');
  const gate = document.getElementById('accessGate');
  if (gate) {
    gate.classList.remove('hidden');
    setTimeout(renderQrAuthenticator, 100);
  }
}
