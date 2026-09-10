import fs from 'fs/promises';
import path from 'path';
import { Product, products as initialProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'products.json');

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
      return data;
    }
  } catch {
    // ignore
  }
  return initialProducts;
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
 * Đọc toàn bộ danh sách sản phẩm từ Supabase (tự động fallback sang local)
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data as Product[];
    }
  } catch (err) {
    console.warn('Lỗi đọc Supabase, chuyển sang đọc local:', err);
  }

  return getLocalProducts();
}

/**
 * Lấy chi tiết sản phẩm theo ID
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (!error && data) {
      return data as Product;
    }
  } catch (err) {
    console.warn('Lỗi getProductById Supabase:', err);
  }

  const local = await getLocalProducts();
  return local.find((p) => p.id === id);
}

/**
 * Lấy chi tiết sản phẩm theo Slug
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return data as Product;
    }
  } catch (err) {
    console.warn('Lỗi getProductBySlug Supabase:', err);
  }

  const local = await getLocalProducts();
  return local.find((p) => p.slug === slug);
}

/**
 * Thêm mới hoặc Cập nhật sản phẩm
 */
export async function saveProduct(productData: Partial<Product>): Promise<Product> {
  const currentList = await getAllProducts();
  const isExisting = productData.id && currentList.some((p) => p.id === productData.id);

  let savedProduct: Product;

  if (isExisting) {
    const existing = currentList.find((p) => p.id === productData.id) as Product;
    savedProduct = {
      ...existing,
      ...productData,
      id: productData.id!,
      slug: productData.slug || slugifyVietnamese(productData.name || 'san-pham'),
    };
  } else {
    const newId = productData.id || `pallet-${Date.now()}`;
    const newSlug = productData.slug || slugifyVietnamese(productData.name || 'san-pham');
    savedProduct = {
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
      imageUrl: productData.imageUrl || '/images/banner_main.png',
      gallery: productData.gallery?.length ? productData.gallery : [productData.imageUrl || '/images/banner_main.png'],
      usagePurpose: productData.usagePurpose || 'Kê kho, đóng hàng vận chuyển',
      badges: productData.badges || [],
      facebookProof: productData.facebookProof,
    };
  }

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
  try {
    for (const p of initialProducts) {
      await supabase.from('products').upsert(p, { onConflict: 'id' });
    }
  } catch (err) {
    console.error('Lỗi reset Supabase:', err);
  }

  await syncLocalProducts(initialProducts);
  return initialProducts;
}
