import GlobalMap from '../GlobalMap';

export default function GlobalMapExample() {
  const mockHotspots = [
    { id: "1", lat: 40, lng: -74, riskLevel: "suspicious" as const, count: 5, region: "North America" },
    { id: "2", lat: 51, lng: 0, riskLevel: "cleared" as const, count: 3, region: "Europe" },
    { id: "3", lat: 35, lng: 139, riskLevel: "confirmed" as const, count: 8, region: "Asia" },
    { id: "4", lat: -33, lng: 151, riskLevel: "cleared" as const, count: 2, region: "Australia" },
  ];

  return <GlobalMap hotspots={mockHotspots} onMarkerClick={(region) => console.log('Clicked:', region)} />;
}
