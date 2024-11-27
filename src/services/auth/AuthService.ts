import { User, LoginData, RegisterData } from '../../types/User';
import { loggingService } from '../security/LoggingService';
import { sessionService } from '../security/SessionService';
import { userValidationSchema } from '../../utils/validation/userValidation';
import apiClient from '../../utils/api/apiClient';
import { API_ENDPOINTS } from '../../utils/api/endpoints';

class AuthService {
  private static instance: AuthService;
  private user: User | null = null;

  private readonly ADMIN_CREDENTIALS = {
    email: 'nek@admin.com',
    password: 'nek76200',
    name: 'Nek',
    role: 'admin' as const
  };

  private constructor() {
    this.loadUserFromStorage();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private loadUserFromStorage(): void {
    try {
      const userData = sessionService.getUser();
      if (userData) {
        this.user = userData;
      }
    } catch (error) {
      loggingService.logError(error as Error);
      this.clearUserData();
    }
  }

  private saveUserData(user: User): void {
    try {
      // Pour l'admin, on crée un token factice qui ne nécessite pas de décodage
      const token = user.role === 'admin' ? 
        `admin-token-${Date.now()}` : 
        sessionService.getToken();
        
      sessionService.setToken(token);
      sessionService.setUser(user);
      this.user = user;
    } catch (error) {
      loggingService.logError(error as Error);
      this.clearUserData();
    }
  }

  private clearUserData(): void {
    sessionService.clearSession();
    this.user = null;
  }

  async login(data: LoginData): Promise<User> {
    try {
      await userValidationSchema.login.parseAsync(data);

      // Vérification des identifiants admin
      if (data.email === this.ADMIN_CREDENTIALS.email && 
          data.password === this.ADMIN_CREDENTIALS.password) {
        const adminUser: User = {
          id: 'admin-1',
          email: this.ADMIN_CREDENTIALS.email,
          name: this.ADMIN_CREDENTIALS.name,
          role: this.ADMIN_CREDENTIALS.role,
          createdAt: new Date(),
          lastLogin: new Date()
        };
        this.saveUserData(adminUser);
        loggingService.logSecurity('Admin login successful', adminUser.id);
        return adminUser;
      }

      // Pour les autres utilisateurs
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
      const { user, token } = response.data;
      
      sessionService.setToken(token);
      this.saveUserData(user);
      loggingService.logSecurity('User login successful', user.id);
      return user;
    } catch (error) {
      this.clearUserData();
      loggingService.logError(error as Error, { context: 'login', email: data.email });
      throw error;
    }
  }

  getUser(): User | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.user && sessionService.isSessionValid();
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }
}

export const authService = AuthService.getInstance();