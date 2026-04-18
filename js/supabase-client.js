// js/supabase-client.js - FIXED VERSION (tanpa folder public)
// GANTI DENGAN DATA DARI SUPABASE DASHBOARD KAMU!
const SUPABASE_URL = 'https://tsgplaxmwasopyukhixu.supabase.co';  // ← GANTI! pastikan "supabase" bukan "subabase"
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZ3BsYXhtd2Fzb3B5dWtoaXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzI5NjQsImV4cCI6MjA5MjEwODk2NH0.nyhBvtAARX6nbFpB8vtqsITVWJZS3OnkSCnPIoQkDTM'; // ← GANTI!

// Buat client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Upload gambar ke Supabase
async function uploadImageToSupabase(file, type, index = null) {
  try {
    if (!file) {
      alert('❌ Tidak ada file');
      return null;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      alert('❌ Ukuran file maksimal 2MB');
      return null;
    }
    
    console.log('Uploading...', { type, index, fileName: file.name });
    
    // Buat nama file unik (langsung di root bucket, tanpa folder)
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    
    // Upload ke Supabase Storage (langsung di root, tanpa folder)
    const { data, error } = await supabaseClient.storage
      .from('portfolio-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      console.error('Storage error:', error);
      throw error;
    }
    
    console.log('Upload success:', data);
    
    // Dapatkan public URL (langsung dari root)
    const { data: { publicUrl } } = supabaseClient.storage
      .from('portfolio-images')
      .getPublicUrl(fileName);
    
    console.log('Public URL:', publicUrl);
    
    // Update tampilan dan simpan ke localStorage
    if (type === 'hero') {
      localStorage.setItem('ptf_img_hero', publicUrl);
      setImg('hero-img', 'hero-ph', publicUrl);
      alert('✅ Foto profil berhasil diupload!');
    } else if (type === 'about') {
      localStorage.setItem('ptf_img_about', publicUrl);
      setImg('about-img', 'about-ph', publicUrl);
      alert('✅ Foto about berhasil diupload!');
    } else if (type === 'proj') {
      localStorage.setItem(`ptf_img_proj_${index}`, publicUrl);
      const cont = document.getElementById(`pimg${index}`);
      if (cont) {
        // Hapus placeholder jika ada
        const placeholder = cont.querySelector('.img-placeholder');
        if (placeholder) placeholder.remove();
        
        // Cek apakah sudah ada img
        let existingImg = cont.querySelector('img');
        if (existingImg) {
          existingImg.src = publicUrl;
          existingImg.style.display = 'block';
        } else {
          const newImg = document.createElement('img');
          newImg.src = publicUrl;
          newImg.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
          cont.insertBefore(newImg, cont.firstChild);
        }
      }
      alert('✅ Foto proyek berhasil diupload!');
    }
    
    return publicUrl;
    
  } catch (error) {
    console.error('Upload error:', error);
    alert('❌ Gagal upload: ' + (error.message || 'Coba lagi nanti'));
    return null;
  }
}

// Load gambar dari Supabase (dari localStorage)
async function loadImagesFromSupabase() {
  try {
    console.log('Loading images from localStorage...');
    
    // Load gambar hero
    const heroUrl = localStorage.getItem('ptf_img_hero');
    if (heroUrl && (heroUrl.includes('supabase') || heroUrl.startsWith('data:'))) {
      setImg('hero-img', 'hero-ph', heroUrl);
      console.log('Hero image loaded');
    }
    
    // Load gambar about
    const aboutUrl = localStorage.getItem('ptf_img_about');
    if (aboutUrl && (aboutUrl.includes('supabase') || aboutUrl.startsWith('data:'))) {
      setImg('about-img', 'about-ph', aboutUrl);
      console.log('About image loaded');
    }
    
    // Load gambar projects
    for (let i = 0; i < 6; i++) {
      const projUrl = localStorage.getItem(`ptf_img_proj_${i}`);
      if (projUrl && (projUrl.includes('supabase') || projUrl.startsWith('data:'))) {
        const cont = document.getElementById(`pimg${i}`);
        if (cont) {
          const placeholder = cont.querySelector('.img-placeholder');
          if (placeholder) placeholder.remove();
          
          let existingImg = cont.querySelector('img');
          if (existingImg) {
            existingImg.src = projUrl;
          } else {
            const newImg = document.createElement('img');
            newImg.src = projUrl;
            newImg.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
            cont.insertBefore(newImg, cont.firstChild);
          }
        }
      }
    }
    
    console.log('All images loaded');
    
  } catch (error) {
    console.error('Load images error:', error);
  }
}

// Export ke global scope
window.uploadImageToSupabase = uploadImageToSupabase;
window.loadImagesFromSupabase = loadImagesFromSupabase;
