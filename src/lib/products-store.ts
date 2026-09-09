import fs from 'fs/promises';
import path from 'path';
import { Product, products as initialProducts } from '@/data/products';

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
 * Đọc toàn bộ danh sách sản phẩm từ file products.json (tự khởi tạo nếu chưa có)
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const data = JSON.parse(fileContent);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch {
    // Nếu file chưa tồn tại hoặc rỗng, khởi tạo từ initialProducts
    try {
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(initialProducts, null, 2), 'utf-8');
      return initialProducts;
    } catch {
      return initialProducts;
    }
  }
  return initialProducts;
}

/**
 * Lấy chi tiết sản phẩm theo ID
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.id === id);
}

/**
 * Lấy chi tiết sản phẩm theo Slug
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

/**
 * Thêm mới hoặc Cập nhật sản phẩm
 */
export async function saveProduct(productData: Partial<Product>): Promise<Product> {
  const products = await getAllProducts();

  const isExisting = productData.id && products.some((p) => p.id === productData.id);

  let updatedList: Product[];
  let savedProduct: Product;

  if (isExisting) {
    // Cập nhật sản phẩm có sẵn
    savedProduct = {
      ...(products.find((p) => p.id === productData.id) as Product),
      ...productData,
      id: productData.id!,
      slug: productData.slug || slugifyVietnamese(productData.name || 'san-pham'),
    };
    updatedList = products.map((p) => (p.id === savedProduct.id ? savedProduct : p));
  } else {
    // Tạo sản phẩm mới
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
    updatedList = [savedProduct, ...products];
  }

  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedList, null, 2), 'utf-8');
  return savedProduct;
}

/**
 * Xóa sản phẩm theo ID
 */
export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getAllProducts();
  const initialLength = products.length;
  const filtered = products.filter((p) => p.id !== id);

  if (filtered.length === initialLength) {
    return false;
  }

  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}

/**
 * Khôi phục về danh sách 8 sản phẩm chuẩn mẫu ban đầu
 */
export async function resetProductsToDefault(): Promise<Product[]> {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(initialProducts, null, 2), 'utf-8');
  return initialProducts;
}
