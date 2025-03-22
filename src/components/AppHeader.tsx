import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Leaf, Menu, MessageCircle, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription, 
  DialogHeader,
  DialogFooter
} from '@/components/ui/dialog';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showNotifications?: boolean;
}

const AppHeader = ({ 
  title = "AgriSmart", 
  showBackButton = false,
  showNotifications = true 
}: AppHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasNotifications, setHasNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    setHasNotifications(true);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getName = () => {
    if (user?.name) {
      return user.name.split(' ')[0];
    }
    return 'User';
  };

  const getInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(name => name[0].toUpperCase()).join('');
    }
    return 'U';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 transition-all duration-300 ${
        isScrolled ? 'glass shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-background/50">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="glass border-r border-r-white/20">
              <div className="flex flex-col h-full">
                <div className="py-6">
                  <h2 className="text-xl font-semibold text-agri-green">AgriSmart</h2>
                </div>
                <nav className="space-y-1 flex-1">
                  <MenuItem onClick={() => navigate('/')} icon="home" label="Home" />
                  <MenuItem onClick={() => navigate('/profile')} icon="user" label="Profile" />
                  <MenuItem onClick={() => navigate('/crop-disease')} icon="leaf" label="Crop Doctor" />
                  <MenuItem onClick={() => navigate('/community')} icon="users" label="Community" />
                  <MenuItem onClick={() => navigate('/chat-support')} icon="message-circle" label="Chat Support" />
                  <MenuItem onClick={() => navigate('/crop-care')} icon="sprout" label="Crop Care" />
                  <MenuItem onClick={() => navigate('/fertilizer-calculator')} icon="calculator" label="Fertilizer Calculator" />
                  <MenuItem onClick={() => navigate('/weather')} icon="cloud" label="Weather Forecast" />
                </nav>
                <div className="py-4 border-t border-t-white/10">
                  <LogoutButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-medium">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {showNotifications && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-foreground hover:bg-background/50"
              onClick={() => setNotificationOpen(true)}
            >
              <Bell size={22} />
              {hasNotifications && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            className="relative overflow-hidden rounded-full"
            onClick={() => navigate('/profile')}
          >
            <Avatar className="h-8 w-8 border border-primary/20">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback className="bg-agri-green text-white text-sm">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>

      <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>
              Your recent updates and alerts will appear here
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex gap-3 p-3 border-b border-border pb-3">
              <div className="bg-agri-green/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="h-5 w-5 text-agri-green" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Crop Health Update</h4>
                <p className="text-sm text-muted-foreground">New recommendations for your crops are available</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 border-b border-border pb-3">
              <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Weather Alert</h4>
                <p className="text-sm text-muted-foreground">Heavy rain expected in your region tomorrow</p>
                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotificationOpen(false)}>Close</Button>
            <Button onClick={() => setNotificationOpen(false)}>Mark all as read</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

const MenuItem = ({ onClick, icon, label }: { onClick: () => void, icon: string, label: string }) => {
  let IconComponent;
  
  switch(icon) {
    case 'home':
      IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>;
      break;
    case 'user':
      IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>;
      break;
    case 'leaf':
      IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21c3.834 0 7.5-1.5 7.5-6s-3.666-6-7.5-6c1.5 3 2 6 0 12zm14-6c0 4.5-3.666 6-7.5 6 1.5-6 1-9 0-12 3.834 0 7.5 1.5 7.5 6z" />
      </svg>;
      break;
    case 'shopping-bag':
      IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>;
      break;
    case 'users':
      IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>;
      break;
    case 'message-circle':
      IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>;
      break;
    case 'calculator':
      IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>;
      break;
    case 'cloud':
      IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>;
      break;
    case 'sprout':
      IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10h-5c0 2.761-2.239 5-5 5s-5-2.239-5-5H2c0 5.523 4.477 10 10 10zm0-15v5M4 7h8m8 0h-4" />
      </svg>;
      break;
    default:
      IconComponent = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>;
  }
  
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors hover:bg-agri-green/10 text-foreground"
    >
      <span className="text-agri-green">{IconComponent}</span>
      {label}
    </button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-md text-red-500 transition-colors hover:bg-red-500/10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Logout
    </button>
  );
};

export default AppHeader;

