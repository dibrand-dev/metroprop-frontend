import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  email: string;
  name?: string;
  initials: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    // Get initials and name from email
    const namePart = email.split('@')[0];
    const initials = namePart.substring(0, 2).toUpperCase();
    // Capitalize first letter for display name
    const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    setUser({
      email,
      name,
      initials,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
