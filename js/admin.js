/* ════════════════════════════════════════════
   ADMIN FUNCTIONS
   Image upload, save data, edit modal
════════════════════════════════════════════ */

// Image upload handler
function uploadImg(type, idx) {
  if (!isAdmin) return;

  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'image/*';

  inp.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        const r = Math.min(1, 900 / img.width);
        c.width = img.width * r;
        c.height = img.height * r;
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        const data = c.toDataURL('image/jpeg', 0.82);

        if (type === 'hero') {
          localStorage.setItem(STORAGE_KEYS.imgHero, data);
          setImg('hero-img', 'hero-ph', data);
        } else if (type === 'about') {
          localStorage.setItem(STORAGE_KEYS.imgAbout, data);
          setImg('about-img', 'about-ph', data);
        } else if (type === 'proj') {
          localStorage.setItem(STORAGE_KEYS.imgProj + idx, data);
          const cont = document.getElementById('pimg' + idx);
          let existing = cont.querySelector('img');

          if (existing) {
            existing.src = data;
            existing.style.display = '';
            existing.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
          } else {
            const ph = cont.querySelector('.img-placeholder');
            if (ph) ph.remove();
            const ni = document.createElement('img');
            ni.src = data;
            ni.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
            cont.insertBefore(ni, cont.firstChild);
          }
        }
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  inp.click();
}

// Save all changes
function saveAll() {
  // Sync inline edits
  const map = {
    tagline: 'e-tagline',
    heroDesc: 'e-heroDesc',
    bio: 'e-bio'
  };

  for (const [k, id] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el) CFG[k] = el.textContent.trim();
  }

  saveConfig(CFG);

  const btn = document.getElementById('save-btn');
  btn.textContent = '✅ Tersimpan!';
  btn.classList.add('saved');

  setTimeout(() => {
    btn.textContent = '💾 Simpan';
    btn.classList.remove('saved');
  }, 2500);
}

// Fields for full edit modal
const EDIT_FIELDS = [
  { key: 'name', label: 'Nama Lengkap', multi: false },
  { key: 'tagline', label: 'Tagline / Jabatan', multi: false },
  { key: 'heroDesc', label: 'Deskripsi Hero', multi: true },
  { key: 'email', label: 'Email', multi: false },
  { key: 'whatsapp', label: 'WhatsApp (+62...)', multi: false },
  { key: 'linkedin', label: 'LinkedIn URL', multi: false },
  { key: 'upwork', label: 'Upwork URL', multi: false },
  { key: 'cvLink', label: 'Link CV (Google Drive / lainnya)', multi: false },
  { key: 'bio', label: 'Bio (About Me)', multi: true },
];

// Open full edit modal
function openEditModal() {
  document.getElementById('edit-fields').innerHTML = EDIT_FIELDS.map(f => `
    <div class="edit-field-group">
      <label class="edit-label">${f.label}</label>
      ${f.multi
        ? `<textarea data-key="${f.key}" class="edit-textarea">${CFG[f.key] || ''}</textarea>`
        : `<input data-key="${f.key}" type="text" class="edit-input" value="${(CFG[f.key] || '').replace(/"/g, '&quot;')}"/>`
      }
    </div>
  `).join('');

  document.getElementById('edit-modal').classList.add('show');
}

// Apply edits from modal
function applyEdit() {
  document.querySelectorAll('#edit-fields [data-key]').forEach(el => {
    CFG[el.dataset.key] = (el.tagName === 'TEXTAREA' ? el.value : el.value).trim();
  });

  saveConfig(CFG);
  document.getElementById('edit-modal').classList.remove('show');
  render();

  if (isAdmin) enterAdmin();
}

// Export untuk module
// export { uploadImg, saveAll, openEditModal, applyEdit, EDIT_FIELDS };
