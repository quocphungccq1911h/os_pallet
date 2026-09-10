import fs from 'fs/promises';
import path from 'path';
import { ProductionOrder, initialOrders } from '@/data/orders';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'orders.json');

let memoryCache: ProductionOrder[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 2000;

export async function getAllOrders(): Promise<ProductionOrder[]> {
  if (memoryCache && Date.now() - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const data = JSON.parse(fileContent);
    if (Array.isArray(data)) {
      memoryCache = data as ProductionOrder[];
      lastFetchTime = Date.now();
      return memoryCache;
    }
  } catch {
    // fallback
  }

  memoryCache = initialOrders;
  lastFetchTime = Date.now();
  return initialOrders;
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const updatedList = isExisting
    ? current.map((o) => (o.id === candidate.id ? candidate : o))
    : [candidate, ...current];

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
