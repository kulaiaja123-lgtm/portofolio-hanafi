// js/supabase-client.js - SIMPLIFIED WORKING VERSION
// GANTI DENGAN DATA DARI SUPABASE DASHBOARD KAMU!
const SUPABASE_URL = 'https://zxcucuxsjahumskogxsv.supabase.co';  // ← GANTI! pastikan ada "supabase" bukan "subabase"
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Y3VjdXhzamFodW1za29neHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzEyNTksImV4cCI6MjA5MjEwNzI1OX0.sZhTkwiX3WLzKsL4kdXuBcO1bZ1e9f4kLIV6xfBzGvw'; // ← GANTI! copy dari dashboard

// Buat client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Upload gambar
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
    
    console.log('Starting upload...', { type, index, fileName: file.name });
    
    // Buat nama file unik
    const fileName = `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${file.name.split('.').pop()}`;
    
    // Upload ke Supabase Storage
    const { data, error } = await supabaseClient.storage
      .from('portfolio-images')
      .upload(`public/${fileName}`, file);
    
    if (error) {
      console.error('Storage error:', error);
      throw error;
    }
    
    console.log('Upload success:', data);
    
    // Dapatkan public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('portfolio-images')
      .getPublicUrl(`public/${fileName}`);
    
    console.log('Public URL:', publicUrl);
    
    // Update tampilan
    if (type === 'hero') {
      localStorage.setItem('ptf_img_hero', publicUrl);
      setImg('hero-img', 'hero-ph', publicUrl);
    } else if (type === 'about') {
      localStorage.setItem('ptf_img_about', publicUrl);
      setImg('about-img', 'about-ph', publicUrl);
    } else if (type === 'proj') {
      localStorage.setItem(`ptf_img_proj_${index}`, publicUrl);
      const cont = document.getElementById(`pimg${index}`);
      if (cont) {
        const existingImg = cont.querySelector('img');
        if (existingImg) {
          existingImg.src = publicUrl;
        } else {
          const placeholder = cont.querySelector('.img-placeholder');
          if (placeholder) placeholder.remove();
          const newImg = document.createElement('img');
          newImg.src = publicUrl;
          newImg.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
          cont.insertBefore(newImg, cont.firstChild);
        }
      }
    }
    
    alert('✅ Foto berhasil diupload!');
    return publicUrl;
    
  } catch (error) {
    console.error('Upload error:', error);
    alert('❌ Gagal upload: ' + error.message);
    return null;
  }
}

// Load gambar dari Supabase
async function loadImagesFromSupabase() {
  try {
    console.log('Testing connection to Supabase...');
    
    // Test connection dulu
    const { data: testData, error: testError } = await supabaseClient.storage
      .from('portfolio-images')
      .list('public');
    
    if (testError) {
      console.error('Connection test failed:', testError);
      return;
    }
    
    console.log('Connection OK!');
    
    // Load gambar untuk hero
    const heroUrl = localStorage.getItem('ptf_img_hero');
    if (heroUrl && heroUrl.includes('supabase')) {
      setImg('hero-img', 'hero-ph', heroUrl);
    }
    
    // Load gambar untuk about
    const aboutUrl = localStorage.getItem('ptf_img_about');
    if (aboutUrl && aboutUrl.includes('supabase')) {
      setImg('about-img', 'about-ph', aboutUrl);
    }
    
    // Load gambar untuk projects
    for (let i = 0; i < 6; i++) {
      const projUrl = localStorage.getItem(`ptf_img_proj_${i}`);
      if (projUrl && projUrl.includes('supabase')) {
        const cont = document.getElementById(`pimg${i}`);
        if (cont) {
          const existingImg = cont.querySelector('img');
          if (existingImg) {
            existingImg.src = projUrl;
          } else {
            const placeholder = cont.querySelector('.img-placeholder');
            if (placeholder) placeholder.remove();
            const newImg = document.createElement('img');
            newImg.src = projUrl;
            newImg.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
            cont.insertBefore(newImg, cont.firstChild);
          }
        }
      }
    }
    
  } catch (error) {
    console.error('Load error:', error);
  }
}

// Export
window.uploadImageToSupabase = uploadImageToSupabase;
window.loadImagesFromSupabase = loadImagesFromSupabase;
