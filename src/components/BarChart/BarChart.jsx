import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart() {

    const chartData = {
        labels: ['Eagles', 'Birdies', 'Pars', 'Bogies', 'Worse'],
        datasets: [{
            label: '2020 Hole Scores',
            data: [1, 5, 26, 13, 8],
            backgroundColor: ['Blue']
        },
        {
            label: '2021 Hole Scores',
            data: [2, 16, 46, 17, 4],
            backgroundColor: ['Orange']

        }]
    }
    const chartOptions = {
        scales: {
            x: {
                grid: {
                    display:false
                }
            },
            y: {
                grid: {
                    display:false
                }   
            }
        },
        maintainAspectRatio: false,
        indexAxis: 'y',
    }
    return (
        <div>
            <Bar
                data={chartData}
                height={400}
                width={600}
                options={chartOptions}
            />
        </div>
    )
}

export default BarChart;