import fs from 'fs/promises';
import path from 'path';
import { ProductionOrder, initialOrders } from '@/data/orders';
import { supabase } from '@/lib/supabase';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'orders.json');

let memoryCache: ProductionOrder[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 2000;

export function clearOrdersCache() {
  memoryCache = null;
}

function normalizeDbOrder(dbItem: any): ProductionOrder {
  return {
    id: dbItem.id,
    orderCode: dbItem.orderCode || `TA-${String(Date.now()).slice(-4)}`,
    customer: dbItem.customer || 'Khách hàng',
    phone: dbItem.phone || '',
    productName: dbItem.productName || 'Pallet đóng theo yêu cầu',
    dimensions: dbItem.dimensions || '',
    quantity: Number(dbItem.quantity) || 0,
    woodType: dbItem.woodType || 'Gỗ tự nhiên',
    isExportISPM: Boolean(dbItem.isExportISPM),
    deadline: dbItem.deadline || '',
    totalAmount: dbItem.totalAmount || 'Liên hệ',
    status: dbItem.status || 'cho_duyet',
    progressPercent: Number(dbItem.progressPercent) || 0,
    notes: dbItem.notes || '',
    createdAt: dbItem.created_at || dbItem.createdAt || new Date().toISOString(),
    updatedAt: dbItem.updated_at || dbItem.updatedAt || new Date().toISOString(),
  };
}

async function getLocalOrders(): Promise<ProductionOrder[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const data = JSON.parse(fileContent);
    if (Array.isArray(data)) {
      return data as ProductionOrder[];
    }
  } catch {
    // fallback
  }
  return initialOrders;
}

export async function getAllOrders(): Promise<ProductionOrder[]> {
  if (memoryCache && Date.now() - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  try {
    const fetchPromise = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase orders timeout')), 2500)
    );

    const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

    if (!error && Array.isArray(data) && data.length > 0) {
      memoryCache = data.map(normalizeDbOrder);
      lastFetchTime = Date.now();
      return memoryCache;
    }
  } catch (err) {
    console.warn('Supabase getAllOrders fallback:', err);
  }

  const local = await getLocalOrders();
  memoryCache = local;
  lastFetchTime = Date.now();
  return local;
}

export async function saveOrder(orderData: Partial<ProductionOrder>): Promise<ProductionOrder> {
  const current = await getAllOrders();
  const isExisting = orderData.id && current.some((o) => o.id === orderData.id);

  let candidate: ProductionOrder;

  if (isExisting) {
    const existing = current.find((o) => o.id === orderData.id)!;
    candidate = {
      ...existing,
      ...orderData,
      updatedAt: new Date().toISOString(),
    };
  } else {
    candidate = {
      id: orderData.id || `ord-${Date.now()}`,
      orderCode: orderData.orderCode || `TA-${new Date().toISOString().slice(2, 7).replace('-', '')}-${String(current.length + 1).padStart(2, '0')}`,
      customer: orderData.customer || 'Khách hàng mới',
      phone: orderData.phone || '',
      productName: orderData.productName || 'Pallet đóng theo yêu cầu',
      dimensions: orderData.dimensions || '1200 x 1000 x 140 mm',
      quantity: orderData.quantity || 100,
      woodType: orderData.woodType || 'Gỗ Tràm tự nhiên',
      isExportISPM: orderData.isExportISPM ?? false,
      deadline: orderData.deadline || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      totalAmount: orderData.totalAmount || 'Liên hệ',
      status: orderData.status || 'cho_duyet',
      progressPercent: orderData.progressPercent ?? 10,
      notes: orderData.notes || '',
      createdAt: orderData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // 1. Lưu lên Supabase
  try {
    const { error } = await supabase.from('orders').upsert({
      id: candidate.id,
      orderCode: candidate.orderCode,
      customer: candidate.customer,
      phone: candidate.phone,
      productName: candidate.productName,
      dimensions: candidate.dimensions,
      quantity: candidate.quantity,
      woodType: candidate.woodType,
      isExportISPM: candidate.isExportISPM,
      deadline: candidate.deadline,
      totalAmount: candidate.totalAmount,
      status: candidate.status,
      progressPercent: candidate.progressPercent,
      notes: candidate.notes,
      created_at: candidate.createdAt,
      updated_at: candidate.updatedAt,
    }, { onConflict: 'id' });

    if (error) {
      console.warn('Lỗi upsert Supabase order:', error.message);
    }
  } catch (err) {
    console.warn('Supabase saveOrder error:', err);
  }

  // 2. Lưu vào local JSON
  const updatedList = isExisting
    ? current.map((o) => (o.id === candidate.id ? candidate : o))
    : [candidate, ...current.filter((o) => o.id !== candidate.id)];

  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedList, null, 2), 'utf-8');
  } catch {
    // ignore
  }

  memoryCache = updatedList;
  lastFetchTime = Date.now();
  return candidate;
}

export async function deleteOrder(id: string): Promise<boolean> {
  // 1. Xóa trên Supabase
  try {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) {
      console.warn('Lỗi delete Supabase order:', error.message);
    }
  } catch (err) {
    console.warn('Supabase deleteOrder error:', err);
  }

  // 2. Xóa trên local file
  const current = await getAllOrders();
  const updatedList = current.filter((o) => o.id !== id);

  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedList, null, 2), 'utf-8');
  } catch {
    // ignore
  }

  memoryCache = updatedList;
  lastFetchTime = Date.now();
  return true;
}
