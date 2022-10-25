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


export const ActivityTimeChart = (props) => {
    
    const allEvents = props.allEvents;
    const labels = ['Activity'];

    // This is 2022, use to display only data for 2022 
    // const currentYear = new Date(Date.now()).getFullYear();
    
    const options = {
        indexAxis: 'y',
        elements: {
        bar: {
            borderWidth: 2,
        },
        },
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
            display: true
        },
        title: {
            display: true,
            text: 'Total time spent performing each activity',
        },
        },
        layout: {
            padding: 40
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (mins)'
                }
            }
        } 
    };

    const data = {
        labels,
        datasets: []
    };

    let totalRunningTime = 0;
    let totalCyclingTime = 0;
    let totalGymingTime = 0;
    let totalRowingTime = 0;
    let totalYogaTime = 0;
    let totalOtherTime = 0;
    // ADD YEAR CONDITION? e.g. convert Start to year with getFullYear
    for (let i = 0; i < allEvents.length; i++) {
        if (allEvents[i].activity === 'Run' && allEvents[i].length > 0) {
            totalRunningTime += allEvents[i].length;
        }
        if (allEvents[i].activity === 'Cycle' && allEvents[i].length > 0) {
            totalCyclingTime += allEvents[i].length;
        }
        if (allEvents[i].activity === 'Gym' && allEvents[i].length > 0) {
            totalGymingTime += allEvents[i].length;
        }
        if (allEvents[i].activity === 'Row' && allEvents[i].length > 0) {
            totalRowingTime += allEvents[i].length;
        }
        if (allEvents[i].activity === 'Yoga' && allEvents[i].length > 0) {
            totalYogaTime += allEvents[i].length;
        }
        if (allEvents[i].activity === 'Other' && allEvents[i].length > 0) {
            totalOtherTime += allEvents[i].length;
        }
    }

        if (totalRunningTime > 0) {
            data.datasets.push({
                label: 'Running',
                data: [totalRunningTime],
                borderColor: '#ef476f',
                backgroundColor: '#ef476f',
            })
        }
        
        if (totalCyclingTime > 0) {
            data.datasets.push({
                label: 'Cycling',
                data: [totalCyclingTime],
                borderColor: '#f78c6b',
                backgroundColor: '#f78c6b',
            })
        }
        if (totalGymingTime > 0) {
            data.datasets.push({
                label: 'Gym',
                data: [totalGymingTime],
                borderColor: '#06d6a0',
                backgroundColor: '#06d6a0',
            })
        }
        if (totalRowingTime > 0) {
            data.datasets.push({
                label: 'Rowing',
                data: [totalRowingTime],
                borderColor: '#ffd166',
                backgroundColor: '#ffd166',
            })
        }
        if (totalYogaTime > 0) {
            data.datasets.push({
                label: 'Yoga',
                data: [totalYogaTime],
                borderColor: '#118ab2',
                backgroundColor: '#118ab2',
            })
        }
        if (totalOtherTime > 0) {
            data.datasets.push({
                label: 'Other',
                data: [totalOtherTime],
                borderColor: '#073b4c',
                backgroundColor: '#073b4c',
            })
        }
    
    return <Bar options={options} data={data} />;
}
