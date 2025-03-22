
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Define user type
export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  language?: string;
  profileImage?: string;
  location?: string;
  soilType?: string;
}

// Context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phone: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  setLanguage: (language: string) => void;
  getLanguageName: (code: string) => string;
}

// Language data
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
];

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  updateProfile: async () => {},
  logout: () => {},
  setLanguage: () => {},
  getLanguageName: () => "",
});

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('agriSmartUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function - simplified to remove OTP flow
  const login = async (phone: string) => {
    try {
      setIsLoading(true);
      // For MVP, we'll simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create new user directly (no OTP verification)
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        phone: phone,
        language: 'en', // Default language
      };
      
      setUser(newUser);
      localStorage.setItem('agriSmartUser', JSON.stringify(newUser));
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

  // Get language name from code
  const getLanguageName = (code: string): string => {
    const language = languages.find(lang => lang.code === code);
    return language ? language.name : "English";
  };

  // Set language preference
  const setLanguage = (language: string) => {
    if (user) {
      const updatedUser = { ...user, language };
      setUser(updatedUser);
      localStorage.setItem('agriSmartUser', JSON.stringify(updatedUser));
      
      toast({
        title: "Language Updated",
        description: `Language has been set to ${getLanguageName(language)}`,
      });
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
      updateProfile, 
      logout,
      setLanguage,
      getLanguageName
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy context use
export const useAuth = () => useContext(AuthContext);
