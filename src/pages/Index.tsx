
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-agri-green-light/20 to-agri-sky-light/20">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-agri-green">Welcome to Anajika</h1>
        <p className="text-xl text-gray-600 mb-8">Your smart farming companion</p>
        <div className="space-y-4">
          <Button 
            className="w-full bg-agri-green hover:bg-agri-green-dark"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
