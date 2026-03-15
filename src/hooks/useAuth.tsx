import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import auth from '../utils/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string, ttlSeconds?: number) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentToken = auth.getToken();
      const expired = auth.isExpired();

      if (currentToken && !expired) {
        setIsAuthenticated(true);
        setToken(currentToken);
      } else {
        setIsAuthenticated(false);
        setToken(null);
        if (currentToken) {
          auth.clearAuth(); // Clear expired token
        }
      }
      setIsLoading(false);
    };

    checkAuth();

    // Check auth status periodically (every 5 minutes)
    const interval = setInterval(checkAuth, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const login = (newToken: string, ttlSeconds = 7200) => {
    auth.setAuth(newToken, ttlSeconds);
    setIsAuthenticated(true);
    setToken(newToken);
  };

  const logout = () => {
    auth.clearAuth();
    setIsAuthenticated(false);
    setToken(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    token,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
