import jwt from 'jsonwebtoken';

const JWT_SECRET = () => process.env.JWT_SECRET || 'dev-fallback-secret';
const JWT_EXPIRES_IN = () => process.env.JWT_EXPIRES_IN || '7d';

export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET(), {
    expiresIn: JWT_EXPIRES_IN(),
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET());
};

export const attachTokenCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
