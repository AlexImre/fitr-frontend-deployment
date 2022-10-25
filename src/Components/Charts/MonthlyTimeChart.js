import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function TotalTimeChart(props) {
    // GET DATA ONLY FOR YEAR === 2022??
    const allEvents = props.allEvents;
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Time spent on activities per month',
          },
        },
        layout: {
          padding: 40
      }
      };
      
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      const monthlyRunningDataArray = [0,0,0,0,0,0,0,0,0,0,0,0];
      const monthlyCyclingDataArray = [0,0,0,0,0,0,0,0,0,0,0,0];
      const monthlyRowingDataArray = [0,0,0,0,0,0,0,0,0,0,0,0];
      const monthlyGymDataArray = [0,0,0,0,0,0,0,0,0,0,0,0];
      const monthlyYogaDataArray = [0,0,0,0,0,0,0,0,0,0,0,0];
      const monthlyOtherDataArray = [0,0,0,0,0,0,0,0,0,0,0,0];

      // ADD CONDITION FOR 2022 ONLY??
      for (let i = 0; i < allEvents.length; i ++) {
        if (allEvents[i].length > 0) {
          for (let j = 0; j < 12; j++) {
            if(new Date(allEvents[i].start).getMonth() === j) {
              if (allEvents[i].activity === 'Run') {
                monthlyRunningDataArray[j] += allEvents[i].length;
              }
              if (allEvents[i].activity === 'Cycle') {
                monthlyCyclingDataArray[j] += allEvents[i].length;
              }
              if (allEvents[i].activity === 'Row') {
                monthlyRowingDataArray[j] += allEvents[i].length;
              }
              if (allEvents[i].activity === 'Gym') {
                monthlyGymDataArray[j] += allEvents[i].length;
              }
              if (allEvents[i].activity === 'Yoga') {
                monthlyYogaDataArray[j] += allEvents[i].length;
              }
              if (allEvents[i].activity === 'Other') {
                monthlyOtherDataArray[j] += allEvents[i].length;
              }
            }
          }
        }
      }
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Running',
            data: monthlyRunningDataArray,
            backgroundColor: '#ef476f',
          },
          {
            label: 'Cycling',
            data: monthlyCyclingDataArray,
            backgroundColor: '#f78c6b',
          },
          {
            label: 'Rowing',
            data: monthlyRowingDataArray,
            backgroundColor: '#ffd166',
          },
          {
            label: 'Gym',
            data: monthlyGymDataArray,
            backgroundColor: '#06d6a0',
          },
          {
            label: 'Yoga',
            data: monthlyYogaDataArray,
            backgroundColor: '#118ab2',
          },
          {
            label: 'Other',
            data: monthlyOtherDataArray,
            backgroundColor: '#073b4c',
          },
        ]
      };

  return <Bar options={options} data={data} />;
}
