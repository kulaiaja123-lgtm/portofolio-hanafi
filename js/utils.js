/* ════════════════════════════════════════════
   UTILITY FUNCTIONS
════════════════════════════════════════════ */

// Fade in animation on scroll
function setupFade() {
  const els = document.querySelectorAll('.fade-in:not(.visible)');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: .08 });
  els.forEach(el => obs.observe(el));
}

// Navigation active state on scroll
function setupNav() {
  window.addEventListener('scroll', () => {
    let cur = '';
    document.querySelectorAll('section[id]').forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : '';
    });
  });
}

// Handle contact form submission
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Terkirim ✓';
  btn.style.background = 'var(--accent2)';
  setTimeout(() => {
    btn.textContent = 'Kirim Pesan →';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// Set image with placeholder toggle
function setImg(imgId, phId, src) {
  const img = document.getElementById(imgId);
  const ph = document.getElementById(phId);
  if (img) {
    img.src = src;
    img.style.display = 'block';
  }
  if (ph) ph.style.display = 'none';
}

// Load configuration from localStorage or use default
function loadConfig() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.data);
    return data ? JSON.parse(data) : JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }
}

// Save configuration to localStorage
function saveConfig(config) {
  localStorage.setItem(STORAGE_KEYS.data, JSON.stringify(config));
}

// Export untuk module
// export { setupFade, setupNav, handleForm, setImg, loadConfig, saveConfig };
