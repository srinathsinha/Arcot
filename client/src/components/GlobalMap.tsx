import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface MapHotspot {
  id: string;
  lat: number;
  lng: number;
  riskLevel: "cleared" | "suspicious" | "confirmed";
  count: number;
  region: string;
}

interface GlobalMapProps {
  hotspots: MapHotspot[];
  onMarkerClick?: (region: string) => void;
}

export default function GlobalMap({ hotspots, onMarkerClick }: GlobalMapProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const getRiskColor = (riskLevel: MapHotspot["riskLevel"]) => {
    switch (riskLevel) {
      case "cleared":
        return "#10b981"; // green-500
      case "suspicious":
        return "#eab308"; // yellow-500
      case "confirmed":
        return "#ef4444"; // red-500
    }
  };

  const getRiskBgColor = (riskLevel: MapHotspot["riskLevel"]) => {
    switch (riskLevel) {
      case "cleared":
        return "bg-green-500";
      case "suspicious":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-red-500";
    }
  };

  const handleMarkerClick = (hotspot: MapHotspot) => {
    setActiveHotspot(hotspot.id);
    onMarkerClick?.(hotspot.region);
  };

  return (
    <Card className="flex flex-col" data-testid="card-global-map">
      <div className="p-4 border-b border-card-border">
        <h2 className="text-base font-semibold" data-testid="text-map-title">
          Global Transaction Activity
        </h2>
      </div>
      <div 
        className="relative h-[400px] overflow-hidden" 
        style={{
          background: 'linear-gradient(to bottom, #1e3a5f 0%, #0f1e3a 100%)',
        }}
        data-testid="container-map"
      >
        {/* World Map Continents */}
        <div className="absolute inset-0">
          <svg 
            viewBox="0 0 1000 500" 
            className="w-full h-full"
            style={{ display: 'block' }}
          >
            {/* North America */}
            <path
              d="M 100 150 L 200 120 L 280 140 L 320 160 L 380 150 L 420 180 L 450 170 L 480 190 L 420 220 L 380 240 L 320 250 L 280 230 L 220 240 L 180 220 L 140 200 Z"
              fill="#4a5568"
              stroke="#718096"
              strokeWidth="2"
              opacity="0.7"
            />
            
            {/* Europe */}
            <path
              d="M 450 280 L 520 270 L 580 290 L 620 280 L 640 310 L 600 340 L 550 350 L 500 330 L 470 310 Z"
              fill="#4a5568"
              stroke="#718096"
              strokeWidth="2"
              opacity="0.7"
            />
            
            {/* Asia */}
            <path
              d="M 650 300 L 720 290 L 780 310 L 820 330 L 800 360 L 750 380 L 700 370 L 670 350 Z"
              fill="#4a5568"
              stroke="#718096"
              strokeWidth="2"
              opacity="0.7"
            />
            
            {/* South America */}
            <path
              d="M 280 350 L 320 340 L 360 360 L 380 400 L 340 440 L 300 430 L 270 400 Z"
              fill="#4a5568"
              stroke="#718096"
              strokeWidth="2"
              opacity="0.7"
            />
            
            {/* Africa */}
            <path
              d="M 480 340 L 540 330 L 580 360 L 600 400 L 560 440 L 500 430 L 460 390 Z"
              fill="#4a5568"
              stroke="#718096"
              strokeWidth="2"
              opacity="0.7"
            />
            
            {/* Australia */}
            <path
              d="M 760 400 L 820 410 L 850 440 L 820 460 L 770 450 L 750 430 Z"
              fill="#4a5568"
              stroke="#718096"
              strokeWidth="2"
              opacity="0.7"
            />

            {/* Animated transaction flow lines */}
            <line
              x1="300"
              y1="200"
              x2="550"
              y2="320"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="8,4"
              opacity="0.6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="12"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
            
            <line
              x1="550"
              y1="320"
              x2="720"
              y2="330"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="8,4"
              opacity="0.6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="12"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
          </svg>
        </div>

        {/* Hotspot Markers */}
        <TooltipProvider>
          {hotspots.map((hotspot) => {
            const x = (hotspot.lng + 180) * (1000 / 360);
            const y = (90 - hotspot.lat) * (500 / 180);
            const xPercent = (x / 1000) * 100;
            const yPercent = (y / 500) * 100;
            const isActive = activeHotspot === hotspot.id;

            return (
              <Tooltip key={hotspot.id}>
                <TooltipTrigger asChild>
                  <div
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${xPercent}%`,
                      top: `${yPercent}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => handleMarkerClick(hotspot)}
                    data-testid={`marker-${hotspot.id}`}
                  >
                    {/* Outer pulse ring */}
                    {isActive && (
                      <div
                        className={`absolute inset-0 ${getRiskBgColor(hotspot.riskLevel)} rounded-full opacity-30 animate-ping`}
                        style={{
                          width: '40px',
                          height: '40px',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    )}
                    
                    {/* Main marker */}
                    <div
                      className={`relative ${getRiskBgColor(hotspot.riskLevel)} rounded-full transition-transform hover:scale-125 active:scale-110`}
                      style={{
                        width: `${Math.min(16 + hotspot.count * 3, 32)}px`,
                        height: `${Math.min(16 + hotspot.count * 3, 32)}px`,
                        boxShadow: `0 0 ${isActive ? '20px' : '10px'} ${getRiskColor(hotspot.riskLevel)}`,
                      }}
                    >
                      {/* Inner white dot */}
                      <div
                        className="absolute bg-white rounded-full opacity-60"
                        style={{
                          width: '40%',
                          height: '40%',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-card border-card-border">
                  <div className="text-xs space-y-1">
                    <div className="font-semibold">{hotspot.region}</div>
                    <div className="text-muted-foreground">
                      <div>Transactions: {hotspot.count}</div>
                      <div className="capitalize">Risk: {hotspot.riskLevel}</div>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm border border-card-border rounded-md p-3 text-xs shadow-lg" data-testid="legend">
          <div className="font-semibold mb-2">Risk Levels</div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
              <span>Cleared</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
              <span>Suspicious</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
              <span>Confirmed</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
