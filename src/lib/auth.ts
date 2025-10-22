import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export interface TokenPayload {
  adminId: string;
  username: string;
  role: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): jwt.JwtPayload | string | null {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function verifyAdminToken(request: any): Promise<any> {
  try {
    let token = request.cookies?.get('admin-token')?.value;

    if (!token) {
      const authHeader =
        request.headers?.get?.('authorization') ||
        request.headers?.authorization;
      if (
        authHeader &&
        typeof authHeader === 'string' &&
        authHeader.startsWith('Bearer ')
      ) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) return null;

    const decoded = verifyToken(token);
    return decoded;
  } catch {
    return null;
  }
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncateText(text: string, limit: number = 100): string {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
}
