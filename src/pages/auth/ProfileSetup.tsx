
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Camera } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProfileSetup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [soilType, setSoilType] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateProfile, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (email && !validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const fullLocation = [location, city, state].filter(Boolean).join(', ');
      
      await updateProfile({
        name,
        email,
        location: fullLocation || undefined,
        profileImage: profileImage || undefined,
        soilType: soilType || undefined,
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been set up successfully.",
      });
      
      navigate('/language-selection');
    } catch (error) {
      console.error('Profile setup error:', error);
      toast({
        title: "Profile Setup Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Indian states list
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  // Soil types
  const soilTypes = [
    "Alluvial Soil", "Black Cotton Soil", "Red Soil", "Laterite Soil", 
    "Desert Soil", "Mountain Soil", "Saline Soil", "Peaty Soil", "Forest Soil"
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-agri-green/5 to-agri-sky/5">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Set Up Your Profile</h1>
          <p className="text-muted-foreground mt-2">
            Tell us a little about yourself
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col items-center mb-6">
              <div 
                className="relative w-24 h-24 mb-4"
                onClick={() => fileInputRef.current?.click()}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-agri-green/10 flex items-center justify-center border-4 border-white shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-agri-green-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-agri-green text-white p-1.5 rounded-full shadow-md">
                  <Camera size={16} />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Tap to upload a profile picture
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 focus:ring-2 focus:border-agri-green ring-agri-green/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 focus:ring-2 focus:border-agri-green ring-agri-green/20"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  value={user?.phone || ''}
                  className="pl-12 h-12 bg-gray-100"
                  readOnly
                />
                <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-muted-foreground">
                  <span>+91</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="state" className="block text-sm font-medium">
                State
              </label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="h-12 focus:ring-2 focus:border-agri-green ring-agri-green/20">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium">
                City/Village
              </label>
              <Input
                id="city"
                type="text"
                placeholder="Enter your city or village"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-12 focus:ring-2 focus:border-agri-green ring-agri-green/20"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="soilType" className="block text-sm font-medium">
                Soil Type
              </label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger className="h-12 focus:ring-2 focus:border-agri-green ring-agri-green/20">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium">
                Specific Location (Optional)
              </label>
              <Input
                id="location"
                type="text"
                placeholder="Enter specific location details"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 focus:ring-2 focus:border-agri-green ring-agri-green/20"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-agri-green hover:bg-agri-green-dark text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Continue"}
            </Button>
          </form>
        </div>
        
        <div className="mb-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          You can update your profile details anytime later
        </p>
      </div>
    </div>
  );
};

export default ProfileSetup;
