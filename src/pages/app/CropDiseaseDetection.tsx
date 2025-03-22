
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Camera, Upload, ChevronLeft, RefreshCw, AlertCircle, CheckCircle2, Info } from 'lucide-react';

const CropDiseaseDetection = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Cleanup camera stream when component unmounts
    return () => {
      stopCamera();
    };
  }, []);
  
  const startCamera = async () => {
    try {
      // Close previous stream if exists
      stopCamera();
      
      setCameraError(null);
      setIsCameraOpen(true);
      
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      // Store stream in ref to stop it later
      streamRef.current = stream;
      
      // Set video source
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setHasCameraPermission(true);
      
    } catch (error) {
      console.error('Camera access error:', error);
      setHasCameraPermission(false);
      setCameraError(`Camera access denied: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsCameraOpen(false);
      
      toast({
        title: "Camera Access Denied",
        description: "Please enable camera access for disease detection.",
        variant: "destructive",
      });
    }
  };
  
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };
  
  const captureImage = () => {
    if (videoRef.current && canvasRef.current && streamRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to image data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setImage(imageDataUrl);
        
        // Stop camera after capture
        stopCamera();
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const analyzeImage = () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate API call to disease detection service
    setTimeout(() => {
      // Mock results
      const mockResults = [
        {
          disease: "Early Blight",
          confidence: 0.92,
          description: "Fungal disease characterized by small brown spots with concentric rings that form a target-like pattern on lower leaves.",
          treatment: "Remove infected leaves, apply copper-based fungicide, ensure proper plant spacing for air circulation.",
          severity: "moderate"
        },
        {
          disease: "Healthy",
          confidence: 0.08,
          description: "",
          treatment: "",
          severity: "none"
        }
      ];
      
      setResult(mockResults[0]);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const resetAll = () => {
    setImage(null);
    setResult(null);
    setIsCameraOpen(false);
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-amber-500';
      case 'moderate':
        return 'text-orange-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-green-500';
    }
  };
  
  return (
    <AppLayout title="Crop Disease Detection" activeTab="home">
      <div className="pt-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Crop Disease Detection</h1>
          </div>
          
          {image && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={resetAll}
              className="rounded-full"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {isCameraOpen ? (
          <div className="glass-card p-3 rounded-xl mb-6 overflow-hidden">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
                onCanPlay={() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                  }
                }}
              />
              
              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4 text-center">
                  <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
                  <h3 className="font-medium mb-1">Camera Error</h3>
                  <p className="text-sm text-gray-300">{cameraError}</p>
                </div>
              )}
              
              <Button
                onClick={captureImage}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black hover:bg-gray-200 rounded-full h-14 w-14 flex items-center justify-center"
              >
                <div className="h-10 w-10 rounded-full border-2 border-black"></div>
              </Button>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
            
            <div className="flex justify-between mt-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={stopCamera}
              >
                Cancel
              </Button>
              
              <div className="text-xs text-muted-foreground flex items-center">
                <Info className="h-3 w-3 mr-1" />
                Position plant leaf in the frame
              </div>
            </div>
          </div>
        ) : image ? (
          <div className="glass-card p-3 rounded-xl mb-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt="Crop Image" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {!result && !isAnalyzing && (
              <div className="flex justify-between items-center mt-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetAll}
                >
                  Reset
                </Button>
                
                <Button 
                  onClick={analyzeImage}
                  className="bg-agri-green hover:bg-agri-green-dark text-white"
                >
                  Analyze Image
                </Button>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="mt-4 text-center p-4">
                <div className="animate-spin h-8 w-8 border-4 border-agri-green border-t-transparent rounded-full mx-auto mb-3"></div>
                <p className="text-muted-foreground">Analyzing your crop image...</p>
                <p className="text-xs text-muted-foreground mt-1">This may take a few moments</p>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card p-6 rounded-xl mb-6">
            <div className="text-center">
              <div className="h-16 w-16 bg-agri-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-agri-green" />
              </div>
              <h2 className="text-lg font-medium mb-2">Capture Plant Image</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Take a clear photo of the plant leaf to detect diseases
              </p>
              
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={startCamera}
                  className="bg-agri-green hover:bg-agri-green-dark text-white"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Open Camera
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        )}
        
        {result && (
          <div className="glass-card p-4 rounded-xl">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-medium">Analysis Results</h2>
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-agri-green/10 text-agri-green">
                {Math.round(result.confidence * 100)}% Confidence
              </div>
            </div>
            
            <div className="border-l-4 border-amber-500 pl-3 py-1 mb-4">
              <div className="flex items-center">
                <AlertCircle className={`h-5 w-5 mr-2 ${result.disease === 'Healthy' ? 'text-green-500' : 'text-amber-500'}`} />
                <h3 className="font-bold text-lg">{result.disease}</h3>
              </div>
              <p className={`text-sm ${getSeverityColor(result.severity)} font-medium`}>
                {result.severity === 'none' ? 'No treatment needed' : `${result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} severity`}
              </p>
            </div>
            
            {result.description && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-1">Description:</h3>
                <p className="text-sm text-muted-foreground">{result.description}</p>
              </div>
            )}
            
            {result.treatment && (
              <div>
                <h3 className="text-sm font-medium mb-1">Recommended Treatment:</h3>
                <ul className="text-sm text-muted-foreground ml-5 list-disc">
                  {result.treatment.split(', ').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-muted">
              <Button 
                onClick={resetAll}
                className="w-full bg-agri-green hover:bg-agri-green-dark text-white"
              >
                Scan Another Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CropDiseaseDetection;
