// js/supabase-client.js
// GANTI DENGAN DATA DARI SUPABASE DASHBOARD KAMU!
const SUPABASE_URL = 'https://zxcucuxsjahumskogxsv.supabase.co';  // ← GANTI INI
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Y3VjdXhzamFodW1za29neHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzEyNTksImV4cCI6MjA5MjEwNzI1OX0.sZhTkwiX3WLzKsL4kdXuBcO1bZ1e9f4kLIV6xfBzGvw'; // ← GANTI INI

// Inisialisasi Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Upload gambar ke Supabase
async function uploadImageToSupabase(file, type, index = null) {
  try {
    // Tampilkan loading
    const overlay = document.querySelector('.img-upload-overlay');
    if (overlay) {
      overlay.innerHTML = '<div class="uo-icon">⏳</div><div class="uo-text">Uploading...</div>';
    }
    
    // Buat nama file unik
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `public/${fileName}`;
    
    // Upload ke Supabase Storage
    const { data, error } = await supabaseClient.storage
      .from('portfolio-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    // Dapatkan public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);
    
    // Simpan URL ke database
    await saveImageToDatabase(type, publicUrl, index);
    
    // Update tampilan
    if (type === 'hero') {
      setImg('hero-img', 'hero-ph', publicUrl);
    } else if (type === 'about') {
      setImg('about-img', 'about-ph', publicUrl);
    } else if (type === 'proj') {
      const cont = document.getElementById('pimg' + index);
      if (cont) {
        let existing = cont.querySelector('img');
        if (existing) {
          existing.src = publicUrl;
        } else {
          const ph = cont.querySelector('.img-placeholder');
          if (ph) ph.remove();
          const ni = document.createElement('img');
          ni.src = publicUrl;
          ni.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
          cont.insertBefore(ni, cont.firstChild);
        }
      }
    }
    
    alert('✅ Foto berhasil diupload! Semua orang bisa melihatnya.');
    return publicUrl;
    
  } catch (error) {
    console.error('Upload error:', error);
    alert('❌ Gagal upload: ' + error.message);
    return null;
  } finally {
    // Reset overlay
    const overlay = document.querySelector('.img-upload-overlay');
    if (overlay) {
      overlay.innerHTML = '<div class="uo-icon">📷</div><div class="uo-text">Klik untuk<br>upload foto</div>';
    }
  }
}

// Simpan URL ke database
async function saveImageToDatabase(type, url, index) {
  const { data, error } = await supabaseClient
    .from('images')
    .upsert({
      type: type,
      index: index,
      url: url,
      updated_at: new Date().toISOString()
    }, { onConflict: 'type, index' });
  
  if (error) console.error('Database error:', error);
}

// Load semua gambar dari Supabase
async function loadImagesFromSupabase() {
  try {
    const { data, error } = await supabaseClient
      .from('images')
      .select('*');
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      data.forEach(record => {
        if (record.type === 'hero') {
          setImg('hero-img', 'hero-ph', record.url);
        } else if (record.type === 'about') {
          setImg('about-img', 'about-ph', record.url);
        } else if (record.type === 'proj' && record.index !== null) {
          const cont = document.getElementById(`pimg${record.index}`);
          if (cont) {
            let existing = cont.querySelector('img');
            if (existing) {
              existing.src = record.url;
            } else {
              const ph = cont.querySelector('.img-placeholder');
              if (ph) ph.remove();
              const ni = document.createElement('img');
              ni.src = record.url;
              ni.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
              cont.insertBefore(ni, cont.firstChild);
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Load images error:', error);
  }
}

// Export ke global scope
window.uploadImageToSupabase = uploadImageToSupabase;
window.loadImagesFromSupabase = loadImagesFromSupabase;
