
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, FileImage, Info, Loader2, Upload } from 'lucide-react';

interface DetectionResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string[];
}

const CropDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setDetectionResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = () => {
    // In a real app, this would use the device camera
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDetect = async () => {
    if (!selectedImage) return;

    try {
      setIsDetecting(true);
      setDetectionResult(null);

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock result
      const mockResult: DetectionResult = {
        disease: 'Rice Blast',
        confidence: 0.92,
        description: 'Rice blast is a fungal disease caused by Magnaporthe oryzae. It affects leaves, stems, and panicles, causing significant yield losses if not managed properly.',
        treatment: [
          'Apply fungicides like Tricyclazole or Isoprothiolane.',
          'Maintain proper water management in fields.',
          'Use disease-resistant rice varieties.',
          'Ensure balanced fertilizer application.'
        ]
      };

      setDetectionResult(mockResult);
    } catch (error) {
      console.error('Error detecting disease:', error);
    } finally {
      setIsDetecting(false);
    }
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setDetectionResult(null);
  };

  return (
    <AppLayout title="Crop Doctor" activeTab="doctor">
      <div className="pt-4 pb-20">
        <h1 className="text-xl font-bold mb-4">AI Crop Disease Detection</h1>
        
        <Tabs defaultValue="camera" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera" className="text-sm">Take Photo</TabsTrigger>
            <TabsTrigger value="upload" className="text-sm">Upload Image</TabsTrigger>
          </TabsList>
          <TabsContent value="camera" className="pt-4">
            <div 
              className="w-full aspect-square rounded-lg overflow-hidden glass-card flex items-center justify-center mb-4"
              onClick={handleTakePhoto}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Selected crop" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-agri-green/10 flex items-center justify-center mx-auto mb-3">
                    <Camera className="h-8 w-8 text-agri-green" />
                  </div>
                  <p className="text-muted-foreground">Tap to take a photo of your crop</p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          </TabsContent>
          <TabsContent value="upload" className="pt-4">
            <div
              className="w-full aspect-square rounded-lg overflow-hidden glass-card flex items-center justify-center border-dashed border-2 border-muted-foreground/30 mb-4"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Selected crop" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-agri-green/10 flex items-center justify-center mx-auto mb-3">
                    <Upload className="h-8 w-8 text-agri-green" />
                  </div>
                  <p className="text-muted-foreground">Tap to upload an image of your crop</p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex gap-3 mb-6">
          <Button
            onClick={resetDetection}
            variant="outline"
            className="flex-1"
            disabled={!selectedImage || isDetecting}
          >
            Reset
          </Button>
          <Button
            onClick={handleDetect}
            className="flex-1 bg-agri-green hover:bg-agri-green-dark text-white"
            disabled={!selectedImage || isDetecting}
          >
            {isDetecting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : 'Detect Disease'}
          </Button>
        </div>
        
        {detectionResult && (
          <div className="glass-card rounded-lg p-4 animate-fade-in">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{detectionResult.disease}</h3>
                <div className="badge badge-primary">
                  {Math.round(detectionResult.confidence * 100)}% Match
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {detectionResult.description}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium flex items-center mb-2">
                <Info className="h-4 w-4 mr-1" />
                Recommended Treatment
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {detectionResult.treatment.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            <Info className="h-4 w-4 mr-1" />
            For accurate results, ensure the leaf is well-lit and focused
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default CropDiseaseDetection;
