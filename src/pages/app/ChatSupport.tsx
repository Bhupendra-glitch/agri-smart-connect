
import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Phone, PhoneOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [isCalling, setIsCalling] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    const initialMessage: Message = {
      id: '1',
      content: 'Hello! I\'m your AgriSmart assistant. How can I help you today?',
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
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I understand your concern about crop irrigation. Have you considered drip irrigation methods?",
        "Based on your location, rice cultivation would be suitable for the upcoming season.",
        "For pest control in tomatoes, neem oil solution can be very effective and organic.",
        "The current weather forecast shows rainfall in your region in the next 48 hours.",
        "Our experts recommend applying fertilizer in the evening for better absorption."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
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

  const handleCallRequest = () => {
    setIsCalling(true);
    
    // Simulate call connection after delay
    setTimeout(() => {
      setIsCalling(false);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: "Our support team will call you back within 5 minutes. Please keep your phone accessible.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 3000);
  };

  return (
    <AppLayout title="Chat Support" activeTab="chat">
      <div className="h-[calc(100vh-132px)] flex flex-col pt-4">
        <Tabs defaultValue="chat" className="w-full mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat" className="text-sm">Chat Support</TabsTrigger>
            <TabsTrigger value="call" className="text-sm">Missed Call</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 flex flex-col h-[calc(100vh-200px)]">
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
            </div>
          </TabsContent>
          
          <TabsContent value="call" className="h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center">
            <div className="glass-card p-8 rounded-xl max-w-md">
              <div className="w-20 h-20 rounded-full bg-agri-green/10 flex items-center justify-center mx-auto mb-6">
                {isCalling ? (
                  <PhoneOff className="h-10 w-10 text-red-500" />
                ) : (
                  <Phone className="h-10 w-10 text-agri-green" />
                )}
              </div>
              
              <h2 className="text-xl font-bold mb-2">
                {isCalling ? 'Requesting Call Back...' : 'Request a Call Back'}
              </h2>
              
              <p className="text-muted-foreground mb-6">
                {isCalling 
                  ? 'Please wait while we connect you to our support team.' 
                  : 'Our agriculture experts will call you back as soon as possible.'}
              </p>
              
              <Button
                onClick={handleCallRequest}
                disabled={isCalling}
                className="w-full bg-agri-green hover:bg-agri-green-dark text-white"
              >
                {isCalling ? 'Connecting...' : 'Request Call Back'}
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Available from 9:00 AM to 6:00 PM, Monday to Saturday
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ChatSupport;
