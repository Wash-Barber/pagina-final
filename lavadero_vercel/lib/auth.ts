import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE = 'lavadero_admin';
const secret = () => process.env.ADMIN_PASSWORD || 'cambiar-esta-clave';

function sign(value: string) {
  return crypto.createHmac('sha256', secret()).update(value).digest('hex');
}

export function makeAdminToken() {
  const value = 'admin';
  return `${value}.${sign(value)}`;
}

export function validToken(token: string | undefined) {
  if (!token) return false;
  const [value, sig] = token.split('.');
  if (value !== 'admin' || !sig) return false;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(sign(value)));
}

export async function isAdmin() {
  const jar = await cookies();
  return validToken(jar.get(COOKIE)?.value);
}

export { COOKIE };
