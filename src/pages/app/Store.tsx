
import { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, FilterX, Filter, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isFavorite: boolean;
}

const Store = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Organic Fertilizer',
            price: 350,
            image: 'https://images.unsplash.com/photo-1631438610562-a3bea348d286?q=80&w=200&auto=format&fit=crop',
            category: 'Fertilizer',
            rating: 4.5,
            isFavorite: false,
          },
          {
            id: '2',
            name: 'Garden Sprayer',
            price: 1200,
            image: 'https://images.unsplash.com/photo-1603205431244-11d37f706268?q=80&w=200&auto=format&fit=crop',
            category: 'Equipment',
            rating: 4.2,
            isFavorite: true,
          },
          {
            id: '3',
            name: 'Neem Oil',
            price: 180,
            image: 'https://images.unsplash.com/photo-1563791877319-5a3a4fce5876?q=80&w=200&auto=format&fit=crop',
            category: 'Pesticide',
            rating: 4.8,
            isFavorite: false,
          },
          {
            id: '4',
            name: 'Premium Seeds',
            price: 120,
            image: 'https://images.unsplash.com/photo-1618641424208-127dac83f213?q=80&w=200&auto=format&fit=crop',
            category: 'Seeds',
            rating: 4.6,
            isFavorite: false,
          },
          {
            id: '5',
            name: 'Drip Irrigation Kit',
            price: 2500,
            image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=200&auto=format&fit=crop',
            category: 'Equipment',
            rating: 4.7,
            isFavorite: false,
          },
          {
            id: '6',
            name: 'Compost Maker',
            price: 450,
            image: 'https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=200&auto=format&fit=crop',
            category: 'Fertilizer',
            rating: 4.3,
            isFavorite: false,
          },
        ];
        
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setCartCount(2); // Mock cart count
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query and category
    let filtered = [...products];
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const getUniqueCategories = () => {
    const categories = products.map(p => p.category);
    return [...new Set(categories)];
  };

  const addToCart = (productId: string) => {
    setCartCount(prev => prev + 1);
    // In a real app, this would update the cart state/API
  };

  return (
    <AppLayout title="Agri Store" activeTab="store">
      <div className="pt-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Agri Store</h1>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="py-4">
                  <h3 className="text-lg font-medium mb-4">Filters</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Categories</h4>
                      <div className="space-y-2">
                        {getUniqueCategories().map(category => (
                          <div key={category} className="flex items-center">
                            <Checkbox 
                              id={`category-${category}`} 
                              checked={selectedCategory === category}
                              onCheckedChange={() => handleCategorySelect(category)}
                            />
                            <Label 
                              htmlFor={`category-${category}`}
                              className="ml-2 text-sm cursor-pointer"
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        onClick={clearFilters}
                        variant="outline"
                        className="w-full flex items-center justify-center"
                      >
                        <FilterX className="h-4 w-4 mr-2" />
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button variant="outline" size="icon" className="rounded-full relative">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 h-12 focus:ring-2 ring-primary/20"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground"
              onClick={clearFilters}
            >
              <FilterX className="h-3 w-3 mr-1" />
              Clear filter
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {isLoading ? (
            <>
              <div className="aspect-[3/4] rounded-lg bg-muted animate-pulse"></div>
              <div className="aspect-[3/4] rounded-lg bg-muted animate-pulse"></div>
              <div className="aspect-[3/4] rounded-lg bg-muted animate-pulse"></div>
              <div className="aspect-[3/4] rounded-lg bg-muted animate-pulse"></div>
            </>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))
          ) : (
            <div className="col-span-2 py-10 text-center">
              <p className="text-muted-foreground">No products found</p>
              <Button
                variant="link"
                onClick={clearFilters}
                className="mt-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

const ProductCard = ({ 
  product, 
  onAddToCart 
}: { 
  product: Product; 
  onAddToCart: (id: string) => void;
}) => {
  return (
    <div className="glass-card overflow-hidden rounded-lg flex flex-col">
      <div className="w-full aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="badge badge-primary mb-1 text-xs">
            {product.category}
          </div>
          <h3 className="font-medium text-sm line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center mt-1">
            <div className="flex items-center text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              <span className="text-xs ml-0.5">{product.rating}</span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold">₹{product.price}</p>
            <button
              className="text-xs text-agri-green border border-agri-green py-1 px-2 rounded transition-colors hover:bg-agri-green hover:text-white"
              onClick={() => onAddToCart(product.id)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
