"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChart = () => {

  const data = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [
      {
        label: 'Sales',
        data: [20, 30, 10, 50, 20, 40, 60],
        fill: true,
        backgroundColor: 'white',
        borderColor: 'white',
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        tension: 0.4,
        pointRadius: 5,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        grid: {
          display: false, // Disable the grid lines on x-axis
        },
        ticks: {
          color: '#fff', // Set x-axis label (days) to white
        },
      },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20,
        color: '#fff', 
      }
    }
  }
};

return (
  <div className="bg-gradient-to-t from-blue-600 to-blue-400 p-4 rounded-lg shadow-md text-white">
      <h2 className="text-lg font-bold mb-4">Daily Sales</h2>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
  </div>
)
}

export default LineChart;