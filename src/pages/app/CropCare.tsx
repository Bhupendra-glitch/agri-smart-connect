
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plant, CloudRain, Sun, Bug, Thermometer, Calendar, ChevronRight } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Crop {
  id: string;
  name: string;
  icon: string;
  season: string;
  waterRequirement: 'low' | 'medium' | 'high';
  temperatureRange: string;
  growthDuration: string;
  pestsSusceptible: string[];
  diseasesSusceptible: string[];
  fertilizerRecommendation: string;
  soilType: string;
  tips: string[];
}

const CropCare = () => {
  const [selectedCropId, setSelectedCropId] = useState<string>('');
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setIsLoading(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock crop data
        const mockCrops: Crop[] = [
          {
            id: 'rice',
            name: 'Rice',
            icon: '🌾',
            season: 'Kharif (Monsoon)',
            waterRequirement: 'high',
            temperatureRange: '20-35°C',
            growthDuration: '110-150 days',
            pestsSusceptible: ['Stem Borer', 'Brown Plant Hopper', 'Leaf Folder'],
            diseasesSusceptible: ['Rice Blast', 'Bacterial Leaf Blight', 'Sheath Blight'],
            fertilizerRecommendation: 'NPK (20:10:10) at planting, urea top dressing at tillering and panicle initiation',
            soilType: 'Clay or clay loam soils with good water retention',
            tips: [
              'Maintain 2-5 cm water level during critical growth stages',
              'Drain field 10 days before harvesting',
              'Implement integrated pest management for sustainable control',
              'Practice proper spacing (20x10 cm) for optimal growth'
            ]
          },
          {
            id: 'wheat',
            name: 'Wheat',
            icon: '🌿',
            season: 'Rabi (Winter)',
            waterRequirement: 'medium',
            temperatureRange: '15-25°C',
            growthDuration: '100-150 days',
            pestsSusceptible: ['Aphids', 'Termites', 'Army Worm'],
            diseasesSusceptible: ['Rust', 'Powdery Mildew', 'Loose Smut'],
            fertilizerRecommendation: 'NPK (12:32:16) as basal dose, nitrogen in split doses',
            soilType: 'Well-drained loam to clay loam soils',
            tips: [
              'Timely sowing (October-November) for optimal yield',
              'First irrigation at crown root initiation stage',
              'Control weeds in early stages of growth',
              'Monitor for rust diseases, especially in humid conditions'
            ]
          },
          {
            id: 'corn',
            name: 'Corn (Maize)',
            icon: '🌽',
            season: 'Kharif and Rabi',
            waterRequirement: 'medium',
            temperatureRange: '21-30°C',
            growthDuration: '80-110 days',
            pestsSusceptible: ['Fall Army Worm', 'Stem Borer', 'Corn Earworm'],
            diseasesSusceptible: ['Southern Leaf Blight', 'Downy Mildew', 'Stalk Rot'],
            fertilizerRecommendation: 'NPK (15:15:15) at planting, nitrogen at knee-high stage',
            soilType: 'Well-drained sandy loam to silty loam soils',
            tips: [
              'Ensure proper spacing (60x20 cm) for good air circulation',
              'Monitor for fall armyworm, a new invasive pest',
              'Irrigate at critical stages: knee-high, tasseling, and grain filling',
              'Consider intercropping with legumes for soil health'
            ]
          },
          {
            id: 'tomato',
            name: 'Tomato',
            icon: '🍅',
            season: 'Year-round with proper care',
            waterRequirement: 'medium',
            temperatureRange: '20-27°C',
            growthDuration: '90-120 days',
            pestsSusceptible: ['Whitefly', 'Fruit Borer', 'Leaf Miner'],
            diseasesSusceptible: ['Early Blight', 'Late Blight', 'Fusarium Wilt'],
            fertilizerRecommendation: 'NPK (10:10:10) at planting, calcium nitrate during fruiting',
            soilType: 'Well-drained loamy soil rich in organic matter',
            tips: [
              'Stake plants for better air circulation and disease prevention',
              'Prune suckers for indeterminate varieties',
              'Maintain consistent soil moisture to prevent blossom end rot',
              'Apply mulch to suppress weeds and conserve moisture'
            ]
          },
          {
            id: 'potato',
            name: 'Potato',
            icon: '🥔',
            season: 'Rabi (Winter)',
            waterRequirement: 'medium',
            temperatureRange: '15-25°C',
            growthDuration: '75-120 days',
            pestsSusceptible: ['Potato Tuber Moth', 'Aphids', 'Colorado Potato Beetle'],
            diseasesSusceptible: ['Late Blight', 'Early Blight', 'Common Scab'],
            fertilizerRecommendation: 'NPK (15:15:15) at planting, avoid excess nitrogen',
            soilType: 'Well-drained sandy loam soil, slightly acidic',
            tips: [
              'Earth up the soil around plants as they grow',
              'Stop irrigation 2-3 weeks before harvesting',
              'Store seed potatoes in diffused light to promote sprouting',
              'Practice crop rotation to prevent soil-borne diseases'
            ]
          },
          {
            id: 'cotton',
            name: 'Cotton',
            icon: '🧶',
            season: 'Kharif (Monsoon)',
            waterRequirement: 'medium',
            temperatureRange: '21-35°C',
            growthDuration: '150-180 days',
            pestsSusceptible: ['Bollworm', 'Whitefly', 'Jassid'],
            diseasesSusceptible: ['Bacterial Blight', 'Fusarium Wilt', 'Root Rot'],
            fertilizerRecommendation: 'NPK (15:15:15) at planting, additional nitrogen during square formation',
            soilType: 'Deep black cotton soils or alluvial soils',
            tips: [
              'Implement integrated pest management for bollworm control',
              'Monitor for pink bollworm using pheromone traps',
              'Practice topping to promote lateral growth',
              'Consider high-density planting for improved yields'
            ]
          }
        ];
        
        setCrops(mockCrops);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching crops:', error);
        setIsLoading(false);
      }
    };
    
    fetchCrops();
  }, []);
  
  useEffect(() => {
    if (selectedCropId && crops.length > 0) {
      const crop = crops.find(c => c.id === selectedCropId);
      setSelectedCrop(crop || null);
    } else {
      setSelectedCrop(null);
    }
  }, [selectedCropId, crops]);
  
  const getWaterIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <div className="flex items-center"><CloudRain className="h-4 w-4 text-blue-300 mr-1" /> Low</div>;
      case 'medium':
        return <div className="flex items-center"><CloudRain className="h-4 w-4 text-blue-500 mr-1" /> Medium</div>;
      case 'high':
        return <div className="flex items-center"><CloudRain className="h-4 w-4 text-blue-700 mr-1" /> High</div>;
      default:
        return <div className="flex items-center"><CloudRain className="h-4 w-4 text-blue-500 mr-1" /> Medium</div>;
    }
  };
  
  return (
    <AppLayout title="Crop Care" activeTab="home">
      <div className="pt-4 pb-20">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Crop Care Guide</h1>
        </div>
        
        <div className="glass-card p-4 rounded-xl mb-6">
          <label className="block text-sm font-medium mb-2">Select Crop</label>
          <Select value={selectedCropId} onValueChange={setSelectedCropId}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Choose a crop for care information" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Crops</SelectLabel>
                {crops.map(crop => (
                  <SelectItem key={crop.id} value={crop.id}>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{crop.icon}</span>
                      <span>{crop.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {isLoading ? (
          <div className="glass-card p-6 rounded-xl animate-pulse">
            <div className="h-80 bg-muted rounded-lg"></div>
          </div>
        ) : selectedCrop ? (
          <div className="space-y-4">
            {/* Crop Overview */}
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-4xl mr-3">{selectedCrop.icon}</div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedCrop.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Season: {selectedCrop.season}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Thermometer className="h-5 w-5 text-amber-500 mr-2" />
                  <div>
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="text-sm font-medium">{selectedCrop.temperatureRange}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CloudRain className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-xs text-muted-foreground">Water Need</p>
                    <p className="text-sm font-medium">{selectedCrop.waterRequirement}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-agri-green mr-2" />
                  <div>
                    <p className="text-xs text-muted-foreground">Growth Duration</p>
                    <p className="text-sm font-medium">{selectedCrop.growthDuration}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Plant className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <p className="text-xs text-muted-foreground">Soil Type</p>
                    <p className="text-sm font-medium line-clamp-1">{selectedCrop.soilType}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pests & Diseases */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Bug className="h-5 w-5 text-amber-600 mr-2" />
                Common Pests & Diseases
              </h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium">Pests:</h4>
                  <ul className="text-sm ml-5 list-disc">
                    {selectedCrop.pestsSusceptible.map((pest, index) => (
                      <li key={index}>{pest}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium">Diseases:</h4>
                  <ul className="text-sm ml-5 list-disc">
                    {selectedCrop.diseasesSusceptible.map((disease, index) => (
                      <li key={index}>{disease}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Fertilizer & Care */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="text-lg font-medium mb-3">Fertilizer Recommendation</h3>
              <p className="text-sm mb-4">{selectedCrop.fertilizerRecommendation}</p>
              
              <h3 className="text-lg font-medium mb-3">Care Tips</h3>
              <ul className="text-sm space-y-2">
                {selectedCrop.tips.map((tip, index) => (
                  <li key={index} className="flex">
                    <ChevronRight className="h-5 w-5 text-agri-green mr-1 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="glass-card p-6 rounded-xl text-center">
            <Plant className="h-12 w-12 text-agri-green/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Select a Crop</h3>
            <p className="text-muted-foreground">
              Choose a crop from the dropdown above to view detailed care information.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CropCare;
