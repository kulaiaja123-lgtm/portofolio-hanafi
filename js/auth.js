/* ════════════════════════════════════════════
   AUTHENTICATION SYSTEM
════════════════════════════════════════════ */

let isAdmin = false;
let _buf = '';

// Secret key listener for admin login
document.addEventListener('keypress', e => {
  _buf += e.key;
  if (_buf.length > 12) _buf = _buf.slice(-12);
  if (_buf.endsWith('adminlogin')) {
    _buf = '';
    openLogin();
  }
});

// Open login modal
function openLogin() {
  document.getElementById('login-modal').classList.add('show');
  setTimeout(() => document.getElementById('pw-input').focus(), 120);
}

// Close login modal
function closeLogin() {
  document.getElementById('login-modal').classList.remove('show');
  document.getElementById('pw-input').value = '';
  document.getElementById('login-error').style.display = 'none';
}

// Perform login
function doLogin() {
  const val = document.getElementById('pw-input').value;
  const stored = localStorage.getItem(STORAGE_KEYS.pw) || DEFAULT_PASSWORD;

  if (val === stored) {
    closeLogin();
    isAdmin = true;
    enterAdmin();
  } else {
    document.getElementById('login-error').style.display = 'block';
    document.getElementById('pw-input').value = '';
    document.getElementById('pw-input').focus();
  }
}

// Enter admin mode
function enterAdmin() {
  document.body.classList.add('admin-mode');
  document.getElementById('admin-badge').classList.add('show');
  document.getElementById('admin-toolbar').classList.add('show');
  document.querySelectorAll('.editable').forEach(el => {
    el.setAttribute('contenteditable', 'true');
  });
}

// Logout from admin mode
function doLogout() {
  isAdmin = false;
  document.body.classList.remove('admin-mode');
  document.getElementById('admin-badge').classList.remove('show');
  document.getElementById('admin-toolbar').classList.remove('show');
  document.querySelectorAll('.editable').forEach(el => {
    el.setAttribute('contenteditable', 'false');
  });
}

// Change password
function doChangePw() {
  const np = document.getElementById('new-pw').value;
  const cp = document.getElementById('conf-pw').value;
  const err = document.getElementById('pw-err');

  err.style.display = 'none';

  if (np.length < 8) {
    err.style.display = 'block';
    err.textContent = '❌ Password minimal 8 karakter.';
    return;
  }

  if (np !== cp) {
    err.style.display = 'block';
    err.textContent = '❌ Konfirmasi password tidak sama.';
    return;
  }

  localStorage.setItem(STORAGE_KEYS.pw, np);
  document.getElementById('pw-modal').classList.remove('show');
  document.getElementById('new-pw').value = '';
  document.getElementById('conf-pw').value = '';
  alert('✅ Password berhasil diubah!\n\nPassword baru: ' + np + '\nCatat dan simpan baik-baik!');
}

// Check if user is admin
function checkAdmin() {
  return isAdmin;
}

// Export untuk module
// export { isAdmin, openLogin, closeLogin, doLogin, doLogout, doChangePw, checkAdmin };
