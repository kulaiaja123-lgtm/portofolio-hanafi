// js/supabase-client.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// GANTI dengan data dari dashboard Supabase kamu!
const SUPABASE_URL = 'https://jilnzwviowxfccicgthr.supabase.co';  // ← ganti ini
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbG56d3Zpb3d4ZmNjaWNndGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDA0OTUsImV4cCI6MjA5MjExNjQ5NX0.n2BrR9No4Efjie7qK7I_cdtP1jQSnZJbsMlLe37nE-4
'; // ← ganti ini

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Upload gambar ke Supabase
async function uploadImageToSupabase(file, type, index = null) {
  try {
    // Buat nama file unik
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `public/${fileName}`;
    
    // Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    // Dapatkan public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);
    
    // Simpan URL ke localStorage juga sebagai cache
    if (type === 'hero') {
      localStorage.setItem(STORAGE_KEYS.imgHero, publicUrl);
      localStorage.setItem('supabase_hero', publicUrl);
    } else if (type === 'about') {
      localStorage.setItem(STORAGE_KEYS.imgAbout, publicUrl);
      localStorage.setItem('supabase_about', publicUrl);
    } else if (type === 'proj') {
      localStorage.setItem(STORAGE_KEYS.imgProj + index, publicUrl);
      localStorage.setItem(`supabase_proj_${index}`, publicUrl);
    }
    
    // Simpan daftar file yang sudah diupload ke Supabase (opsional)
    await saveImageRecord(type, publicUrl, index);
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading:', error);
    alert('Gagal upload: ' + error.message);
    return null;
  }
}

// Simpan record gambar ke database Supabase
async function saveImageRecord(type, url, index) {
  const { data, error } = await supabase
    .from('images')
    .upsert({
      type: type,
      index: index,
      url: url,
      updated_at: new Date().toISOString()
    });
  
  if (error) console.error('Error saving record:', error);
}

// Load semua gambar dari Supabase
async function loadImagesFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('images')
      .select('*');
    
    if (error) throw error;
    
    if (data) {
      data.forEach(record => {
        if (record.type === 'hero') {
          setImg('hero-img', 'hero-ph', record.url);
        } else if (record.type === 'about') {
          setImg('about-img', 'about-ph', record.url);
        } else if (record.type === 'proj' && record.index !== null) {
          // Update gambar proyek
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
    console.error('Error loading images:', error);
  }
}

// Export functions
window.uploadImageToSupabase = uploadImageToSupabase;
window.loadImagesFromSupabase = loadImagesFromSupabase;
