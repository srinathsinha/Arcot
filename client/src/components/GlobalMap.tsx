import { Card } from "@/components/ui/card";
import { useState } from "react";

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
        return "bg-green-500 border-green-600";
      case "suspicious":
        return "bg-yellow-500 border-yellow-600";
      case "confirmed":
        return "bg-red-500 border-red-600";
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
      <div className="relative h-[400px] bg-muted/20 overflow-hidden" data-testid="container-map">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          <rect width="1000" height="500" fill="currentColor" className="text-muted/10" />
          
          <path
            d="M 100 150 L 200 120 L 280 140 L 320 160 L 380 150 L 420 180 L 450 170 L 480 190 L 420 220 L 380 240 L 320 250 L 280 230 L 220 240 L 180 220 L 140 200 Z"
            fill="currentColor"
            className="text-card-border"
            opacity="0.5"
            data-testid="map-region-north-america"
          />
          
          <path
            d="M 450 280 L 520 270 L 580 290 L 620 280 L 640 310 L 600 340 L 550 350 L 500 330 L 470 310 Z"
            fill="currentColor"
            className="text-card-border"
            opacity="0.5"
            data-testid="map-region-europe"
          />
          
          <path
            d="M 650 300 L 720 290 L 780 310 L 820 330 L 800 360 L 750 380 L 700 370 L 670 350 Z"
            fill="currentColor"
            className="text-card-border"
            opacity="0.5"
            data-testid="map-region-asia"
          />
          
          {hotspots.map((hotspot) => {
            const x = (hotspot.lng + 180) * (1000 / 360);
            const y = (90 - hotspot.lat) * (500 / 180);
            const size = Math.min(8 + hotspot.count * 2, 20);
            const isActive = activeHotspot === hotspot.id;

            return (
              <g key={hotspot.id} data-testid={`hotspot-${hotspot.id}`}>
                {isActive && (
                  <circle
                    cx={x}
                    cy={y}
                    r={size + 8}
                    className={getRiskColor(hotspot.riskLevel)}
                    opacity="0.2"
                  >
                    <animate
                      attributeName="r"
                      from={size + 4}
                      to={size + 12}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={size}
                  className={`${getRiskColor(hotspot.riskLevel)} cursor-pointer hover-elevate transition-all`}
                  onClick={() => handleMarkerClick(hotspot)}
                  data-testid={`marker-${hotspot.id}`}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.7;1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={x}
                  cy={y}
                  r={size / 2}
                  fill="white"
                  opacity="0.6"
                />
              </g>
            );
          })}
          
          <line
            x1="300"
            y1="200"
            x2="550"
            y2="320"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/40"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="10"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
          <line
            x1="550"
            y1="320"
            x2="720"
            y2="330"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/40"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="10"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
        </svg>

        <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-card-border rounded-md p-3 text-xs" data-testid="legend">
          <div className="font-semibold mb-2">Risk Levels</div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Cleared</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Suspicious</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Confirmed</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
