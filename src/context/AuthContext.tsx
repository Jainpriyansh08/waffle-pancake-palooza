
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  phoneNumber: string;
  isAuthenticated: boolean;
  isProfileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phoneNumber: string) => Promise<void>;
  signup: (phoneNumber: string) => Promise<void>;
  logout: () => void;
  checkProfileStatus: () => boolean;
}

const initialUser = null;

const AuthContext = createContext<AuthContextType>({
  user: initialUser,
  isLoading: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  checkProfileStatus: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('dcUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phoneNumber: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage
      const storedUser = localStorage.getItem('dcUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.phoneNumber === phoneNumber) {
          setUser(parsedUser);
          return;
        }
      }
      
      // If not found, create new user
      const newUser = {
        id: Date.now().toString(),
        phoneNumber,
        isAuthenticated: true,
        isProfileComplete: false,
      };
      
      setUser(newUser);
      localStorage.setItem('dcUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (phoneNumber: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now().toString(),
        phoneNumber,
        isAuthenticated: true,
        isProfileComplete: false,
      };
      
      setUser(newUser);
      localStorage.setItem('dcUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dcUser');
  };

  const checkProfileStatus = () => {
    return user?.isProfileComplete || false;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, checkProfileStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
