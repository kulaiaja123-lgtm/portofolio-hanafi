/* ════════════════════════════════════════════
   MAIN RENDER & INITIALIZATION
════════════════════════════════════════════ */

// Global config variable
let CFG = loadConfig();

// Main render function
function render() {
  document.title = CFG.name + ' — Portfolio';
  document.getElementById('nav-logo').textContent = '✦ ' + CFG.name.split(' ')[0].toUpperCase();

  // Hero
  document.getElementById('e-tagline').textContent = CFG.tagline;
  document.getElementById('e-heroDesc').textContent = CFG.heroDesc;
  document.getElementById('cv-link').href = CFG.cvLink;
  const words = CFG.name.split(' '), last = words.pop();
  document.getElementById('hero-name').innerHTML = (words.length ? words.join(' ') + '<br>' : '') + `<span>${last}</span>`;

  document.getElementById('hero-stats').innerHTML = CFG.stats.map(s =>
    `<div class="stat-item"><div class="stat-num">${s.num}</div><div class="stat-label">${s.label}</div></div>`
  ).join('');

  // Skills
  document.getElementById('skills-grid').innerHTML = CFG.skills.map(s =>
    `<div class="skill-card"><div class="skill-icon">${s.icon}</div><div class="skill-name">${s.name}</div><div class="skill-desc">${s.desc}</div></div>`
  ).join('');
  document.getElementById('tools-list').innerHTML = CFG.tools.map(t => `<div class="tool-pill">${t}</div>`).join('');

  // Projects
  document.getElementById('portfolio-grid').innerHTML = CFG.projects.map((p, i) => {
    const saved = localStorage.getItem(STORAGE_KEYS.imgProj + i);
    const src = saved || p.img;
    const imgArea = src
      ? `<img src="${src}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;"/>`
      : `<div class="img-placeholder"><div class="img-placeholder-icon">📊</div><div style="font-family:var(--mono);font-size:9px;letter-spacing:.1em;color:var(--text-dim);text-transform:uppercase;text-align:center;">Screenshot Proyek</div></div>`;
    return `<div class="project-card fade-in">
      <div class="project-img" id="pimg${i}">
        ${imgArea}
        <div class="img-upload-overlay" onclick="uploadImg('proj',${i})"><div class="uo-icon">📷</div><div class="uo-text">Ganti Gambar</div></div>
      </div>
      <div class="project-body">
        <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-footer">
          <div class="project-tools">${p.tools}</div>
          ${p.link && p.link !== '#' ? `<a href="${p.link}" target="_blank" class="project-link">View →</a>` : '<span></span>'}
        </div>
      </div>
    </div>`;
  }).join('');

  // About
  document.getElementById('e-bio').textContent = CFG.bio;
  document.getElementById('about-details').innerHTML = CFG.aboutDetails.map(d =>
    `<div class="about-row"><div class="about-row-label">${d.label}</div><div class="about-row-val">${d.val}</div></div>`
  ).join('');

  // Contact
  document.getElementById('contact-links').innerHTML = [
    { icon: '📧', label: 'Email', val: CFG.email, href: 'mailto:' + CFG.email },
    { icon: '💬', label: 'WhatsApp', val: CFG.whatsapp, href: 'https://wa.me/' + CFG.whatsapp.replace(/\D/g, '') },
    { icon: '💼', label: 'LinkedIn', val: 'LinkedIn Profile', href: CFG.linkedin },
    { icon: '🌐', label: 'Upwork', val: 'Upwork Profile', href: CFG.upwork },
  ].map(c => `<a class="contact-link" href="${c.href}" target="_blank">
    <div class="contact-link-icon">${c.icon}</div>
    <div class="contact-link-info"><div class="contact-link-label">${c.label}</div><div class="contact-link-val">${c.val}</div></div>
    <div class="contact-link-arr">→</div></a>`).join('');

  document.getElementById('footer-copy').textContent = `© ${new Date().getFullYear()} ${CFG.name} — Data Professional`;

  // Saved images
  const hi = localStorage.getItem(STORAGE_KEYS.imgHero);
  if (hi) setImg('hero-img', 'hero-ph', hi);
  const ai = localStorage.getItem(STORAGE_KEYS.imgAbout);
  if (ai) setImg('about-img', 'about-ph', ai);

  setupFade();
  setupNav();
}

// Initialize on DOM ready
window.addEventListener('DOMContentLoaded', render);

// Export untuk module
// export { CFG, render };
