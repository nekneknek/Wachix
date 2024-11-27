import { jwtDecode } from 'jwt-decode';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'admin';
  createdAt: Date;
  lastLogin: Date;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface JWTPayload {
  userId: string;
  role: string;
  exp: number;
}

class AuthService {
  private static instance: AuthService;
  private user: User | null = null;

  // Identifiants admin par défaut
  private readonly ADMIN_CREDENTIALS = {
    email: 'nek@admin.com',
    password: 'nek76200',
    name: 'Nek',
    role: 'admin' as const
  };

  private constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data: LoginData): Promise<User> {
    try {
      // Vérification des identifiants admin
      if (data.email === this.ADMIN_CREDENTIALS.email && 
          data.password === this.ADMIN_CREDENTIALS.password) {
        const adminUser = {
          id: '1',
          email: this.ADMIN_CREDENTIALS.email,
          name: this.ADMIN_CREDENTIALS.name,
          role: this.ADMIN_CREDENTIALS.role,
          createdAt: new Date(),
          lastLogin: new Date()
        };
        this.user = adminUser;
        localStorage.setItem('user', JSON.stringify(adminUser));
        return adminUser;
      }

      // Pour les autres utilisateurs
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Identifiants incorrects');
      }

      const userData = await response.json();
      this.user = userData.user;
      localStorage.setItem('user', JSON.stringify(this.user));
      return this.user;
    } catch (error) {
      throw new Error('Échec de la connexion');
    }
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }
}

export const authService = AuthService.getInstance();