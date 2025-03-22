
import { useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import { useNavigate } from 'react-router-dom';
import { Home, Leaf, ShoppingBag, Users, MessageCircle } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  showNavbar?: boolean;
  showHeader?: boolean;
  showNotifications?: boolean;
  activeTab?: string;
}

const AppLayout = ({ 
  children, 
  title = 'AgriSmart',
  showBackButton = false,
  showNavbar = true,
  showHeader = true,
  showNotifications = true,
  activeTab = 'home'
}: AppLayoutProps) => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {showHeader && (
        <AppHeader 
          title={title} 
          showBackButton={showBackButton} 
          showNotifications={showNotifications}
        />
      )}
      
      <main className="flex-1 pt-16 pb-16 overflow-x-hidden">
        <div className="animate-fade-in max-w-screen-lg mx-auto px-4">
          {children}
        </div>
      </main>
      
      {showNavbar && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 z-40 border-t border-t-border glass backdrop-blur-lg">
          <div className="max-w-screen-lg mx-auto">
            <div className="flex items-center justify-between px-4">
              <NavButton 
                icon={<Home size={22} />} 
                label="Home" 
                isActive={activeTab === 'home'}
                onClick={() => navigate('/')}
              />
              <NavButton 
                icon={<Leaf size={22} />} 
                label="Doctor" 
                isActive={activeTab === 'doctor'}
                onClick={() => navigate('/crop-disease')}
              />
              <NavButton 
                icon={<ShoppingBag size={22} />} 
                label="Store" 
                isActive={activeTab === 'store'}
                onClick={() => navigate('/store')}
              />
              <NavButton 
                icon={<Users size={22} />} 
                label="Community" 
                isActive={activeTab === 'community'}
                onClick={() => navigate('/community')}
              />
              <NavButton 
                icon={<MessageCircle size={22} />} 
                label="Chat" 
                isActive={activeTab === 'chat'}
                onClick={() => navigate('/chat-support')}
              />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

const NavButton = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <button 
      className={`flex flex-col items-center justify-center py-3 px-2 w-full transition-all duration-200 ${
        isActive 
          ? 'text-agri-green' 
          : 'text-muted-foreground hover:text-foreground'
      }`}
      onClick={onClick}
    >
      <div className={`relative ${isActive ? 'after:content-[""] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-agri-green after:rounded-full' : ''}`}>
        {icon}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
};

export default AppLayout;
