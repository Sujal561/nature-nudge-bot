import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MessageCircle, Leaf } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import LeafScanner from "@/components/LeafScanner";
import heroImage from "@/assets/hero-nature.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Lush forest canopy" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              EcoAssistant
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl">
              Your AI-powered companion for sustainable living and plant care
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-20 pb-12 relative z-10">
        <Card className="shadow-elevated border-2 border-primary/20 backdrop-blur-sm bg-card/95">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger 
                value="chat" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Eco Chat
              </TabsTrigger>
              <TabsTrigger 
                value="scanner"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Leaf className="w-4 h-4 mr-2" />
                Leaf Scanner
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="p-6">
              <ChatInterface mode="eco-chat" />
            </TabsContent>
            
            <TabsContent value="scanner" className="p-6">
              <LeafScanner />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 border-primary/20 hover:shadow-soft transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Eco Advice</h3>
            <p className="text-muted-foreground">
              Get location-relevant tips for recycling, energy savings, and sustainable products
            </p>
          </Card>
          
          <Card className="p-6 border-primary/20 hover:shadow-soft transition-shadow">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Plant Identification</h3>
            <p className="text-muted-foreground">
              Upload leaf photos for instant species identification and detailed plant information
            </p>
          </Card>
          
          <Card className="p-6 border-primary/20 hover:shadow-soft transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Health Assessment</h3>
            <p className="text-muted-foreground">
              Detect plant diseases and get expert treatment recommendations
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
