
import React, { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const crops = [
  { id: 'rice', name: 'Rice' },
  { id: 'wheat', name: 'Wheat' },
  { id: 'cotton', name: 'Cotton' },
  { id: 'sugarcane', name: 'Sugarcane' },
  { id: 'maize', name: 'Maize' },
  { id: 'potato', name: 'Potato' },
  { id: 'tomato', name: 'Tomato' },
  { id: 'onion', name: 'Onion' },
];

const CropSelector = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const { toast } = useToast();

  const handleCropChange = (value: string) => {
    setSelectedCrop(value);
    toast({
      title: "Crop Selected",
      description: `You selected ${crops.find(crop => crop.id === value)?.name}`,
    });
  };

  return (
    <div className="rounded-lg glass-card p-4">
      <h3 className="text-sm font-medium mb-2">Select Your Crop</h3>
      <Select value={selectedCrop} onValueChange={handleCropChange}>
        <SelectTrigger className="h-10 bg-white/50 dark:bg-black/20">
          <SelectValue placeholder="Select a crop" />
        </SelectTrigger>
        <SelectContent>
          {crops.map((crop) => (
            <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CropSelector;
