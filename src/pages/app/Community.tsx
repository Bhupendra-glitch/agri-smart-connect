
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Video, Image, MessageCircle } from 'lucide-react';

const Community = () => {
  return (
    <AppLayout title="Community" activeTab="community">
      <div className="pt-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Farmer Community</h1>
          <Button className="bg-agri-green hover:bg-agri-green-dark text-white">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
        
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="posts" className="text-sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="videos" className="text-sm">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="photos" className="text-sm">
              <Image className="h-4 w-4 mr-2" />
              Photos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-0">
            <CommunityPlaceholder type="posts" />
          </TabsContent>
          
          <TabsContent value="videos" className="mt-0">
            <CommunityPlaceholder type="videos" />
          </TabsContent>
          
          <TabsContent value="photos" className="mt-0">
            <CommunityPlaceholder type="photos" />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const CommunityPlaceholder = ({ type }: { type: string }) => {
  return (
    <div className="glass-card p-8 rounded-xl text-center">
      <div className="w-16 h-16 rounded-full bg-agri-green/10 flex items-center justify-center mx-auto mb-4">
        {type === 'posts' && <MessageCircle className="h-8 w-8 text-agri-green" />}
        {type === 'videos' && <Video className="h-8 w-8 text-agri-green" />}
        {type === 'photos' && <Image className="h-8 w-8 text-agri-green" />}
      </div>
      
      <h2 className="text-lg font-medium mb-2">
        No {type} yet
      </h2>
      
      <p className="text-muted-foreground mb-6">
        Be the first to share your {type === 'posts' ? 'knowledge' : type === 'videos' ? 'farming videos' : 'crop photos'} with the community
      </p>
      
      <Button className="bg-agri-green hover:bg-agri-green-dark text-white">
        <PlusCircle className="h-4 w-4 mr-2" />
        {type === 'posts' ? 'Create a Post' : type === 'videos' ? 'Upload Video' : 'Upload Photos'}
      </Button>
    </div>
  );
};

export default Community;
