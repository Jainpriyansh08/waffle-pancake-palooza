
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface UserProfile {
  name: string;
  email: string;
  dob: string;
  dcCoins: number;
  totalOrders: number;
}

interface UserContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  updateProfile: (data: Partial<UserProfile>) => void;
  createProfile: (data: Omit<UserProfile, 'dcCoins' | 'totalOrders'>) => void;
  addDcCoins: (amount: number) => void;
  getBadge: () => 'none' | 'bronze' | 'silver' | 'gold';
  getCoinsPerOrder: () => number;
}

const UserContext = createContext<UserContextType>({
  profile: null,
  isLoading: false,
  updateProfile: () => {},
  createProfile: () => {},
  addDcCoins: () => {},
  getBadge: () => 'none',
  getCoinsPerOrder: () => 50,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      const storedProfile = localStorage.getItem(`dcProfile_${user.id}`);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    }
    setIsLoading(false);
  }, [user]);

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user || !profile) return;
    
    const updatedProfile = { ...profile, ...data };
    setProfile(updatedProfile);
    localStorage.setItem(`dcProfile_${user.id}`, JSON.stringify(updatedProfile));
    
    // Update auth user profile status
    const updatedUser = { ...user, isProfileComplete: true };
    localStorage.setItem('dcUser', JSON.stringify(updatedUser));
  };

  const createProfile = (data: Omit<UserProfile, 'dcCoins' | 'totalOrders'>) => {
    if (!user) return;
    
    const newProfile = {
      ...data,
      dcCoins: 0,
      totalOrders: 0,
    };
    
    setProfile(newProfile);
    localStorage.setItem(`dcProfile_${user.id}`, JSON.stringify(newProfile));
    
    // Update auth user profile status
    const updatedUser = { ...user, isProfileComplete: true };
    localStorage.setItem('dcUser', JSON.stringify(updatedUser));
  };

  const addDcCoins = (amount: number) => {
    if (!user || !profile) return;
    
    const updatedProfile = {
      ...profile,
      dcCoins: profile.dcCoins + amount,
      totalOrders: profile.totalOrders + 1,
    };
    
    setProfile(updatedProfile);
    localStorage.setItem(`dcProfile_${user.id}`, JSON.stringify(updatedProfile));
  };

  const getBadge = () => {
    if (!profile) return 'none';
    
    if (profile.totalOrders >= 300) return 'gold';
    if (profile.totalOrders >= 150) return 'silver';
    if (profile.totalOrders >= 50) return 'bronze';
    return 'none';
  };

  const getCoinsPerOrder = () => {
    const badge = getBadge();
    
    switch (badge) {
      case 'gold': return 125;
      case 'silver': return 100;
      case 'bronze': return 75;
      default: return 50;
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        profile, 
        isLoading, 
        updateProfile, 
        createProfile, 
        addDcCoins,
        getBadge,
        getCoinsPerOrder
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
