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
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#6B8E23",
            "#8B008B",
            "#FFA500",
            "#191970",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#6B8E23",
            "#8B008B",
            "#FFA500",
            "#191970",
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
  