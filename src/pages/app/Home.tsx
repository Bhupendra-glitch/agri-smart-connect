import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/AppLayout';
import WeatherCard from '@/components/WeatherCard';
import CropSelector from '@/components/CropSelector';
import { Button } from '@/components/ui/button';
import {
  ChevronRight,
  CloudRain,
  Leaf,
  MessageCircle,
  Mic,
  PenSquare,
  Search,
  ShoppingBag,
} from 'lucide-react';

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setIsLoading(true);
        // In a real app, fetch from API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockProducts: RecommendedProduct[] = [
          {
            id: '1',
            name: 'Organic Fertilizer',
            price: 350,
            image: 'https://images.unsplash.com/photo-1631438610562-a3bea348d286?q=80&w=200&auto=format&fit=crop',
            rating: 4.5,
            category: 'Fertilizer'
          },
          {
            id: '2',
            name: 'Garden Sprayer',
            price: 1200,
            image: 'https://images.unsplash.com/photo-1603205431244-11d37f706268?q=80&w=200&auto=format&fit=crop',
            rating: 4.2,
            category: 'Equipment'
          },
          {
            id: '3',
            name: 'Neem Oil',
            price: 180,
            image: 'https://images.unsplash.com/photo-1563791877319-5a3a4fce5876?q=80&w=200&auto=format&fit=crop',
            rating: 4.8,
            category: 'Pesticide'
          },
        ];
        
        setRecommendedProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendedProducts();
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
                placeholder="Search crops, products, issues..." 
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
        
        {/* Crop Selector */}
        <div className="mb-6">
          <CropSelector />
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
        
        {/* Recommended Products */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Recommended Products</h2>
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => navigate('/store')}
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading ? (
              <>
                <div className="h-32 rounded-lg bg-muted animate-pulse"></div>
                <div className="h-32 rounded-lg bg-muted animate-pulse"></div>
              </>
            ) : (
              recommendedProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex glass-card overflow-hidden rounded-lg h-32"
                  onClick={() => navigate(`/store/product/${product.id}`)}
                >
                  <div className="w-1/3 h-full overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-3 flex flex-col justify-between">
                    <div>
                      <div className="badge badge-primary mb-1">
                        {product.category}
                      </div>
                      <h3 className="font-medium text-sm line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-amber-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">₹{product.price}</p>
                      <button className="text-xs text-agri-green border border-agri-green px-2 py-1 rounded">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
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
