import fs from 'fs/promises';
import path from 'path';
import { CustomerQuote, initialQuotes } from '@/data/quotes';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'quotes.json');

let memoryCache: CustomerQuote[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 2000;

export async function getAllQuotes(): Promise<CustomerQuote[]> {
  if (memoryCache && Date.now() - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const data = JSON.parse(fileContent);
    if (Array.isArray(data)) {
      memoryCache = data as CustomerQuote[];
      lastFetchTime = Date.now();
      return memoryCache;
    }
  } catch {
    // fallback
  }

  memoryCache = initialQuotes;
  lastFetchTime = Date.now();
  return initialQuotes;
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const updatedList = isExisting
    ? current.map((q) => (q.id === candidate.id ? candidate : q))
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

export async function deleteQuote(id: string): Promise<boolean> {
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
