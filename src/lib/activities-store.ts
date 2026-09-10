import fs from 'fs/promises';
import path from 'path';
import { Activity, initialActivities } from '@/data/activities';
import { supabase } from '@/lib/supabase';
import { slugifyVietnamese } from '@/lib/products-store';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'activities.json');

// Cache RAM cho tốc độ phản hồi 0ms
let memoryCache: Activity[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 3000;

export function clearActivitiesCache() {
  memoryCache = null;
}

/**
 * Đọc dữ liệu từ file local activities.json (dùng khi offline hoặc fallback)
 */
async function getLocalActivities(): Promise<Activity[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const data = JSON.parse(fileContent);
    if (Array.isArray(data) && data.length > 0) {
      return data as Activity[];
    }
  } catch {
    // ignore
  }
  return initialActivities;
}

/**
 * Lưu song song vào file local activities.json để backup
 */
async function syncLocalActivities(activities: Activity[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(activities, null, 2), 'utf-8');
  } catch {
    // Bỏ qua lỗi nếu môi trường read-only
  }
}

/**
 * Lấy toàn bộ danh sách hoạt động xưởng (Supabase + Cache RAM + Fallback)
 */
export async function getAllActivities(): Promise<Activity[]> {
  if (memoryCache && Date.now() - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  try {
    const fetchPromise = supabase
      .from('activities')
      .select('*')
      .order('publishedAt', { ascending: false });

    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase activities query timeout')), 2500)
    );

    const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

    if (!error && Array.isArray(data) && data.length > 0) {
      memoryCache = data.map((item: any) => ({
        ...item,
        createdAt: item.created_at || item.createdAt,
        updatedAt: item.updated_at || item.updatedAt,
      })) as Activity[];
      lastFetchTime = Date.now();
      return memoryCache;
    }
  } catch (err) {
    // Fallback nếu có lỗi hoặc timeout
  }

  const local = await getLocalActivities();
  memoryCache = local;
  lastFetchTime = Date.now();
  return local;
}

/**
 * Lấy chi tiết hoạt động theo ID
 */
export async function getActivityById(id: string): Promise<Activity | undefined> {
  const currentList = await getAllActivities();
  const found = currentList.find((a) => a.id === id);
  if (found) return found;

  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (!error && data) {
      const item: any = data;
      return {
        ...item,
        createdAt: item.created_at || item.createdAt,
        updatedAt: item.updated_at || item.updatedAt,
      } as Activity;
    }
  } catch {
    // ignore
  }

  const local = await getLocalActivities();
  return local.find((a) => a.id === id);
}

/**
 * Lấy chi tiết hoạt động theo Slug
 */
export async function getActivityBySlug(slug: string): Promise<Activity | undefined> {
  const currentList = await getAllActivities();
  const found = currentList.find((a) => a.slug === slug);
  if (found) return found;

  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      const item: any = data;
      return {
        ...item,
        createdAt: item.created_at || item.createdAt,
        updatedAt: item.updated_at || item.updatedAt,
      } as Activity;
    }
  } catch {
    // ignore
  }

  const local = await getLocalActivities();
  return local.find((a) => a.slug === slug);
}

/**
 * Tạo mới hoặc cập nhật bài hoạt động
 */
export async function saveActivity(activityData: Partial<Activity>): Promise<Activity> {
  const currentList = await getAllActivities();
  const isExisting = activityData.id && currentList.some((a) => a.id === activityData.id);

  let candidate: Activity;

  if (isExisting) {
    const existing = currentList.find((a) => a.id === activityData.id) as Activity;
    candidate = {
      ...existing,
      ...activityData,
      id: activityData.id!,
      slug: activityData.slug || slugifyVietnamese(activityData.title || 'hoat-dong'),
      updatedAt: new Date().toISOString(),
    };
  } else {
    const newId = activityData.id || `act-${Date.now()}`;
    const newSlug = activityData.slug || slugifyVietnamese(activityData.title || 'hoat-dong');
    candidate = {
      id: newId,
      slug: newSlug,
      title: activityData.title || 'Hoạt động xưởng mới',
      category: activityData.category || 'ban-giao',
      summary: activityData.summary || '',
      content: activityData.content || '',
      images: activityData.images?.length ? activityData.images : ['/images/pallet_factory_43.jpg'],
      customerLocation: activityData.customerLocation || '',
      clientType: activityData.clientType || '',
      publishedAt: activityData.publishedAt || new Date().toISOString().split('T')[0],
      badges: activityData.badges || [],
      highlights: activityData.highlights || [],
      fbUrl: activityData.fbUrl || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // 1. Lưu lên Supabase
  try {
    const { createdAt, updatedAt, ...cleanData } = candidate;
    await supabase.from('activities').upsert({
      ...cleanData,
      created_at: createdAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Supabase upsert activity warning:', err);
  }

  // 2. Cập nhật local file
  const updatedList = isExisting
    ? currentList.map((a) => (a.id === candidate.id ? candidate : a))
    : [candidate, ...currentList];

  await syncLocalActivities(updatedList);
  memoryCache = updatedList;
  lastFetchTime = Date.now();

  return candidate;
}

/**
 * Xóa hoạt động
 */
export async function deleteActivity(id: string): Promise<boolean> {
  try {
    await supabase.from('activities').delete().eq('id', id);
  } catch {
    // Supabase fallback
  }

  const currentList = await getAllActivities();
  const updatedList = currentList.filter((a) => a.id !== id);

  await syncLocalActivities(updatedList);
  memoryCache = updatedList;
  lastFetchTime = Date.now();

  return true;
}
