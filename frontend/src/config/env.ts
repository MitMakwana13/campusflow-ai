export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  IS_DEV: process.env.NODE_ENV === 'development',
} as const;
