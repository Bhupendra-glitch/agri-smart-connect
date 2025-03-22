
import { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { 
  Cloud, CloudRain, Droplets, Sun, Thermometer, 
  Wind, Calendar, CloudDrizzle, CloudLightning, CloudSnow,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface WeatherData {
  date: string;
  temperature: {
    min: number;
    max: number;
    current: number;
  };
  humidity: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'drizzle' | 'snow';
  wind: number;
  rainfall: number;
  description: string;
  uvIndex: number;
  pressure: number;
  visibility: number;
}

interface ForecastData {
  today: WeatherData;
  forecast: WeatherData[];
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Mock API call to get weather data
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        // In a real app, fetch data from a weather API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - more comprehensive 10-day forecast
        const today = new Date();
        const mockWeather: ForecastData = {
          today: {
            date: today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }),
            temperature: {
              min: 24,
              max: 32,
              current: 29
            },
            humidity: 68,
            condition: 'sunny',
            wind: 10,
            rainfall: 0,
            description: 'Clear sky with occasional clouds',
            uvIndex: 8,
            pressure: 1012,
            visibility: 10
          },
          forecast: Array.from({ length: 9 }, (_, index) => {
            const forecastDate = new Date();
            forecastDate.setDate(today.getDate() + index + 1);
            
            // Generate varied weather conditions
            const conditions = ['sunny', 'cloudy', 'rainy', 'drizzle', 'cloudy', 'sunny', 'sunny', 'cloudy', 'rainy'];
            const condition = conditions[index % conditions.length] as 'sunny' | 'cloudy' | 'rainy' | 'drizzle' | 'stormy' | 'snow';
            
            // Get rainfall based on condition
            const rainfall = condition === 'rainy' ? Math.floor(Math.random() * 20) + 5 : 
                             condition === 'drizzle' ? Math.floor(Math.random() * 5) + 1 : 0;
            
            // Varied temperatures that make sense in a sequence
            const baseTemp = 28 - (index % 3);
            const minTemp = baseTemp - Math.floor(Math.random() * 4);
            const maxTemp = baseTemp + Math.floor(Math.random() * 4);
            
            return {
              date: forecastDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }),
              temperature: {
                min: minTemp,
                max: maxTemp,
                current: Math.floor((minTemp + maxTemp) / 2)
              },
              humidity: Math.floor(Math.random() * 30) + 55, // 55-85%
              condition,
              wind: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
              rainfall,
              description: getWeatherDescription(condition, rainfall),
              uvIndex: condition === 'sunny' ? Math.floor(Math.random() * 5) + 5 : Math.floor(Math.random() * 4) + 1,
              pressure: Math.floor(Math.random() * 20) + 1000, // 1000-1020 hPa
              visibility: condition === 'rainy' || condition === 'drizzle' ? Math.floor(Math.random() * 5) + 5 : 10 // 5-10 km in rain, 10 otherwise
            };
          })
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
  
  const getWeatherDescription = (condition: string, rainfall: number): string => {
    switch (condition) {
      case 'sunny':
        return 'Clear skies with ample sunshine';
      case 'cloudy':
        return 'Partly cloudy with mild winds';
      case 'rainy':
        return rainfall > 10 ? 'Heavy rainfall expected throughout the day' : 'Light to moderate rainfall expected';
      case 'drizzle':
        return 'Light drizzle expected intermittently';
      case 'stormy':
        return 'Thunderstorms with strong winds';
      case 'snow':
        return 'Light snowfall expected';
      default:
        return 'Mixed weather conditions';
    }
  };
  
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
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">10-Day Weather Forecast</h1>
        </div>
        
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
                        <h2 className="text-2xl font-bold">{weatherData.today.temperature.current}°C</h2>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-red-500">H: {weatherData.today.temperature.max}°</span>
                          <span className="text-blue-500">L: {weatherData.today.temperature.min}°</span>
                        </div>
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
                          <p className="font-medium">{weatherData.today.temperature.current + 1}°C</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-agri-sky/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <div className="h-6 w-6 mr-2 text-center text-amber-500 font-bold text-sm">UV</div>
                        <div>
                          <p className="text-sm text-muted-foreground">UV Index</p>
                          <p className="font-medium">{weatherData.today.uvIndex} {weatherData.today.uvIndex > 7 ? '(High)' : weatherData.today.uvIndex > 4 ? '(Moderate)' : '(Low)'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-6 w-6 mr-2 text-center text-agri-sky font-bold text-sm">P</div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pressure</p>
                          <p className="font-medium">{weatherData.today.pressure} hPa</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-6 w-6 mr-2 text-center text-gray-500 font-bold text-sm">V</div>
                        <div>
                          <p className="text-sm text-muted-foreground">Visibility</p>
                          <p className="font-medium">{weatherData.today.visibility} km</p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm mt-4">
                      <span className="font-medium">Today:</span> {weatherData.today.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 10-Day Forecast */}
            <div>
              <h2 className="text-lg font-medium mb-3 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-agri-green" />
                10-Day Forecast
              </h2>
              
              <div className="space-y-3">
                {[weatherData.today, ...weatherData.forecast].map((day, index) => (
                  <div key={index} className="glass-card rounded-lg p-4 transition-all duration-200 hover:translate-y-[-1px]">
                    <div className="flex items-center justify-between">
                      <div className="w-28">
                        <p className={`font-medium ${index === 0 ? 'text-agri-green' : ''}`}>
                          {index === 0 ? 'Today' : day.date.split(',')[0]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {day.date.split(',')[1]}
                        </p>
                      </div>
                      
                      <div className="flex items-center">
                        {getWeatherIcon(day.condition, 'small')}
                        <p className="text-sm ml-2 w-24 hidden sm:block">{day.condition}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <CloudRain className="h-4 w-4 mr-1 text-blue-400" />
                        <span className="text-sm">{day.rainfall} mm</span>
                      </div>
                      
                      <div className="flex items-center w-24 justify-end">
                        <span className="text-blue-500 text-sm">{day.temperature.min}°</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full mx-2 relative">
                          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"
                               style={{ width: '100%' }}></div>
                        </div>
                        <span className="text-red-500 text-sm">{day.temperature.max}°</span>
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
                  <li>Ensure proper drainage in your fields to prepare for expected rainfall in the coming days.</li>
                  <li>Consider delaying any scheduled fertilizer application until after the rainy period.</li>
                  <li>Monitor for pests as humidity levels will increase, creating favorable conditions for infestations.</li>
                  <li>Cover seedlings and young plants to protect from heavy rainfall.</li>
                  <li>UV index is high today - ensure you wear proper sun protection while working in the fields.</li>
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
