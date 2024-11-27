import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesChartProps {
  dateRange: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ dateRange }) => {
  // Fonction pour générer les labels en fonction de la période
  const getLabels = () => {
    switch (dateRange) {
      case '7j':
        return ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
      case '30j':
        return Array.from({ length: 30 }, (_, i) => `${i + 1}`);
      case '90j':
        return Array.from({ length: 12 }, (_, i) => `Semaine ${i + 1}`);
      default:
        return ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    }
  };

  // Configuration des données du graphique
  const data = {
    labels: getLabels(),
    datasets: [
      {
        label: 'Ventes (€)',
        data: Array.from({ length: getLabels().length }, () => 
          Math.floor(Math.random() * 3000) + 1000
        ),
        borderColor: '#D9B50D',
        backgroundColor: 'rgba(217, 181, 13, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.parsed.y.toLocaleString()}€`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          callback: (value: any) => `${value.toLocaleString()}€`
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  };

  return (
    <div className="h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;