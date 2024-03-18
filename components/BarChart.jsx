/** 
 * File Name: BarChart.jsx
 * Purpose: Utilizing react-chartjs-2 for rendering comparative data of jets based on selected criteria like Top Speed, Fuel Efficiency, and Maximum Seats.
 * Created Date: 2024-03-18 
 */

import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ responseData }) => {
  const chartData = responseData.map(item => ({
    name: item.name,
    value: parseFloat(item.value.replace(/[^\d.-]/g, '')) || 0, 
  })); 
  console.log(chartData);

  const names = chartData.map(item => item.name);
  const values = chartData.map(item => item.value);

  const barColors = [
    '#3772ff', '#DF2935', '#FDCA40', '#E6E8E6', '#080708', '#FB5607', '#8338EC', '#FFBE0B', '#758E4F', '#3B97FF'
  ];

  const borderColor = [
    '#3772ff', '#DF2935', '#FDCA40', '#E6E8E6', '#080708', '#FB5607', '#8338EC', '#FFBE0B', '#758E4F', '#3B97FF'
  ];

  const data = {
    labels: names,
    datasets: [
      {
        data: values,
        backgroundColor: barColors, 
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
          font: {
            size: 16,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Jet',
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
        legend: {
            display: false, 
          },

      },
  };

  return (
    <div className='flex flex-col border border-gray-200 rounded-lg p-1'>
      <h2>Comparison Chart</h2>
      <div >
        <Bar data={data} options={options}/>
      </div>
    </div>
  );
};

export default BarChart;
