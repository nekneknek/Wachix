// Constantes globales de l'application
export const APP_CONFIG = {
  NAME: 'Wachix',
  DESCRIPTION: 'Parfums et tissus wax authentiques',
  CONTACT_EMAIL: 'contact@wachix.com',
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/wachix',
    INSTAGRAM: 'https://instagram.com/wachix',
    TWITTER: 'https://twitter.com/wachix'
  }
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    RESET_PASSWORD: '/auth/reset-password'
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`
  }
} as const;