
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sprout, Search, ArrowLeft } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const crops = [
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    waterRequirement: 'High',
    growingSeason: 'Kharif',
    soilType: 'Clay loam',
    fertilizers: ['Urea', 'DAP', 'Potash'],
    commonDiseases: ['Rice blast', 'Bacterial leaf blight', 'Sheath blight'],
    growthDuration: '120-150 days',
    image: 'https://images.unsplash.com/photo-1536054695850-b7fa42273826?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    waterRequirement: 'Moderate',
    growingSeason: 'Rabi',
    soilType: 'Loam to clay loam',
    fertilizers: ['Urea', 'DAP', 'Zinc sulphate'],
    commonDiseases: ['Rust', 'Smut', 'Powdery mildew'],
    growthDuration: '100-150 days',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6962f4?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    waterRequirement: 'Moderate',
    growingSeason: 'Kharif',
    soilType: 'Black soil, alluvial soil',
    fertilizers: ['Urea', 'SSP', 'Potash'],
    commonDiseases: ['Bollworm', 'Wilt', 'Leaf curl virus'],
    growthDuration: '150-180 days',
    image: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=200&auto=format&fit=crop'
  }
];

const CropCare = () => {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedCropData = crops.find(crop => crop.id === selectedCrop);
  
  const filteredCrops = searchQuery 
    ? crops.filter(crop => 
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase()))
    : crops;

  return (
    <AppLayout title="Crop Care" activeTab="crop-care">
      <div className="pt-4 pb-20">
        <div className="mb-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Crop Care Guide</h1>
        </div>
        
        <div className="glass-card p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search crops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-8"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map(crop => (
                  <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedCropData ? (
            <div className="animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="sm:w-1/3 h-40 rounded-lg overflow-hidden">
                  <img 
                    src={selectedCropData.image} 
                    alt={selectedCropData.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:w-2/3">
                  <h2 className="text-xl font-bold mb-1">{selectedCropData.name}</h2>
                  <p className="text-sm text-muted-foreground italic mb-2">{selectedCropData.scientificName}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Growing Season:</p>
                      <p>{selectedCropData.growingSeason}</p>
                    </div>
                    <div>
                      <p className="font-medium">Water Requirement:</p>
                      <p>{selectedCropData.waterRequirement}</p>
                    </div>
                    <div>
                      <p className="font-medium">Soil Type:</p>
                      <p>{selectedCropData.soilType}</p>
                    </div>
                    <div>
                      <p className="font-medium">Growth Duration:</p>
                      <p>{selectedCropData.growthDuration}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-md font-bold mb-2">Recommended Fertilizers</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCropData.fertilizers.map((fertilizer, index) => (
                      <span key={index} className="px-3 py-1 bg-agri-green/10 text-agri-green rounded-full text-sm">
                        {fertilizer}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-bold mb-2">Common Diseases & Prevention</h3>
                  <div className="space-y-2">
                    {selectedCropData.commonDiseases.map((disease, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-muted/40 rounded-md">
                        <div className="text-orange-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{disease}</p>
                          <p className="text-sm text-muted-foreground">
                            Regular monitoring and appropriate fungicide application can help prevent {disease}.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-medium mb-3">Select a crop to see detailed care information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredCrops.map(crop => (
                  <div 
                    key={crop.id}
                    className="flex items-center gap-3 p-3 glass-card rounded-lg cursor-pointer hover:shadow-md transition-all"
                    onClick={() => setSelectedCrop(crop.id)}
                  >
                    <div className="h-12 w-12 bg-agri-green/10 rounded-full flex items-center justify-center">
                      <Sprout className="h-6 w-6 text-agri-green" />
                    </div>
                    <div>
                      <h3 className="font-medium">{crop.name}</h3>
                      <p className="text-xs text-muted-foreground">{crop.scientificName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default CropCare;
