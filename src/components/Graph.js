import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components with ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ data }) => {
  const chartData = {
    labels: data.categories.map(category => category.category_name),
    datasets: [
      {
        label: 'Dwell Time (seconds)',
        data: data.categories.map(category => category.dwell_time_seconds),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Category Dwell Time',
      },
    },
  };

  return (
    <div className="w-full md:w-2/3 mx-auto">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Graph;
