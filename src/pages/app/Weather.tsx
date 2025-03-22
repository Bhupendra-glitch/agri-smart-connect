
import { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { 
  Cloud, CloudRain, Droplets, Sun, Thermometer, 
  Wind, Calendar, CloudDrizzle, CloudLightning, CloudSnow 
} from 'lucide-react';

interface WeatherData {
  date: string;
  temperature: number;
  humidity: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'drizzle' | 'snow';
  wind: number;
  rainfall: number;
  description: string;
}

interface ForecastData {
  today: WeatherData;
  forecast: WeatherData[];
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Mock API call to get weather data
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        // In a real app, fetch data from a weather API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const today = new Date();
        const mockWeather: ForecastData = {
          today: {
            date: today.toLocaleDateString(),
            temperature: 29,
            humidity: 68,
            condition: 'sunny',
            wind: 10,
            rainfall: 0,
            description: 'Clear sky with occasional clouds',
          },
          forecast: [
            {
              date: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
              temperature: 28,
              humidity: 72,
              condition: 'cloudy',
              wind: 8,
              rainfall: 0,
              description: 'Partly cloudy with mild winds',
            },
            {
              date: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
              temperature: 27,
              humidity: 80,
              condition: 'drizzle',
              wind: 12,
              rainfall: 2.5,
              description: 'Light drizzle expected in the evening',
            },
            {
              date: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
              temperature: 25,
              humidity: 85,
              condition: 'rainy',
              wind: 15,
              rainfall: 15,
              description: 'Heavy rainfall expected throughout the day',
            },
            {
              date: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
              temperature: 26,
              humidity: 78,
              condition: 'cloudy',
              wind: 10,
              rainfall: 0,
              description: 'Overcast with chances of clearing later',
            },
            {
              date: new Date(today.setDate(today.getDate() + 1)).toLocaleDateString(),
              temperature: 28,
              humidity: 65,
              condition: 'sunny',
              wind: 6,
              rainfall: 0,
              description: 'Clear skies with ample sunshine',
            },
          ],
        };
        
        setWeatherData(mockWeather);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWeather();
  }, []);
  
  const getWeatherIcon = (condition: string, size = 'large') => {
    const iconSize = size === 'large' ? 'h-16 w-16' : 'h-8 w-8';
    
    switch (condition) {
      case 'sunny':
        return <Sun className={`${iconSize} text-amber-400`} />;
      case 'cloudy':
        return <Cloud className={`${iconSize} text-gray-400`} />;
      case 'rainy':
        return <CloudRain className={`${iconSize} text-blue-400`} />;
      case 'stormy':
        return <CloudLightning className={`${iconSize} text-purple-400`} />;
      case 'drizzle':
        return <CloudDrizzle className={`${iconSize} text-blue-300`} />;
      case 'snow':
        return <CloudSnow className={`${iconSize} text-indigo-200`} />;
      default:
        return <Sun className={`${iconSize} text-amber-400`} />;
    }
  };
  
  return (
    <AppLayout title="Weather Forecast" activeTab="home">
      <div className="pt-4 pb-20">
        <h1 className="text-xl font-bold mb-6">Weather Forecast</h1>
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="glass-card p-6 rounded-xl animate-pulse">
              <div className="h-40 bg-muted rounded-lg"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="glass-card rounded-lg p-4 animate-pulse">
                  <div className="h-24 bg-muted rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        ) : weatherData ? (
          <div className="space-y-6">
            {/* Today's Weather */}
            <div className="glass-card overflow-hidden rounded-xl">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-agri-sky to-agri-sky-light opacity-15 z-0"></div>
                <div className="p-6 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      {getWeatherIcon(weatherData.today.condition)}
                      <div className="ml-4">
                        <h2 className="text-2xl font-bold">{weatherData.today.temperature}°C</h2>
                        <p className="text-lg text-muted-foreground capitalize">
                          {weatherData.today.condition}
                        </p>
                        <p className="text-sm">Today • {weatherData.today.date}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Droplets className="h-6 w-6 mr-2 text-agri-sky" />
                        <div>
                          <p className="text-sm text-muted-foreground">Humidity</p>
                          <p className="font-medium">{weatherData.today.humidity}%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Wind className="h-6 w-6 mr-2 text-agri-sky" />
                        <div>
                          <p className="text-sm text-muted-foreground">Wind</p>
                          <p className="font-medium">{weatherData.today.wind} km/h</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <CloudRain className="h-6 w-6 mr-2 text-agri-sky" />
                        <div>
                          <p className="text-sm text-muted-foreground">Rainfall</p>
                          <p className="font-medium">{weatherData.today.rainfall} mm</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Thermometer className="h-6 w-6 mr-2 text-agri-sky" />
                        <div>
                          <p className="text-sm text-muted-foreground">Feels Like</p>
                          <p className="font-medium">{weatherData.today.temperature + 2}°C</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-agri-sky/20">
                    <p className="text-sm">
                      <span className="font-medium">Today:</span> {weatherData.today.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 5-Day Forecast */}
            <div>
              <h2 className="text-lg font-medium mb-3 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-agri-green" />
                5-Day Forecast
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="glass-card rounded-lg p-4 transition-all duration-200 hover:translate-y-[-2px]">
                    <p className="text-sm font-medium mb-2">{day.date}</p>
                    <div className="flex items-center mb-2">
                      {getWeatherIcon(day.condition, 'small')}
                      <div className="ml-2">
                        <p className="font-bold">{day.temperature}°C</p>
                        <p className="text-xs text-muted-foreground capitalize">{day.condition}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center">
                        <Droplets className="h-3 w-3 mr-1 text-agri-sky" />
                        <span>{day.humidity}%</span>
                      </div>
                      <div className="flex items-center">
                        <Wind className="h-3 w-3 mr-1 text-agri-sky" />
                        <span>{day.wind} km/h</span>
                      </div>
                      <div className="flex items-center col-span-2">
                        <CloudRain className="h-3 w-3 mr-1 text-agri-sky" />
                        <span>{day.rainfall} mm</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Weather Advisory */}
            <div className="glass-card rounded-xl p-4">
              <h2 className="text-lg font-medium mb-2">Agricultural Advisory</h2>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  Based on the current weather forecast, here are recommendations for your crops:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ensure proper drainage in your rice fields to prepare for expected rainfall in 2 days.</li>
                  <li>Consider delaying any scheduled fertilizer application until after the rainy period.</li>
                  <li>Monitor for pests as humidity levels will increase, creating favorable conditions for infestations.</li>
                  <li>Cover seedlings and young plants to protect from heavy rainfall.</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Failed to load weather data.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Weather;
