import crypto from "node:crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type JwtPayload = {
  id: number;
  exp?: number;
};

type UserLike = {
  id: number;
  isActive?: boolean;
  role?: {
    name?: string;
  };
};

type RequestLike = {
  headers: {
    authorization?: string;
  };
  user?: UserLike;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => unknown;
};

type NextLike = () => void;

const base64UrlDecode = (input: string) => {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const buffer = Buffer.from(padded + '='.repeat((4 - (padded.length % 4)) % 4), 'base64');
  return buffer.toString('utf8');
};

const verifyJwt = (token: string, secret: string): JwtPayload => {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid token');
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const header = JSON.parse(base64UrlDecode(encodedHeader));
  const payload = JSON.parse(base64UrlDecode(encodedPayload));

  if (header.alg !== 'HS256') {
    throw new Error('Unsupported algorithm');
  }

  const data = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

  const actual = Buffer.from(encodedSignature);
  const expected = Buffer.from(expectedSignature);

  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
    throw new Error('Invalid signature');
  }

  return payload;
};

const authenticate = async (req: RequestLike, res: ResponseLike, next: NextLike) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ success: false, message: 'JWT secret is not configured.' });
    }

    const decoded = verifyJwt(token, secret);

    const user = (await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { role: true },
    })) as UserLike | null;

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'User not found or inactive.' });
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.message === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token has expired. Please sign in again.' });
    }

    if (error.message === 'Invalid token' || error.message === 'Unsupported algorithm' || error.message === 'Invalid signature') {
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }

    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const authMiddleware = authenticate;

const authorize = (...roles: string[]) => {
  return (req: RequestLike, res: ResponseLike, next: NextLike) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const userRole = req.user.role?.name;

    if (!roles.includes(userRole ?? '')) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.',
      });
    }

    next();
  };
};

export { authenticate, authMiddleware, authorize };
