import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';

function DoughnutChart({ data }) {
    const chartData = {
      labels: data.map((obj) => [[`${obj.vote}` ],[`${obj.percentage.toFixed(1)}% (${obj.count} players)`]]),
      datasets: [
        {
          data: data.map((obj) => obj.count),
          
          backgroundColor: [
            "#0275d8",
            "#f0ad4e",
            "#5cb85c",
            "#5bc0de",
            "#d9534f",
            "#292b2c",
            "#ab47bc",
          ],
          hoverBackgroundColor: [
            "#0275d8",
            "#f0ad4e",
            "#5cb85c",
            "#5bc0de",
            "#d9534f",
            "#292b2c",
            "#ab47bc",
          ],
        },
      ],
    };
    const chartOptions = {
      cutout: 80,
      responsive: true,
      maintainAspectRatio: false,
      
      plugins:{
      legend: {
        position: "right",
        
        labels: {
          usePointStyle: true,
          textAlign: 'start',
          align: 'center'
        },
      },}
    };
  
    return <Doughnut data={chartData} options={chartOptions} />;
  }
  
  export default DoughnutChart;
  