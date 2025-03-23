
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, Mail, Phone, MapPin, LogOut, 
  Languages, Settings, ChevronRight 
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';

const Profile = () => {
  const { user, logout, getLanguageName } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    navigate('/login');
  };
  
  return (
    <AppLayout title="Profile" activeTab="profile">
      <div className="pt-4 pb-20">
        <div className="glass-card rounded-xl overflow-hidden mb-6">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-agri-green to-agri-green-light"></div>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback className="bg-agri-green text-white text-4xl">
                  {user?.name 
                    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
                    : 'U'
                  }
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <div className="pt-20 pb-6 px-6 text-center">
            <h1 className="text-2xl font-bold">
              {user?.name || 'User'}
            </h1>
            <p className="text-muted-foreground">
              {user?.phone ? `+91 ${user.phone}` : 'Phone number not available'}
            </p>
          </div>
        </div>
        
        <div className="space-y-6 mb-6">
          <h2 className="text-xl font-bold">Settings</h2>
          
          <div className="space-y-4">
            <LanguageSelector />
            
            <ProfileItem 
              icon={<User className="h-5 w-5 text-agri-green" />}
              label="Full Name"
              value={user?.name || 'Not set'}
            />
            
            <ProfileItem 
              icon={<Phone className="h-5 w-5 text-agri-green" />}
              label="Phone Number"
              value={user?.phone ? `+91 ${user.phone}` : 'Not available'}
            />
            
            <ProfileItem 
              icon={<MapPin className="h-5 w-5 text-agri-green" />}
              label="Location"
              value={user?.location || 'Not set'}
            />
            
            <ProfileItem 
              icon={<Languages className="h-5 w-5 text-agri-green" />}
              label="Language"
              value={getLanguageName(user?.language || 'en')}
            />
            
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const ProfileItem = ({ 
  icon, 
  label, 
  value 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
}) => {
  return (
    <div className="flex items-center">
      <div className="w-8 mr-3">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

export default Profile;
