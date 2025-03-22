
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Camera } from 'lucide-react';

const ProfileSetup = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateProfile } = useAuth();
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
    
    try {
      setIsLoading(true);
      
      await updateProfile({
        name,
        location: location || undefined,
        profileImage: profileImage || undefined,
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
                Full Name
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
              <label htmlFor="location" className="block text-sm font-medium">
                Location (Optional)
              </label>
              <Input
                id="location"
                type="text"
                placeholder="Enter your village/town"
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
        
        <p className="text-center text-sm text-muted-foreground">
          You can update your profile details anytime later
        </p>
      </div>
    </div>
  );
};

export default ProfileSetup;
