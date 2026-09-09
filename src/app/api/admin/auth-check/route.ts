import { NextResponse } from 'next/server';
import { checkIsAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authenticated = checkIsAdminAuthenticated();
  return NextResponse.json({ authenticated });
}
