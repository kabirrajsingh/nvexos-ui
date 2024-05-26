// Graph.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Graph = ({ data, darkMode }) => {
  // Adjust styles based on dark mode
  const chartContainerClass = `w-full md:w-2/3 mx-auto ${darkMode ? 'dark' : ''}`;
  const notAvailableClass = `bg-gray-200 text-gray-600 p-4 rounded-lg shadow-lg ${darkMode ? 'dark:bg-gray-800 dark:text-white' : ''}`;

  const processChartData = (data) => {
    const datasets = [];
    let labels = [];
    
    if (Object.keys(data).length === 0) {
      return null;
    }
    
    for (const product in data) {
      const values = data[product].map(item => item[0]);
      labels = data[product].map(item => new Date(item[1]).toLocaleTimeString());
      datasets.push({
        label: product,
        data: values,
        borderColor: getRandomColor(),
        fill: false,
      });
    }

    return { labels, datasets };
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartData = processChartData(data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Dwell Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Quantity',
        },
      },
    },
  };

  return (
    <div className={chartContainerClass}>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className={notAvailableClass}>
          <p className="text-lg">Camera data unavailable</p>
        </div>
      )}
    </div>
  );
};

export default Graph;
