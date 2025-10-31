import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, X } from "lucide-react";
import ChatInterface from "./ChatInterface";
import leafIcon from "@/assets/leaf-icon.jpg";
import { useToast } from "@/hooks/use-toast";

const LeafScanner = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        setShowAnalysis(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setShowAnalysis(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {!selectedImage ? (
        <div className="flex flex-col items-center justify-center py-12">
          <img 
            src={leafIcon} 
            alt="Leaf identification" 
            className="w-32 h-32 object-cover rounded-full mb-6 shadow-soft"
          />
          
          <h3 className="text-2xl font-semibold mb-2">Upload a Leaf Photo</h3>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Take or upload a clear photo of a leaf to get detailed information about the plant, 
            including species, health assessment, and care tips
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              size="lg"
              className="gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Image
            </Button>
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Supported formats: JPG, PNG, WebP (max 10MB)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="relative overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
              onClick={handleClear}
            >
              <X className="w-4 h-4" />
            </Button>
            <img
              src={selectedImage}
              alt="Selected leaf"
              className="w-full h-64 object-cover"
            />
          </Card>

          {showAnalysis && (
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
              <ChatInterface mode="leaf-scanner" image={selectedImage} />
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default LeafScanner;
