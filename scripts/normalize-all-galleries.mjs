import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const supabaseUrl = 'https://rjjzuojpbtabzmqlxizx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqanp1b2pwYnRhYnptcWx4aXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5ODgxNjEsImV4cCI6MjEwNDU2NDE2MX0.EojgzaFGZ_ECmAYoqaLqyNPIfYj0H5l2HJskFcdN6gs';

const supabase = createClient(supabaseUrl, supabaseKey);
const BANNER_IMAGE = '/images/banner_main.png';

async function run() {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const products = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`Đang chuẩn hóa gallery cho ${products.length} sản phẩm...`);

  const updatedProducts = products.map(p => {
    const existingGallery = p.gallery && p.gallery.length > 0 ? p.gallery : (p.imageUrl ? [p.imageUrl] : []);
    const nonBanner = existingGallery.filter(img => img && !img.endsWith('banner_main.png'));
    const normalizedGallery = [...nonBanner, BANNER_IMAGE];
    const mainImg = (p.imageUrl && !p.imageUrl.endsWith('banner_main.png'))
      ? p.imageUrl
      : (nonBanner[0] || BANNER_IMAGE);

    return {
      ...p,
      imageUrl: mainImg,
      gallery: normalizedGallery,
    };
  });

  // 1. Cập nhật file JSON local
  fs.writeFileSync(jsonPath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
  console.log('✓ Đã cập nhật file src/data/products.json');

  // 2. Cập nhật Supabase
  for (const p of updatedProducts) {
    const { error } = await supabase
      .from('products')
      .upsert({
        ...p,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) {
      console.error(`Lỗi update ${p.id}:`, error.message);
    } else {
      console.log(`✓ Supabase updated: ${p.id} - ${p.name} (Gallery: ${p.gallery.length} ảnh, ảnh cuối: ${p.gallery[p.gallery.length - 1]})`);
    }
  }

  console.log('Hoàn tất chuẩn hóa banner ở cuối gallery!');
}

run();
