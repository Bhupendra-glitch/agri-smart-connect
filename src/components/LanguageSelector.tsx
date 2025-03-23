
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Check, Globe } from 'lucide-react';
import { useAuth, languages } from '@/contexts/AuthContext';

export function LanguageSelector() {
  const { user, setLanguage, getLanguageName } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>('en');

  // Update the selected language when user changes
  useEffect(() => {
    if (user?.language) {
      setSelectedLang(user.language);
    }
  }, [user]);

  const handleLanguageChange = (langCode: string) => {
    console.log("Language selected:", langCode);
    setSelectedLang(langCode);
    setLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguageName = getLanguageName(user?.language || 'en');

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Language</span>
          </div>
          <div className="text-muted-foreground">
            {currentLanguageName}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Language</SheetTitle>
        </SheetHeader>
        <div className="grid gap-3 py-4 max-h-[70vh] overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                selectedLang === lang.code
                  ? 'bg-agri-green/10 border border-agri-green/30'
                  : 'bg-card hover:bg-muted border border-input'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <div className="flex items-center">
                <div>
                  <p className="font-medium">{lang.name}</p>
                  <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
                </div>
              </div>
              {selectedLang === lang.code && (
                <div className="flex-shrink-0 text-agri-green">
                  <Check className="h-5 w-5" />
                </div>
              )}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
