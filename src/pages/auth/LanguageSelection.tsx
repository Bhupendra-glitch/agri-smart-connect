
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth, languages } from '@/contexts/AuthContext';
import { Check } from 'lucide-react';

const LanguageSelection = () => {
  const { user, setLanguage } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(user?.language || 'en');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Update selected language when user changes
  useEffect(() => {
    if (user?.language) {
      setSelectedLanguage(user.language);
    }
  }, [user]);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
  };

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      
      // Save language preference
      console.log("Setting language on continue:", selectedLanguage);
      setLanguage(selectedLanguage);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Language Set",
        description: `Your language preference has been saved.`,
      });
      
      // If user is coming from profile setup, go to home, otherwise go back to previous page
      if (location.pathname.includes('profile-setup')) {
        navigate('/');
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.error('Language setting error:', error);
      toast({
        title: "Error",
        description: "Failed to set language. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-agri-green/5 to-agri-sky/5">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-agri-green/10 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-agri-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Choose Your Language</h1>
          <p className="text-muted-foreground mt-2">
            Select your preferred language for the app
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl mb-6">
          <div className="grid grid-cols-1 gap-3 mb-6 max-h-[400px] overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-200 ${
                  selectedLanguage === lang.code
                    ? 'bg-agri-green/10 border border-agri-green/30'
                    : 'bg-card hover:bg-muted border border-input'
                }`}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="font-medium">{lang.name}</p>
                    <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
                  </div>
                </div>
                {selectedLanguage === lang.code && (
                  <div className="flex-shrink-0 text-agri-green">
                    <Check className="h-5 w-5" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <Button
            onClick={handleContinue}
            className="w-full h-12 bg-agri-green hover:bg-agri-green-dark text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Setting Language..." : "Continue"}
          </Button>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          You can change your language anytime from the settings
        </p>
      </div>
    </div>
  );
};

export default LanguageSelection;
