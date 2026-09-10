import fs from 'fs/promises';
import path from 'path';
import { CustomerQuote, initialQuotes } from '@/data/quotes';
import { supabase } from '@/lib/supabase';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'quotes.json');

let memoryCache: CustomerQuote[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 2000;

export function clearQuotesCache() {
  memoryCache = null;
}

function normalizeDbQuote(dbItem: any): CustomerQuote {
  return {
    id: dbItem.id,
    customerName: dbItem.customerName || 'Khách Hàng',
    phone: dbItem.phone || '',
    email: dbItem.email || '',
    productTitle: dbItem.productTitle || 'Yêu cầu tư vấn chung',
    dimensions: dbItem.dimensions || '',
    quantity: dbItem.quantity || '100',
    note: dbItem.note || '',
    status: dbItem.status || 'moi',
    estimatedPrice: dbItem.estimatedPrice || 'Liên hệ',
    createdAt: dbItem.created_at || dbItem.createdAt || new Date().toISOString(),
    updatedAt: dbItem.updated_at || dbItem.updatedAt || new Date().toISOString(),
  };
}

async function getLocalQuotes(): Promise<CustomerQuote[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const data = JSON.parse(fileContent);
    if (Array.isArray(data)) {
      return data as CustomerQuote[];
    }
  } catch {
    // fallback
  }
  return initialQuotes;
}

export async function getAllQuotes(): Promise<CustomerQuote[]> {
  if (memoryCache && Date.now() - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  try {
    const fetchPromise = supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase quotes timeout')), 2500)
    );

    const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

    if (!error && Array.isArray(data) && data.length > 0) {
      memoryCache = data.map(normalizeDbQuote);
      lastFetchTime = Date.now();
      return memoryCache;
    }
  } catch (err) {
    console.warn('Supabase getAllQuotes fallback:', err);
  }

  const local = await getLocalQuotes();
  memoryCache = local;
  lastFetchTime = Date.now();
  return local;
}

export async function saveQuote(quoteData: Partial<CustomerQuote>): Promise<CustomerQuote> {
  const current = await getAllQuotes();
  const isExisting = quoteData.id && current.some((q) => q.id === quoteData.id);

  let candidate: CustomerQuote;

  if (isExisting) {
    const existing = current.find((q) => q.id === quoteData.id)!;
    candidate = {
      ...existing,
      ...quoteData,
      updatedAt: new Date().toISOString(),
    };
  } else {
    candidate = {
      id: quoteData.id || `quote-${Date.now()}`,
      customerName: quoteData.customerName || 'Khách Hàng',
      phone: quoteData.phone || '',
      email: quoteData.email || '',
      productTitle: quoteData.productTitle || 'Yêu cầu tư vấn chung',
      dimensions: quoteData.dimensions || '',
      quantity: quoteData.quantity || '100',
      note: quoteData.note || '',
      status: quoteData.status || 'moi',
      estimatedPrice: quoteData.estimatedPrice || 'Liên hệ',
      createdAt: quoteData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // 1. Lưu lên Supabase
  try {
    const { error } = await supabase.from('quotes').upsert({
      id: candidate.id,
      customerName: candidate.customerName,
      phone: candidate.phone,
      email: candidate.email,
      productTitle: candidate.productTitle,
      dimensions: candidate.dimensions,
      quantity: candidate.quantity,
      note: candidate.note,
      status: candidate.status,
      estimatedPrice: candidate.estimatedPrice,
      created_at: candidate.createdAt,
      updated_at: candidate.updatedAt,
    }, { onConflict: 'id' });

    if (error) {
      console.warn('Lỗi upsert Supabase quote:', error.message);
    }
  } catch (err) {
    console.warn('Supabase saveQuote error:', err);
  }

  // 2. Lưu vào local JSON file (phục vụ local dev)
  const updatedList = isExisting
    ? current.map((q) => (q.id === candidate.id ? candidate : q))
    : [candidate, ...current.filter((q) => q.id !== candidate.id)];

  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedList, null, 2), 'utf-8');
  } catch {
    // ignore
  }

  memoryCache = updatedList;
  lastFetchTime = Date.now();
  return candidate;
}

export async function deleteQuote(id: string): Promise<boolean> {
  // 1. Xóa trên Supabase
  try {
    const { error } = await supabase.from('quotes').delete().eq('id', id);
    if (error) {
      console.warn('Lỗi delete Supabase quote:', error.message);
    }
  } catch (err) {
    console.warn('Supabase deleteQuote error:', err);
  }

  // 2. Xóa trên local file
  const current = await getAllQuotes();
  const updatedList = current.filter((q) => q.id !== id);

  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedList, null, 2), 'utf-8');
  } catch {
    // ignore
  }

  memoryCache = updatedList;
  lastFetchTime = Date.now();
  return true;
}
