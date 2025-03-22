
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

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const getLanguageName = (code: string | undefined) => {
    if (!code) return 'English';
    
    const languages: Record<string, string> = {
      en: 'English',
      hi: 'Hindi',
      mr: 'Marathi',
      gu: 'Gujarati',
      ta: 'Tamil',
      te: 'Telugu',
      kn: 'Kannada',
      ml: 'Malayalam',
      pa: 'Punjabi',
    };
    
    return languages[code] || 'English';
  };
  
  return (
    <AppLayout title="Profile" activeTab="home">
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
        
        <div className="space-y-4">
          {/* Profile Info */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-b-border">
              <h2 className="text-lg font-medium">Profile Information</h2>
            </div>
            
            <div className="p-4 space-y-4">
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
                value={getLanguageName(user?.language)}
              />
            </div>
          </div>
          
          {/* Settings */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-b-border">
              <h2 className="text-lg font-medium">Settings</h2>
            </div>
            
            <div>
              <button 
                className="flex items-center justify-between w-full p-4 border-b border-b-border hover:bg-muted/30 transition-colors"
                onClick={() => navigate('/language-selection')}
              >
                <div className="flex items-center">
                  <Languages className="h-5 w-5 text-agri-green mr-3" />
                  <span>Change Language</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              
              <button 
                className="flex items-center justify-between w-full p-4 border-b border-b-border hover:bg-muted/30 transition-colors"
                onClick={() => navigate('/profile-setup')}
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-agri-green mr-3" />
                  <span>Edit Profile</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              
              <button 
                className="flex items-center justify-between w-full p-4 text-red-500 hover:bg-red-500/10 transition-colors"
                onClick={handleLogout}
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
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
