
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/AppLayout';
import WeatherCard from '@/components/WeatherCard';
import { Button } from '@/components/ui/button';
import {
  CloudRain,
  Leaf,
  MessageCircle,
  Mic,
  PenSquare,
  Search,
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Just wait a bit to simulate loading
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AppLayout title="Home" activeTab="home">
      <div className="pt-4 pb-20">
        {/* Welcome Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {user?.name ? `Welcome, ${user.name.split(' ')[0]}` : 'Welcome'}
            </h1>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <Button
            variant="outline"
            className="aspect-square p-2 rounded-full border border-input"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={18} />
          </Button>
        </div>
        
        {/* Search Input (conditionally rendered) */}
        {isSearchOpen && (
          <div className="mb-6 animate-slide-down">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search crops, issues..." 
                className="w-full h-12 px-4 pr-10 rounded-lg border border-input focus:ring-2 ring-primary/20 transition-all duration-200 bg-white dark:bg-black/20 backdrop-blur-sm"
              />
              <Mic className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        )}
        
        {/* Weather Card */}
        <div className="mb-6">
          <WeatherCard />
        </div>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <QuickActionButton 
              icon={<Leaf className="h-5 w-5" />}
              label="Crop Doctor"
              onClick={() => navigate('/crop-disease')}
            />
            <QuickActionButton 
              icon={<PenSquare className="h-5 w-5" />}
              label="Post Issue"
              onClick={() => navigate('/community')}
            />
            <QuickActionButton 
              icon={<CloudRain className="h-5 w-5" />}
              label="Weather"
              onClick={() => navigate('/weather')}
            />
          </div>
        </div>
        
        {/* Chat Support */}
        <div className="fixed bottom-20 right-4 z-30">
          <Button
            onClick={() => navigate('/chat-support')}
            className="aspect-square p-0 w-12 h-12 rounded-full bg-agri-green text-white shadow-lg hover:bg-agri-green-dark"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

const QuickActionButton = ({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
}) => {
  return (
    <button
      className="flex flex-col items-center justify-center p-4 glass-card rounded-lg hover:shadow-md transition-all duration-200"
      onClick={onClick}
    >
      <div className="text-agri-green mb-2">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default Home;
