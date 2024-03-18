/** 
 * File Name: ChartComponent.jsx
 * Purpose: Render comparative jets data depending on selected sort criteria. 
 * Created Date: 2024-03-18 
 */


import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { ArcElement, LineElement, Chart as ChartJS, Legend, Tooltip, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const removeCommasAndParse = (str) => {
  if (typeof str === 'string') {
    return parseFloat(str.replace(/,/g, ''));
  }
  return str;
};

const ChartComponent = ({ jetsData, sort }) => {
  
  const processDataForChart = (jetsData, chartType) => {
    const labels = jetsData.map(jet => jet.name);
    let data;
    switch (sort) {
      case 'wingspan':
        data = jetsData.map(jet => jet.wingspan);
        break;
      case 'year':
        data = jetsData.map(jet => removeCommasAndParse(jet.year));
        break;
      case 'engine':
        data = jetsData.map(jet => jet.engines);
        break;
      default:
        data = jetsData.map(jet => jet.wingspan); 
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: chartType === 'line' ? 'Year Made' : 'Value',
          data,
          backgroundColor: ['#3772ff', '#DF2935', '#FDCA40', '#E6E8E6', '#080708', '#FB5607', '#8338EC', '#FFBE0B', '#758E4F', '#3B97FF'],
          borderColor: '#ced4da', 
          hoverOffset: 4,
        },
      ],
    };
  };

  const chartType = sort === 'year' ? 'line' : 'doughnut';
  const chartData = processDataForChart(jetsData, chartType);
  
  const line_options = {
    maintainAspectRatio: true, 
    aspectRatio: 1, 
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: { 
        ticks: {
          callback: function(value) {
            
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
          }
        }
      }
    },
  };

  const bar_options = {
    maintainAspectRatio: true, 
    aspectRatio: 1, 
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <div className="flex flex-col relative justify-center items-center h-full border border-black-300 rounded-lg">
      <div>
          <label className="text-xl font-semibold text-center mb-4">{sort.charAt(0).toUpperCase() + sort.slice(1)} per Jet</label>
      </div>
      <div className="w-96 h-96">
          {chartType === 'doughnut' ? (
              <Doughnut data={chartData} />
          ) : (
              <Line data={chartData} options={line_options} />
          )}
      </div>
    </div>
  );
};

export default ChartComponent;
