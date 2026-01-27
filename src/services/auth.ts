import api, { setAuthToken, removeAuthToken } from './api';

export interface User {
  id: number;
  email: string;
  name: string;
  user_type: 'regular' | 'inmobiliaria' | 'corredor' | 'constructora';
  email_verified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface RegisterProfessionalData extends RegisterData {
  user_type: 'inmobiliaria' | 'corredor' | 'constructora';
  razon_social: string;
  fiscal_condition: 'monotributista' | 'responsable_inscripto' | 'exento';
  cuit: string;
  phone: string;
  license_number?: string;
  address?: string;
  province?: string;
  city?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User } | { error: string }> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.error) {
      return { error: response.error };
    }
    
    if (response.data) {
      setAuthToken(response.data.token);
      return { user: response.data.user };
    }
    
    return { error: 'Erro desconhecido' };
  },

  async register(data: RegisterData): Promise<{ user: User } | { error: string }> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    
    if (response.error) {
      return { error: response.error };
    }
    
    if (response.data) {
      setAuthToken(response.data.token);
      return { user: response.data.user };
    }
    
    return { error: 'Erro desconhecido' };
  },

  async registerProfessional(data: RegisterProfessionalData): Promise<{ user: User } | { error: string }> {
    const response = await api.post<AuthResponse>('/auth/register-professional', data);
    
    if (response.error) {
      return { error: response.error };
    }
    
    if (response.data) {
      setAuthToken(response.data.token);
      return { user: response.data.user };
    }
    
    return { error: 'Erro desconhecido' };
  },

  async getCurrentUser(): Promise<{ user: User } | { error: string }> {
    const response = await api.get<User>('/auth/me');
    
    if (response.error) {
      return { error: response.error };
    }
    
    if (response.data) {
      return { user: response.data };
    }
    
    return { error: 'Erro desconhecido' };
  },

  logout(): void {
    removeAuthToken();
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  async forgotPassword(email: string): Promise<{ success: boolean } | { error: string }> {
    const response = await api.post<{ message: string }>('/auth/forgot-password', { email });
    
    if (response.error) {
      return { error: response.error };
    }
    
    return { success: true };
  },

  async resetPassword(token: string, password: string): Promise<{ success: boolean } | { error: string }> {
    const response = await api.post<{ message: string }>('/auth/reset-password', { token, password });
    
    if (response.error) {
      return { error: response.error };
    }
    
    return { success: true };
  },

  async verifyEmail(token: string): Promise<{ success: boolean } | { error: string }> {
    const response = await api.post<{ message: string }>('/auth/verify-email', { token });
    
    if (response.error) {
      return { error: response.error };
    }
    
    return { success: true };
  },
};

export default authService;
