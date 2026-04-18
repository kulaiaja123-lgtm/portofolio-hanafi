# Portfolio Website - Data Professional

Portfolio website statis dengan sistem admin terintegrasi. Semua data disimpan di localStorage browser (tidak perlu backend/database).

## 📁 Struktur File

```
portfolio/
├── index.html          # Halaman utama
├── css/
│   └── style.css       # Semua styling
├── js/
│   ├── config.js       # Konfigurasi default & password
│   ├── utils.js        # Utility functions
│   ├── auth.js         # Sistem login/logout admin
│   ├── admin.js        # Fungsi admin (upload, edit, save)
│   └── main.js         # Render utama & initialization
└── README.md           # Dokumentasi ini
```

## 🚀 Cara Menggunakan

### 1. Setup Pertama Kali
1. Buka `js/config.js`
2. Edit `DEFAULT_CONFIG` dengan data kamu:
   - `name`: Nama lengkap
   - `email`: Email kontak
   - `whatsapp`: Nomor WhatsApp
   - `linkedin`: URL LinkedIn
   - `upwork`: URL Upwork
   - Dan lainnya...

3. **Ganti Password Default**:
   - Edit `DEFAULT_PASSWORD` di `js/config.js`
   - Default: `admin123`

### 2. Upload ke GitHub Pages

```bash
# Buat repository baru di GitHub
# Upload semua file (index.html, css/, js/)
# Aktifkan GitHub Pages di Settings > Pages
# Pilih branch: main, folder: root
```

### 3. Akses Admin Mode

**Cara Login:**
1. Buka website
2. Ketik `adminlogin` di mana saja di halaman
3. Masukkan password
4. Tekan Enter atau klik "Masuk ke Mode Edit"

**Fitur Admin:**
- ✏️ Edit teks langsung (klik teks yang ada garis kuning)
- 📷 Upload gambar (klik area foto)
- 📝 Edit lengkap (buka modal edit)
- 💾 Simpan perubahan
- 🔑 Ganti password

### 4. Edit Konten

**Cara 1: Inline Edit**
- Login sebagai admin
- Klik teks yang ada garis kuning bawah
- Edit langsung di tempat
- Klik "💾 Simpan"

**Cara 2: Full Edit Modal**
- Klik "📝 Edit Lengkap" di toolbar
- Edit semua field di modal
- Klik "Terapkan & Simpan"

**Cara 3: Edit File Config**
- Edit `js/config.js` secara manual
- Upload ulang ke GitHub

## 📝 Catatan Penting

- **Data tersimpan di localStorage browser** - setiap pengunjung punya data terpisah
- **Reset data**: Clear browser cache/localStorage
- **Gambar**: Otomatis dikompresi saat upload (max ~900px width)
- **Password**: Disimpan di localStorage, bukan server

## 🎨 Kustomisasi

### Ganti Warna
Edit variabel CSS di `css/style.css`:
```css
:root {
  --accent:#00e5a0;    /* Warna utama hijau */
  --accent2:#0099ff;   /* Warna sekunder biru */
  --danger:#ff4d6d;    /* Warna merah */
  --warn:#ffb800;      /* Warna kuning/orange */
}
```

### Tambah Project
Edit array `projects` di `js/config.js`:
```javascript
projects: [
  {
    img: "",  // Kosongkan, upload via admin
    tags: ["Tag1", "Tag2"],
    title: "Judul Project",
    desc: "Deskripsi project...",
    tools: "Tool1 · Tool2",
    link: "#"  // URL project
  }
]
```

## 🔒 Keamanan

⚠️ **Peringatan**: Sistem ini menggunakan localStorage, bukan database server.
- Data bisa diakses oleh user yang mengerti DevTools
- Gunakan untuk portfolio pribadi, bukan data sensitif
- Ganti password default segera setelah setup

## 📱 Responsive

Website otomatis responsive untuk:
- Desktop (>900px)
- Tablet (768px - 900px)
- Mobile (<768px)

## 🛠️ Tech Stack

- HTML5 Semantic
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- LocalStorage API
- Canvas API (untuk kompresi gambar)

## 📄 License

Free to use for personal portfolio.
