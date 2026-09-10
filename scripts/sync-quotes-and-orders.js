// Script đồng bộ quotes và orders từ JSON lên Supabase Cloud Database
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const supabaseUrl = 'https://rjjzuojpbtabzmqlxizx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqanp1b2pwYnRhYnptcWx4aXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5ODgxNjEsImV4cCI6MjEwNDU2NDE2MX0.EojgzaFGZ_ECmAYoqaLqyNPIfYj0H5l2HJskFcdN6gs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('--- 1. Đồng bộ bảng QUOTES (Báo giá khách hàng) ---');
  const quotesPath = path.join(process.cwd(), 'src', 'data', 'quotes.json');
  if (fs.existsSync(quotesPath)) {
    const quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));
    console.log(`Tìm thấy ${quotes.length} báo giá trong quotes.json`);

    for (const q of quotes) {
      const { createdAt, updatedAt, ...cleanQ } = q;
      const { error } = await supabase
        .from('quotes')
        .upsert({
          ...cleanQ,
          created_at: createdAt || new Date().toISOString(),
          updated_at: updatedAt || new Date().toISOString(),
        }, { onConflict: 'id' });

      if (error) {
        console.error(`❌ Lỗi lưu quote ${q.id}:`, error.message);
      } else {
        console.log(`✓ Đã lưu quote: ${q.id} - ${q.customerName} (${q.phone})`);
      }
    }
  }

  console.log('\n--- 2. Đồng bộ bảng ORDERS (Đơn hàng sản xuất) ---');
  const ordersPath = path.join(process.cwd(), 'src', 'data', 'orders.json');
  if (fs.existsSync(ordersPath)) {
    const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
    console.log(`Tìm thấy ${orders.length} đơn hàng trong orders.json`);

    for (const ord of orders) {
      const { createdAt, updatedAt, ...cleanOrd } = ord;
      const { error } = await supabase
        .from('orders')
        .upsert({
          ...cleanOrd,
          created_at: createdAt || new Date().toISOString(),
          updated_at: updatedAt || new Date().toISOString(),
        }, { onConflict: 'id' });

      if (error) {
        console.error(`❌ Lỗi lưu order ${ord.id}:`, error.message);
      } else {
        console.log(`✓ Đã lưu order: ${ord.orderCode} - ${ord.customer}`);
      }
    }
  }

  console.log('\n--- 3. Kiểm tra lại dữ liệu trên Supabase ---');
  const { data: qData } = await supabase.from('quotes').select('id, customerName, phone, status');
  console.log(`🎉 Tổng số báo giá trên Supabase: ${qData?.length || 0}`);
  if (qData) {
    qData.forEach(q => console.log(`   - [${q.status}] ${q.customerName} - ${q.phone}`));
  }

  const { data: oData } = await supabase.from('orders').select('id, orderCode, customer, status');
  console.log(`🎉 Tổng số đơn hàng trên Supabase: ${oData?.length || 0}`);
  if (oData) {
    oData.forEach(o => console.log(`   - [${o.status}] ${o.orderCode} - ${o.customer}`));
  }
}

run();
