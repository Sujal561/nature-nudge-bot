import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Leaf, Sparkles, Award } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import LeafScanner from "@/components/LeafScanner";
import LocationBadge from "@/components/LocationBadge";
import heroImage from "@/assets/hero-nature.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      {/* Ambient glow effect */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'var(--gradient-glow)' }} />
      
      {/* Hero Section */}
      <div className="relative h-[45vh] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Lush forest canopy" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 glow-border">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Hackathon 2024 Winner</span>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-4">
              By Team Omen
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 drop-shadow-2xl">
              <span className="text-primary">Eco</span>Assistant
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 drop-shadow-lg max-w-2xl mx-auto mb-6">
              AI-Powered Sustainability & Botanical Intelligence Platform
            </p>
            <LocationBadge />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-24 pb-12 relative z-10">
        <Card className="shadow-elevated border border-primary/30 backdrop-blur-sm bg-card/90 glow-border overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/30 border-b border-border">
              <TabsTrigger 
                value="chat" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Eco Advisor
              </TabsTrigger>
              <TabsTrigger 
                value="scanner"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all"
              >
                <Leaf className="w-4 h-4 mr-2" />
                Plant Scanner
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
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="group p-8 border-primary/30 hover:border-primary/60 hover:shadow-elevated transition-all hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow-border">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Eco Advice</h3>
            <p className="text-muted-foreground leading-relaxed">
              Location-aware recycling guidance, energy-saving strategies, and sustainable product recommendations powered by advanced AI
            </p>
            <Badge variant="outline" className="mt-4 border-primary/40">Real-time Location</Badge>
          </Card>
          
          <Card className="group p-8 border-accent/30 hover:border-accent/60 hover:shadow-elevated transition-all hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow-border">
              <Leaf className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">Botanical AI Scanner</h3>
            <p className="text-muted-foreground leading-relaxed">
              Upload leaf images for instant species identification, morphological analysis, and comprehensive plant information
            </p>
            <Badge variant="outline" className="mt-4 border-accent/40">Vision AI</Badge>
          </Card>
          
          <Card className="group p-8 border-primary/30 hover:border-primary/60 hover:shadow-elevated transition-all hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow-border">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Plant Health Diagnosis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Detect diseases, pests, and stress indicators with expert treatment protocols and prevention strategies
            </p>
            <Badge variant="outline" className="mt-4 border-primary/40">Expert System</Badge>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
