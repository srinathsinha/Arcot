import { Card } from "@/components/ui/card";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface TreasuryAllocation {
  asset: string;
  percentage: number;
  color: string;
}

interface TreasuryChartProps {
  allocations: TreasuryAllocation[];
}

export default function TreasuryChart({ allocations }: TreasuryChartProps) {
  const data = {
    labels: allocations.map(a => `${a.asset} (${a.percentage}%)`),
    datasets: [
      {
        data: allocations.map(a => a.percentage),
        backgroundColor: allocations.map(a => a.color),
        borderWidth: 0,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          color: 'hsl(var(--foreground))'
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}`;
          }
        }
      }
    }
  };

  return (
    <Card className="flex flex-col h-full" data-testid="card-treasury-chart">
      <div className="p-4 border-b border-card-border">
        <h2 className="text-base font-semibold" data-testid="text-treasury-title">
          Treasury Allocation
        </h2>
      </div>
      <div className="p-6 flex-1 flex items-center justify-center" data-testid="container-chart">
        <div className="w-full max-w-sm max-h-[400px]">
          <Pie data={data} options={options} />
        </div>
      </div>
    </Card>
  );
}
