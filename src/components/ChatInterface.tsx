import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useGeolocation } from "@/hooks/useGeolocation";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  mode: 'eco-chat' | 'leaf-scanner';
  image?: string;
}

const ChatInterface = ({ mode, image }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const location = useGeolocation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const locationInfo = !location.loading && !location.error 
        ? { city: location.city, region: location.region, country: location.country }
        : null;

      const { data, error } = await supabase.functions.invoke('eco-chat', {
        body: { 
          messages: [...messages, userMessage],
          mode,
          image,
          location: locationInfo
        }
      });

      if (error) throw error;

      if (data?.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground animate-fade-in">
              <div className="inline-block mb-4 animate-float">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <p className="text-xl mb-3 font-semibold text-foreground">
                👋 Welcome to EcoAssistant
              </p>
              <p className="text-sm max-w-md mx-auto">
                {mode === 'eco-chat' 
                  ? "Ask me about recycling, energy saving, or sustainable living tips tailored to your location!"
                  : "Upload a leaf image and I'll provide detailed botanical analysis and plant health assessment!"}
              </p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-soft ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground glow-border'
                    : 'bg-card border border-border'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={mode === 'eco-chat' ? "Ask about eco-friendly practices..." : "Ask about this plant..."}
          disabled={isLoading}
          className="flex-1"
        />
        <Button 
          onClick={sendMessage} 
          disabled={isLoading || !input.trim()}
          size="icon"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
