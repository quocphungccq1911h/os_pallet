import fs from 'fs/promises';
import path from 'path';
import { Product, products as initialProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'products.json');
export const DEFAULT_BANNER = '/images/banner_main.png';

// Bộ nhớ cache RAM nhanh (0ms cho các lượt xem liên tiếp)
let memoryCache: Product[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 3000;

export function clearProductsCache() {
  memoryCache = null;
}

/**
 * Chuẩn hóa sản phẩm: Luôn đảm bảo banner_main.png nằm ở vị trí cuối cùng trong gallery
 */
export function normalizeProduct(p: Product): Product {
  const existingGallery = p.gallery && p.gallery.length > 0 ? p.gallery : (p.imageUrl ? [p.imageUrl] : []);
  const nonBanner = existingGallery.filter((img) => img && !img.endsWith('banner_main.png'));
  
  // Đặt DEFAULT_BANNER ở vị trí cuối cùng
  const normalizedGallery = [...nonBanner, DEFAULT_BANNER];

  // Ảnh đại diện chính là ảnh đầu tiên không phải banner (nếu có), hoặc lấy ảnh đã chọn
  const mainImage = (p.imageUrl && !p.imageUrl.endsWith('banner_main.png'))
    ? p.imageUrl
    : (nonBanner[0] || DEFAULT_BANNER);

  return {
    ...p,
    imageUrl: mainImage,
    gallery: normalizedGallery,
  };
}

/**
 * Chuyển đổi chuỗi tiếng Việt có dấu thành URL slug chuẩn SEO
 */
export function slugifyVietnamese(str: string): string {
  if (!str) return '';
  let slug = str.toLowerCase();

  // Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');

  // Xóa các ký tự đặc biệt
  slug = slug.replace(/[^a-z0-9\s-]/g, '');
  // Đổi khoảng trắng thành dấu gạch ngang
  slug = slug.trim().replace(/\s+/g, '-');
  // Xóa nhiều dấu gạch ngang liên tiếp
  slug = slug.replace(/-+/g, '-');

  return slug;
}

/**
 * Helper: Đọc dữ liệu từ file local products.json (dùng khi offline hoặc fallback)
 */
async function getLocalProducts(): Promise<Product[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const data = JSON.parse(fileContent);
    if (Array.isArray(data) && data.length > 0) {
      return (data as Product[]).map(normalizeProduct);
    }
  } catch {
    // ignore
  }
  return initialProducts.map(normalizeProduct);
}

/**
 * Helper: Lưu song song vào file local products.json (nếu có thể)
 */
async function syncLocalProducts(products: Product[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
  } catch {
    // Bỏ qua lỗi nếu môi trường read-only trên serverless
  }
}

/**
 * Đọc toàn bộ danh sách sản phẩm từ Supabase (có cache RAM + fallback tức thì)
 */
export async function getAllProducts(): Promise<Product[]> {
  // Trả về ngay nếu có cache RAM
  if (memoryCache && Date.now() - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  try {
    const fetchPromise = supabase
      .from('products')
      .select('*')
      .order('updated_at', { ascending: false });

    // Giới hạn thời gian chờ tối đa 2.5s để không bao giờ bị đơ UI
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase query timeout')), 2500)
    );

    const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

    if (!error && Array.isArray(data) && data.length > 0) {
      memoryCache = (data as Product[]).map(normalizeProduct);
      lastFetchTime = Date.now();
      return memoryCache;
    }
  } catch (err) {
    console.warn('Supabase query fallback sang local:', err);
  }

  const local = await getLocalProducts();
  memoryCache = local;
  lastFetchTime = Date.now();
  return local;
}

/**
 * Lấy chi tiết sản phẩm theo ID
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  const currentList = await getAllProducts();
  const found = currentList.find((p) => p.id === id);
  if (found) return normalizeProduct(found);

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (!error && data) {
      return normalizeProduct(data as Product);
    }
  } catch (err) {
    console.warn('Lỗi getProductById Supabase:', err);
  }

  const local = await getLocalProducts();
  const fallback = local.find((p) => p.id === id);
  return fallback ? normalizeProduct(fallback) : undefined;
}

/**
 * Lấy chi tiết sản phẩm theo Slug
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const currentList = await getAllProducts();
  const found = currentList.find((p) => p.slug === slug);
  if (found) return normalizeProduct(found);

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return normalizeProduct(data as Product);
    }
  } catch (err) {
    console.warn('Lỗi getProductBySlug Supabase:', err);
  }

  const local = await getLocalProducts();
  const fallback = local.find((p) => p.slug === slug);
  return fallback ? normalizeProduct(fallback) : undefined;
}

/**
 * Thêm mới hoặc Cập nhật sản phẩm
 */
export async function saveProduct(productData: Partial<Product>): Promise<Product> {
  clearProductsCache();
  const currentList = await getAllProducts();
  const isExisting = productData.id && currentList.some((p) => p.id === productData.id);

  let candidate: Product;

  if (isExisting) {
    const existing = currentList.find((p) => p.id === productData.id) as Product;
    candidate = {
      ...existing,
      ...productData,
      id: productData.id!,
      slug: productData.slug || slugifyVietnamese(productData.name || 'san-pham'),
    };
  } else {
    const newId = productData.id || `pallet-${Date.now()}`;
    const newSlug = productData.slug || slugifyVietnamese(productData.name || 'san-pham');
    candidate = {
      id: newId,
      slug: newSlug,
      name: productData.name || 'Sản phẩm Pallet mới',
      category: productData.category || 'Pallet Gỗ Thông & Tràm Mới',
      categorySlug: productData.categorySlug || 'pallet-go-moi',
      dimensions: productData.dimensions || '1200 x 1000 x 140 mm',
      woodType: productData.woodType || 'Gỗ Thông xẻ sấy',
      materialGroup: productData.materialGroup || 'go-thong',
      targetMarket: productData.targetMarket || 'noi-dia',
      staticLoad: productData.staticLoad || '1.500 kg',
      dynamicLoad: productData.dynamicLoad || '1.000 kg',
      specification: productData.specification || 'Quy cách chuẩn',
      isExportStandard: productData.isExportStandard ?? false,
      isNew: productData.isNew ?? true,
      priceDisplay: productData.priceDisplay || 'Liên hệ',
      description: productData.description || '',
      highlights: productData.highlights || [],
      imageUrl: productData.imageUrl || DEFAULT_BANNER,
      gallery: productData.gallery?.length ? productData.gallery : [productData.imageUrl || DEFAULT_BANNER],
      usagePurpose: productData.usagePurpose || 'Kê kho, đóng hàng vận chuyển',
      badges: productData.badges || [],
      facebookProof: productData.facebookProof,
    };
  }

  // Luôn chuẩn hóa để banner_main.png nằm ở cuối gallery
  const savedProduct = normalizeProduct(candidate);

  // 1. Lưu lên Supabase
  try {
    const { error } = await supabase
      .from('products')
      .upsert({
        ...savedProduct,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) {
      console.error('Lỗi khi upsert sản phẩm lên Supabase:', error);
    }
  } catch (err) {
    console.error('Lỗi kết nối Supabase khi lưu:', err);
  }

  // 2. Đồng bộ song song vào file local để backup
  const updatedList = isExisting
    ? currentList.map((p) => (p.id === savedProduct.id ? savedProduct : p))
    : [savedProduct, ...currentList];
  await syncLocalProducts(updatedList);

  return savedProduct;
}

/**
 * Xóa sản phẩm theo ID
 */
export async function deleteProduct(id: string): Promise<boolean> {
  clearProductsCache();
  let success = false;

  // 1. Xóa trên Supabase
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) {
      success = true;
    } else {
      console.error('Lỗi khi xóa sản phẩm trên Supabase:', error);
    }
  } catch (err) {
    console.error('Lỗi kết nối Supabase khi xóa:', err);
  }

  // 2. Xóa trên file local
  const currentList = await getLocalProducts();
  const filtered = currentList.filter((p) => p.id !== id);
  if (filtered.length !== currentList.length) {
    success = true;
    await syncLocalProducts(filtered);
  }

  return success;
}

/**
 * Khôi phục về danh sách sản phẩm chuẩn mẫu ban đầu
 */
export async function resetProductsToDefault(): Promise<Product[]> {
  clearProductsCache();
  try {
    for (const p of initialProducts) {
      await supabase.from('products').upsert(normalizeProduct(p), { onConflict: 'id' });
    }
  } catch (err) {
    console.error('Lỗi reset Supabase:', err);
  }

  await syncLocalProducts(initialProducts.map(normalizeProduct));
  return initialProducts.map(normalizeProduct);
}
