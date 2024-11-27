import { jwtDecode } from 'jwt-decode';
import { User } from '../../types/User';

class SessionService {
  private static instance: SessionService;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly TOKEN_EXPIRY_KEY = 'token_expiry';

  private constructor() {}

  static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    
    // Ne pas essayer de décoder les tokens admin
    if (!token.startsWith('admin-token-')) {
      try {
        const decoded = jwtDecode(token);
        if (typeof decoded === 'object' && decoded !== null && 'exp' in decoded) {
          localStorage.setItem(this.TOKEN_EXPIRY_KEY, decoded.exp.toString());
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      // Pour les tokens admin, on définit une expiration de 24h
      const expiry = Math.floor(Date.now() / 1000) + (24 * 60 * 60);
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiry.toString());
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  isSessionValid(): boolean {
    const token = this.getToken();
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    
    if (!token || !expiry) return false;
    
    const expiryTime = parseInt(expiry, 10);
    const currentTime = Math.floor(Date.now() / 1000);
    
    return expiryTime > currentTime;
  }
}

export const sessionService = SessionService.getInstance();