
import { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

interface Crop {
  id: string;
  name: string;
  icon: string;
}

const CropSelector = () => {
  const { user, updateProfile } = useAuth();
  const [selectedCrop, setSelectedCrop] = useState<string | undefined>(
    user?.selectedCrops && user.selectedCrops.length > 0 
      ? user.selectedCrops[0] 
      : undefined
  );
  
  const [crops, setCrops] = useState<Crop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Mock API call to get crops
    const fetchCrops = async () => {
      try {
        setIsLoading(true);
        // In a real app, fetch data from an API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockCrops: Crop[] = [
          { id: 'rice', name: 'Rice', icon: '🌾' },
          { id: 'wheat', name: 'Wheat', icon: '🌿' },
          { id: 'corn', name: 'Corn', icon: '🌽' },
          { id: 'tomato', name: 'Tomato', icon: '🍅' },
          { id: 'potato', name: 'Potato', icon: '🥔' },
          { id: 'cotton', name: 'Cotton', icon: '🧶' },
        ];
        
        setCrops(mockCrops);
      } catch (error) {
        console.error('Error fetching crops:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCrops();
  }, []);
  
  useEffect(() => {
    if (user?.selectedCrops && user.selectedCrops.length > 0 && !selectedCrop) {
      setSelectedCrop(user.selectedCrops[0]);
    }
  }, [user, selectedCrop]);
  
  const handleSelectCrop = (cropId: string) => {
    setSelectedCrop(cropId);
    if (user) {
      updateProfile({ selectedCrops: [cropId] });
    }
  };
  
  if (isLoading) {
    return (
      <div className="w-full h-12 bg-muted animate-pulse rounded-lg"></div>
    );
  }
  
  return (
    <div className="w-full relative">
      <div className="absolute -top-2.5 left-3 px-1 bg-background">
        <span className="text-xs font-medium text-muted-foreground">Select your crop</span>
      </div>
      <Select value={selectedCrop} onValueChange={handleSelectCrop}>
        <SelectTrigger className="w-full h-12 bg-card border border-input focus:ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all duration-200">
          <SelectValue placeholder="Select a crop" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {crops.map((crop) => (
            <SelectItem key={crop.id} value={crop.id} className="cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-lg">{crop.icon}</span>
                <span>{crop.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CropSelector;
