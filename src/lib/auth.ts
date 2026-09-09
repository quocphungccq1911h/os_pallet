import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'truongan@2024';
const AUTH_COOKIE_NAME = 'admin_session';

// Chuỗi token phiên đăng nhập (bảo vệ cơ bản cho phân hệ nội bộ)
function generateToken(): string {
  return Buffer.from(`admin_logged_in_${ADMIN_PASSWORD}`).toString('base64');
}

/**
 * Kiểm tra mật khẩu quản trị viên
 */
export function verifyAdminPassword(password: string): boolean {
  return password.trim() === ADMIN_PASSWORD;
}

/**
 * Kiểm tra xem request hiện tại đã có cookie hợp lệ chưa (Server-side)
 */
export function checkIsAdminAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    return token === generateToken();
  } catch {
    return false;
  }
}

export { ADMIN_PASSWORD, AUTH_COOKIE_NAME, generateToken };
