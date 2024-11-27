export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    RESET_PASSWORD: '/auth/reset-password',
    CONFIRM_RESET: '/auth/confirm-reset-password'
  },
  
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    FEATURED: '/products/featured'
  },
  
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`
  },
  
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    FAVORITES: '/users/favorites'
  },
  
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STATS: '/admin/stats',
    USERS: '/admin/users',
    ORDERS: '/admin/orders'
  }
} as const;