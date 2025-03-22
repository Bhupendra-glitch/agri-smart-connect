
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Calendar, Info, CheckCircle } from 'lucide-react';

const CropCare = () => {
  return (
    <AppLayout title="Crop Care" activeTab="home">
      <div className="pt-4 pb-20">
        <h1 className="text-xl font-bold mb-6">Crop Care & Management</h1>
        
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calendar" className="text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Crop Calendar
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-sm">
              <Info className="h-4 w-4 mr-2" />
              Care Tips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="mt-0">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-4 bg-agri-green text-white">
                <h2 className="font-medium">Rice Cultivation Calendar</h2>
                <p className="text-sm opacity-80">Full season guide</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-6">
                  <CalendarItem 
                    stage="Land Preparation"
                    period="May 1 - May 15"
                    description="Plough and level the field, add organic matter"
                    completed={true}
                  />
                  
                  <CalendarItem 
                    stage="Sowing / Transplanting"
                    period="May 20 - June 5"
                    description="Transplant the seedlings into prepared fields"
                    completed={true}
                  />
                  
                  <CalendarItem 
                    stage="Nutrient Management"
                    period="June 15 - June 30"
                    description="First fertilizer application"
                    completed={false}
                    current={true}
                  />
                  
                  <CalendarItem 
                    stage="Pest & Disease Control"
                    period="July 1 - July 15"
                    description="Monitor for pests and apply treatment if needed"
                    completed={false}
                  />
                  
                  <CalendarItem 
                    stage="Second Fertilization"
                    period="July 20 - July 30"
                    description="Second phase of fertilizer application"
                    completed={false}
                  />
                  
                  <CalendarItem 
                    stage="Harvest"
                    period="Oct 15 - Oct 30"
                    description="When 80% of grains turn golden yellow"
                    completed={false}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="mt-0">
            <div className="space-y-4">
              <CareCard 
                title="Water Management"
                description="For rice cultivation, maintain water level at 2-5 cm during the vegetative stage. Drain the field 10 days before harvesting."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>}
              />
              
              <CareCard 
                title="Nutrient Management"
                description="Apply fertilizers in splits - 50% during land preparation, 25% during tillering, and 25% during panicle initiation."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>}
              />
              
              <CareCard 
                title="Pest Management"
                description="Regularly monitor for stem borers, leafhoppers, and plant hoppers. Use neem-based insecticides for organic control."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>}
              />
              
              <CareCard 
                title="Disease Management"
                description="Watch for rice blast and bacterial leaf blight. Maintain field sanitation and use resistant varieties."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const CalendarItem = ({ 
  stage, 
  period, 
  description, 
  completed, 
  current = false 
}: { 
  stage: string; 
  period: string; 
  description: string; 
  completed: boolean;
  current?: boolean;
}) => {
  return (
    <div className={`flex ${current ? 'bg-agri-green/10 p-3 rounded-lg -mx-3' : ''}`}>
      <div className="mr-4 w-5">
        {completed ? (
          <div className="h-5 w-5 rounded-full bg-agri-green text-white flex items-center justify-center">
            <CheckCircle className="h-4 w-4" />
          </div>
        ) : (
          <div className={`h-5 w-5 rounded-full ${current ? 'bg-agri-green/20 border-2 border-agri-green' : 'bg-muted border border-muted-foreground'}`}></div>
        )}
      </div>
      
      <div>
        <h3 className="font-medium">{stage}</h3>
        <p className="text-sm text-muted-foreground mb-1">{period}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

const CareCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) => {
  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-start">
        <div className="mr-4 p-2 bg-agri-green/10 rounded-lg text-agri-green">
          {icon}
        </div>
        
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CropCare;
