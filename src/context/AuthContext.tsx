
import { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/services/api';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for token and user data in localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await adminApi.login(email, password);

      if (response.data) {
        const { token, user: userData } = response.data;

        // Save token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(userData));

        setUser({
          id: userData.sub,
          email: userData.email,
          name: userData.email.split('@')[0], // You might want to adjust this
          role: userData.role, // You might want to adjust this based on your needs
        });

        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        });
      } else {
        toast({
          title: 'Login failed',
          description: response.error || 'An error occurred',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await adminApi.createClientAdmin({
        email,
        first_name: name.split(' ')[0],
        last_name: name.split(' ')[1] || '',
      });

      toast({
        title: 'Registration successful',
        description: 'Admin account created successfully.',
      });

      return response;
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setUser(null);

      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
