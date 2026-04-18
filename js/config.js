/* ════════════════════════════════════════════
   KONFIGURASI DEFAULT
   Edit ini untuk pertama kali setup
════════════════════════════════════════════ */

const DEFAULT_CONFIG = {
  name:       "Nama Kamu",
  tagline:    "Data Entry & Analysis Specialist",
  heroDesc:   "Saya spesialis entri data, pembersihan data, dan pelaporan yang akurat. Membantu bisnis mengubah data mentah menjadi laporan yang rapi, terstruktur, dan siap pakai.",
  email:      "email@kamu.com",
  whatsapp:   "+62 8xx-xxxx-xxxx",
  linkedin:   "https://linkedin.com/in/profilkamu",
  upwork:     "https://www.upwork.com/freelancers/~profilkamu",
  cvLink:     "#",
  bio:        "Saya adalah freelancer yang berfokus pada pekerjaan berbasis data: entri data, pembersihan spreadsheet, pemformatan laporan, scraping web, dan pembuatan dashboard Excel. Saya sangat detail-oriented dan terbiasa bekerja dengan deadline ketat.",
  stats: [
    { num:"50+",  label:"Proyek Selesai"   },
    { num:"99%",  label:"Akurasi Data"     },
    { num:"3+",   label:"Tahun Pengalaman" },
    { num:"100%", label:"On-Time Delivery" },
  ],
  aboutDetails: [
    { label:"Lokasi",   val:"Aceh, Indonesia"               },
    { label:"Tersedia", val:"Full-time / Part-time freelance"},
    { label:"Bahasa",   val:"Indonesia, English (basic)"    },
    { label:"Respon",   val:"< 24 jam"                      },
  ],
  skills: [
    { icon:"📥", name:"Data Entry",               desc:"Entri data cepat dan akurat ke spreadsheet, database, atau form online dengan error rate minimal." },
    { icon:"🧹", name:"Data Cleaning",             desc:"Membersihkan duplikasi, format salah, data kosong, dan outlier agar dataset siap dianalisis." },
    { icon:"📊", name:"Excel Reports & Dashboard", desc:"Membangun laporan, pivot table, dan dashboard interaktif dengan formula dan chart yang jelas." },
    { icon:"📄", name:"Report Formatting",         desc:"Memformat laporan Word/Excel/PDF agar tampak profesional, konsisten, dan mudah dibaca." },
    { icon:"🗂️", name:"Catalog Formatting",        desc:"Menyusun dan memformat katalog produk dengan struktur yang seragam untuk e-commerce atau cetak." },
    { icon:"🕷️", name:"Web Scraping",              desc:"Mengumpulkan data dari website menggunakan Python/manual untuk riset atau analisis pasar." },
    { icon:"📈", name:"Data Analysis",             desc:"Analisis deskriptif dan tren dasar menggunakan Excel/Sheets untuk insight bisnis." },
    { icon:"🔍", name:"Data Verification",         desc:"Verifikasi dan validasi data untuk memastikan konsistensi, kelengkapan, dan keakuratan." },
  ],
  tools: ["Microsoft Excel","Google Sheets","Microsoft Word","Google Docs","Power Query","Pivot Table","Python (BeautifulSoup)","Pandas","Canva","Notion","Airtable","Google Forms","SQL (basic)","PDF Tools"],
  projects: [
    { img:"", tags:["Data Cleaning","Excel"],    title:"Pembersihan Database Pelanggan",  desc:"Membersihkan 10.000+ baris data pelanggan: menghapus duplikasi, memperbaiki format nama/nomor telepon. Mengurangi error 87%.", tools:"Excel · Power Query",     link:"#" },
    { img:"", tags:["Dashboard","Excel"],        title:"Dashboard Penjualan Bulanan",     desc:"Membangun dashboard Excel interaktif dengan pivot chart, slicer, dan KPI summary untuk laporan penjualan tim marketing.",        tools:"Excel · Pivot Table",    link:"#" },
    { img:"", tags:["Web Scraping","Python"],    title:"Scraping Data Produk E-commerce", desc:"Mengumpulkan 5.000+ data produk dari marketplace menggunakan Python. Data diekspor ke Excel bersih dan terstruktur.",           tools:"Python · BeautifulSoup", link:"#" },
    { img:"", tags:["Catalog","Formatting"],     title:"Format Katalog Produk",           desc:"Memformat katalog 1.200+ SKU produk untuk upload e-commerce. Standarisasi nama, deskripsi, satuan, dan kategori.",              tools:"Excel · Google Sheets",  link:"#" },
    { img:"", tags:["Report","Word"],            title:"Pemformatan Laporan Tahunan",     desc:"Memformat laporan tahunan 80 halaman: heading konsisten, daftar isi otomatis, nomor halaman, tabel rapi, siap cetak.",           tools:"Microsoft Word · PDF",   link:"#" },
    { img:"", tags:["Data Entry","Excel"],       title:"Entri Data Survey",               desc:"Entri 3.000+ respons kuesioner dari form fisik ke Google Sheets dengan validasi real-time dan ringkasan statistik.",              tools:"Google Sheets · Forms",  link:"#" },
  ],
};

// PASSWORD DEFAULT — GANTI SETELAH LOGIN PERTAMA KALI
const DEFAULT_PASSWORD = "admin123";

// Storage keys
const STORAGE_KEYS = {
  data: 'ptf_data', 
  pw: 'ptf_pw', 
  imgHero: 'ptf_img_hero', 
  imgAbout: 'ptf_img_about', 
  imgProj: 'ptf_img_proj_'
};

// Export untuk module (jika menggunakan ES6 modules)
// export { DEFAULT_CONFIG, DEFAULT_PASSWORD, STORAGE_KEYS };
