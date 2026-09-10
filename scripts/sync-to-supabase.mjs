import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://rjjzuojpbtabzmqlxizx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqanp1b2pwYnRhYnptcWx4aXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5ODgxNjEsImV4cCI6MjEwNDU2NDE2MX0.EojgzaFGZ_ECmAYoqaLqyNPIfYj0H5l2HJskFcdN6gs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function sync() {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const products = JSON.parse(raw);

  console.log(`Đang đồng bộ ${products.length} sản phẩm lên Supabase...`);

  for (const p of products) {
    const { data, error } = await supabase
      .from('products')
      .upsert({
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.category,
        categorySlug: p.categorySlug,
        dimensions: p.dimensions,
        woodType: p.woodType,
        materialGroup: p.materialGroup,
        targetMarket: p.targetMarket,
        staticLoad: p.staticLoad,
        dynamicLoad: p.dynamicLoad,
        specification: p.specification,
        isExportStandard: p.isExportStandard,
        isNew: p.isNew,
        priceDisplay: p.priceDisplay,
        description: p.description,
        highlights: p.highlights,
        imageUrl: p.imageUrl,
        gallery: p.gallery,
        usagePurpose: p.usagePurpose,
        badges: p.badges,
        facebookProof: p.facebookProof,
      }, { onConflict: 'id' });

    if (error) {
      console.error(`Lỗi khi sync sản phẩm ${p.id} (${p.name}):`, error.message);
    } else {
      console.log(`✓ Đã sync thành công: ${p.id} - ${p.name}`);
    }
  }

  console.log('Hoàn tất kiểm tra đồng bộ.');
}

sync();
