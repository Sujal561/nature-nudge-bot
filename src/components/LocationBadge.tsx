import { MapPin, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGeolocation } from "@/hooks/useGeolocation";

const LocationBadge = () => {
  const location = useGeolocation();

  if (location.loading) {
    return (
      <Badge variant="outline" className="gap-2 bg-card/50 border-primary/30">
        <Loader2 className="w-3 h-3 animate-spin" />
        <span className="text-xs">Detecting location...</span>
      </Badge>
    );
  }

  if (location.error) {
    return null;
  }

  const locationText = [location.city, location.region, location.country]
    .filter(Boolean)
    .join(', ');

  return (
    <Badge variant="outline" className="gap-2 bg-card/50 border-primary/30 glow-border">
      <MapPin className="w-3 h-3 text-primary" />
      <span className="text-xs">{locationText || 'Location detected'}</span>
    </Badge>
  );
};

export default LocationBadge;
