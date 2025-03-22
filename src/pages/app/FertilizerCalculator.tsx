
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calculator, Info, Leaf, AlertCircle } from 'lucide-react';

const cropTypes = [
  { value: 'rice', label: 'Rice', icon: '🌾' },
  { value: 'wheat', label: 'Wheat', icon: '🌿' },
  { value: 'corn', label: 'Corn', icon: '🌽' },
  { value: 'cotton', label: 'Cotton', icon: '🧶' },
  { value: 'sugarcane', label: 'Sugarcane', icon: '🍡' },
  { value: 'vegetables', label: 'Vegetables', icon: '🥬' },
];

const soilTypes = [
  { value: 'sandy', label: 'Sandy Soil' },
  { value: 'clay', label: 'Clay Soil' },
  { value: 'loamy', label: 'Loamy Soil' },
  { value: 'silty', label: 'Silty Soil' },
  { value: 'chalky', label: 'Chalky Soil' },
  { value: 'peaty', label: 'Peaty Soil' },
];

interface FertilizerRecommendation {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  recommendations: string[];
}

const FertilizerCalculator = () => {
  const [cropType, setCropType] = useState<string>('');
  const [soilType, setSoilType] = useState<string>('');
  const [landSize, setLandSize] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [recommendation, setRecommendation] = useState<FertilizerRecommendation | null>(null);
  
  const handleCalculate = () => {
    if (!cropType || !soilType || !landSize) {
      // Show error
      return;
    }
    
    // Convert land size to number
    const sizeInAcres = parseFloat(landSize);
    
    // Mock calculation logic
    let baseN = 0, baseP = 0, baseK = 0;
    
    // Base values based on crop type
    switch (cropType) {
      case 'rice':
        baseN = 100;
        baseP = 50;
        baseK = 50;
        break;
      case 'wheat':
        baseN = 120;
        baseP = 60;
        baseK = 40;
        break;
      case 'corn':
        baseN = 150;
        baseP = 70;
        baseK = 70;
        break;
      case 'cotton':
        baseN = 110;
        baseP = 55;
        baseK = 65;
        break;
      case 'sugarcane':
        baseN = 160;
        baseP = 80;
        baseK = 80;
        break;
      case 'vegetables':
        baseN = 130;
        baseP = 65;
        baseK = 60;
        break;
      default:
        baseN = 100;
        baseP = 50;
        baseK = 50;
    }
    
    // Adjust based on soil type
    let soilFactor = 1;
    switch (soilType) {
      case 'sandy':
        baseN *= 1.2;
        baseP *= 0.9;
        baseK *= 1.1;
        break;
      case 'clay':
        baseN *= 0.9;
        baseP *= 1.2;
        baseK *= 0.8;
        break;
      case 'loamy':
        baseN *= 1;
        baseP *= 1;
        baseK *= 1;
        break;
      case 'silty':
        baseN *= 1.1;
        baseP *= 0.8;
        baseK *= 1.2;
        break;
      case 'chalky':
        baseN *= 1.3;
        baseP *= 0.7;
        baseK *= 1.1;
        break;
      case 'peaty':
        baseN *= 0.8;
        baseP *= 1.3;
        baseK *= 0.9;
        break;
    }
    
    // Scale by land size
    const nitrogenPerAcre = Math.round(baseN * sizeInAcres);
    const phosphorusPerAcre = Math.round(baseP * sizeInAcres);
    const potassiumPerAcre = Math.round(baseK * sizeInAcres);
    
    // Generate recommendations
    const recommendations = [];
    
    if (cropType === 'rice') {
      recommendations.push('Apply nitrogen in three splits: 50% at basal, 25% at active tillering, and 25% at panicle initiation.');
      recommendations.push('Apply phosphorus and potassium at the time of land preparation.');
      recommendations.push('Consider using slow-release fertilizers in rainy season to reduce nutrient loss.');
    } else if (cropType === 'wheat') {
      recommendations.push('Apply nitrogen in two splits: 50% at sowing and 50% at first irrigation.');
      recommendations.push('Apply full dose of phosphorus and potassium at the time of sowing.');
      recommendations.push('Use foliar spray of micronutrients at heading stage for better grain filling.');
    } else {
      recommendations.push('Apply fertilizers in splits for better nutrient utilization.');
      recommendations.push('Consider soil test for more accurate recommendations.');
      recommendations.push('Use organic fertilizers along with chemical fertilizers for better soil health.');
    }
    
    setRecommendation({
      nitrogen: nitrogenPerAcre,
      phosphorus: phosphorusPerAcre,
      potassium: potassiumPerAcre,
      recommendations
    });
    
    setShowResults(true);
  };
  
  const resetCalculator = () => {
    setCropType('');
    setSoilType('');
    setLandSize('');
    setShowResults(false);
    setRecommendation(null);
  };
  
  return (
    <AppLayout title="Fertilizer Calculator" activeTab="home">
      <div className="pt-4 pb-20">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-agri-green/10 rounded-lg text-agri-green">
            <Calculator className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">Fertilizer Calculator</h1>
        </div>
        
        {!showResults ? (
          <div className="glass-card rounded-xl p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="crop-type" className="block text-sm font-medium">
                  Crop Type
                </label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger id="crop-type" className="w-full h-12 focus:ring-2 ring-primary/20">
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropTypes.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{crop.icon}</span>
                          <span>{crop.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="soil-type" className="block text-sm font-medium">
                  Soil Type
                </label>
                <Select value={soilType} onValueChange={setSoilType}>
                  <SelectTrigger id="soil-type" className="w-full h-12 focus:ring-2 ring-primary/20">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil.value} value={soil.value}>
                        {soil.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="land-size" className="block text-sm font-medium">
                  Land Size (in acres)
                </label>
                <Input
                  id="land-size"
                  type="number"
                  placeholder="Enter land size"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
                  className="h-12 focus:ring-2 ring-primary/20"
                  min="0.1"
                  step="0.1"
                />
              </div>
              
              <div className="pt-2">
                <Button
                  onClick={handleCalculate}
                  className="w-full h-12 bg-agri-green hover:bg-agri-green-dark text-white"
                  disabled={!cropType || !soilType || !landSize}
                >
                  Calculate Fertilizer Needs
                </Button>
              </div>
              
              <div className="flex items-start pt-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  This calculator provides general fertilizer recommendations. For more accurate results, consider soil testing services.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-agri-green" />
                Fertilizer Recommendation Results
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="glass-card bg-gradient-to-br from-agri-green/10 to-transparent rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Nitrogen (N)</p>
                  <p className="text-2xl font-bold text-agri-green">{recommendation?.nitrogen}</p>
                  <p className="text-xs">kg per {landSize} acres</p>
                </div>
                
                <div className="glass-card bg-gradient-to-br from-blue-500/10 to-transparent rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Phosphorus (P)</p>
                  <p className="text-2xl font-bold text-blue-500">{recommendation?.phosphorus}</p>
                  <p className="text-xs">kg per {landSize} acres</p>
                </div>
                
                <div className="glass-card bg-gradient-to-br from-amber-500/10 to-transparent rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Potassium (K)</p>
                  <p className="text-2xl font-bold text-amber-500">{recommendation?.potassium}</p>
                  <p className="text-xs">kg per {landSize} acres</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Application Recommendations:</h3>
                <ul className="space-y-2">
                  {recommendation?.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-agri-green">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 flex items-start p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-500">Important Note</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    These are general recommendations. Actual fertilizer needs may vary based on soil test results and local conditions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={resetCalculator}
                variant="outline"
              >
                Calculate Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default FertilizerCalculator;
