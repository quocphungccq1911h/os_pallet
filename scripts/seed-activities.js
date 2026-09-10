// Script đồng bộ hoạt động từ activities.json lên Supabase
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Đọc biến môi trường từ .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length > 0 && !process.env[key]) {
        process.env[key] = vals.join('=');
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Thiếu thông tin NEXT_PUBLIC_SUPABASE_URL hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Đang kiểm tra kết nối bảng activities trên Supabase...');
  
  const activitiesPath = path.join(__dirname, '..', 'src', 'data', 'activities.json');
  const activities = JSON.parse(fs.readFileSync(activitiesPath, 'utf8'));

  console.log(`Tìm thấy ${activities.length} bài hoạt động trong activities.json`);

  for (const act of activities) {
    console.log(`Đang đẩy bài: ${act.title}...`);
    const { createdAt, updatedAt, ...cleanAct } = act;
    const { data, error } = await supabase
      .from('activities')
      .upsert({
        ...cleanAct,
        created_at: createdAt || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Lỗi khi lưu bài ${act.id}:`, error);
    } else {
      console.log(`✅ Đã đồng bộ thành công bài ${act.id} lên Supabase!`);
    }
  }

  // Đọc lại để kiểm tra
  const { data: list, error: listError } = await supabase
    .from('activities')
    .select('*');

  if (listError) {
    console.error('Lỗi khi đọc lại danh sách activities:', listError);
  } else {
    console.log(`🎉 Tổng số hoạt động hiện có trên Supabase: ${list.length}`);
  }
}

seed().catch(console.error);
