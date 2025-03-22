
import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Droplets, Sun, Thermometer, Wind } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  wind: number;
}

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Mock API call to get weather data
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        // In a real app, fetch data from a weather API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockWeather: WeatherData = {
          temperature: 29,
          humidity: 68,
          condition: 'sunny',
          wind: 10,
        };
        
        setWeather(mockWeather);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWeather();
  }, []);
  
  if (isLoading) {
    return (
      <div className="glass-card p-4 rounded-xl animate-pulse">
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }
  
  if (!weather) {
    return null;
  }
  
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="h-10 w-10 text-amber-400" />;
      case 'cloudy':
        return <Cloud className="h-10 w-10 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="h-10 w-10 text-blue-400" />;
      case 'stormy':
        return <CloudRain className="h-10 w-10 text-purple-400" />;
      default:
        return <Sun className="h-10 w-10 text-amber-400" />;
    }
  };
  
  return (
    <div className="glass-card overflow-hidden rounded-xl transition-all duration-300 animate-slide-up">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-agri-sky to-agri-sky-light opacity-15 z-0"></div>
        <div className="p-4 relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {getWeatherIcon()}
              <div>
                <h3 className="text-2xl font-bold">{weather.temperature}°C</h3>
                <p className="text-sm text-muted-foreground capitalize">{weather.condition}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-sm">
                <Droplets className="h-4 w-4 text-agri-sky" />
                <span>{weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Wind className="h-4 w-4 text-agri-sky" />
                <span>{weather.wind} km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
