
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Define user type
export interface User {
  id: string;
  phone: string;
  name?: string;
  language?: string;
  profileImage?: string;
  location?: string;
  selectedCrops?: string[];
}

// Context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phone: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  setLanguage: (language: string) => void;
}

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  verifyOTP: async () => false,
  updateProfile: async () => {},
  logout: () => {},
  setLanguage: () => {},
});

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tempPhone, setTempPhone] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('agriSmartUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function - in a real app, this would call an API
  const login = async (phone: string) => {
    try {
      setIsLoading(true);
      // For MVP, we'll simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTempPhone(phone);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Verify OTP - in a real app, this would call an API
  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // For MVP, we'll simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo, any 4-digit OTP is valid
      if (otp.length === 4) {
        const newUser: User = {
          id: Math.random().toString(36).substring(2, 15),
          phone: tempPhone,
        };
        setUser(newUser);
        localStorage.setItem('agriSmartUser', JSON.stringify(newUser));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        toast({
          title: "Invalid OTP",
          description: "Please enter a valid 4-digit OTP.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Update profile
  const updateProfile = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      // For MVP, we'll simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('agriSmartUser', JSON.stringify(updatedUser));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Set language preference
  const setLanguage = (language: string) => {
    if (user) {
      const updatedUser = { ...user, language };
      setUser(updatedUser);
      localStorage.setItem('agriSmartUser', JSON.stringify(updatedUser));
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('agriSmartUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      verifyOTP, 
      updateProfile, 
      logout,
      setLanguage
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy context use
export const useAuth = () => useContext(AuthContext);
