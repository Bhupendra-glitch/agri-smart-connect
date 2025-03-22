
import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, ChevronLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatSupport = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial welcome message
    const initialMessage: Message = {
      id: '1',
      content: 'Hello! I\'m your AgriSmart assistant. How can I help you today? You can ask me about crop care, weather recommendations, or get technical assistance.',
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Generate bot response based on user input
    setTimeout(() => {
      const userQuestion = inputValue.toLowerCase();
      let botResponse = '';
      
      // Simple keyword-based responses
      if (userQuestion.includes('hello') || userQuestion.includes('hi') || userQuestion.includes('hey')) {
        botResponse = "Hello! How can I assist you with your farming needs today?";
      } 
      else if (userQuestion.includes('weather')) {
        botResponse = "Based on your location, we're expecting clear skies with temperatures around 28-32°C for the next few days. Humidity will be moderate at around 65%. Perfect conditions for field work!";
      }
      else if (userQuestion.includes('irrigation') || userQuestion.includes('water')) {
        botResponse = "For optimal irrigation, I recommend drip irrigation systems which can save up to 60% water compared to flood irrigation. Given the current weather, early morning irrigation would be most effective to reduce evaporation losses.";
      }
      else if (userQuestion.includes('pest') || userQuestion.includes('insect')) {
        botResponse = "I'm detecting increased pest activity in your region. For organic pest control, consider neem oil solution (mix 5ml neem oil with 1L water) or introducing beneficial insects like ladybugs. Would you like more specific recommendations for your crop?";
      }
      else if (userQuestion.includes('fertilizer') || userQuestion.includes('nutrient')) {
        botResponse = "Based on your soil type, I recommend a balanced NPK fertilizer with micronutrients. Apply 50kg/hectare as base fertilizer, followed by top dressing after 30 days. Remember to apply in a ring around plants, not directly at the stem.";
      }
      else if (userQuestion.includes('crop rotation') || userQuestion.includes('planting')) {
        botResponse = "Crop rotation is essential for soil health. After your current crop, consider planting a legume to fix nitrogen in the soil. Based on your location, black gram or green gram would be suitable options for the next season.";
      }
      else if (userQuestion.includes('disease') || userQuestion.includes('fungus') || userQuestion.includes('rot')) {
        botResponse = "Early symptoms of fungal diseases include yellowing leaves and white powdery spots. For prevention, ensure proper spacing between plants for air circulation and avoid overhead irrigation. A copper-based fungicide can be applied as preventive measure.";
      }
      else if (userQuestion.includes('market') || userQuestion.includes('price') || userQuestion.includes('sell')) {
        botResponse = "Current market prices in your region show a 5% increase for quality produce. To maximize profits, consider grading your harvest and exploring direct-to-consumer channels. The AgriSmart marketplace also connects you with premium buyers.";
      }
      else if (userQuestion.includes('organic') || userQuestion.includes('natural')) {
        botResponse = "For organic farming, use compost (10 tons/hectare), vermicompost, and green manure. Neem cake and bone meal are excellent organic sources of nutrients. Implement crop rotation and mixed cropping for pest management.";
      }
      else if (userQuestion.includes('soil health') || userQuestion.includes('soil testing')) {
        botResponse = "Regular soil testing is recommended every 2-3 seasons. Your soil type indicates medium fertility with slightly alkaline pH. Adding organic matter will improve soil structure and water retention. Would you like me to recommend specific soil amendments?";
      }
      else if (userQuestion.includes('thanks') || userQuestion.includes('thank you')) {
        botResponse = "You're welcome! I'm here anytime you need assistance with your farming activities. Feel free to check back for more personalized recommendations as your crops progress.";
      }
      else {
        // Default response for unrecognized queries
        botResponse = "Thank you for your question about " + userQuestion.split(' ').slice(0, 3).join(' ') + "... I'll need more information to provide specific advice. Could you tell me which crop you're growing and at what growth stage? This will help me give you more tailored recommendations.";
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <AppLayout title="Chat Support" activeTab="chat">
      <div className="h-[calc(100vh-132px)] flex flex-col pt-4">
        <div className="mb-4 flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">AgriSmart Assistant</h1>
        </div>
          
        <div className="flex-1 flex flex-col h-[calc(100vh-200px)]">
          <div className="flex-1 overflow-y-auto pb-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-agri-green text-white text-xs">
                      AS
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`rounded-2xl p-3 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-agri-green text-white'
                      : 'glass-card'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user'
                      ? 'text-white/70'
                      : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarFallback className="bg-primary text-white text-xs">
                      ME
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-agri-green text-white text-xs">
                    AS
                  </AvatarFallback>
                </Avatar>
                
                <div className="glass-card rounded-2xl p-4 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-agri-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 bg-agri-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 bg-agri-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 focus:ring-2 ring-primary/20"
              />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Use voice input"
              >
                <Mic className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-agri-green hover:bg-agri-green-dark text-white rounded-full p-2 h-10 w-10"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              Try asking about weather, pests, irrigation, fertilizers, or crop diseases
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatSupport;
