import React from 'react';
import { Scatter, Chart }  from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

function ScatterChart () {
    const chartData = {
        datasets: [
            {
                label: '2021 Round Scores',
                data: [
                    { x: '2021-03-26', y: 5},
                    { x: '2021-04-03', y: 8},
                    { x: '2021-04-16', y: 4},
                    { x: '2021-05-07', y: 2},
                    { x: '2021-05-26', y: 6},
                    { x: '2021-06-06', y: 0},
                    { x: '2021-06-06', y: 3},
                    { x: '2021-06-14', y: -2},
                    { x: '2021-07-01', y: 2},
                    { x: '2021-07-07', y: 1},
                    { x: '2021-07-14', y: -1},
                    { x: '2021-07-20', y: 0},
                    { x: '2021-07-24', y: -3},
                    { x: '2021-08-05', y: 1},
                    { x: '2021-08-12', y: 4},
                    { x: '2021-08-19', y: -5},
                    { x: '2021-08-31', y: -2},
                    { x: '2021-09-08', y: 3},
                    { x: '2021-09-15', y: -1},
                    { x: '2021-09-16', y: 1},
                    { x: '2021-09-23', y: -4},
                    { x: '2021-10-04', y: 2},
                    { x: '2021-10-11', y: 0},
                ],
                backgroundColor: 'red',
            }
        ]
    }
    const chartOptions = {
        scales: {
            x: {
                grid: {
                    display:false
                },
                type: 'time',
                time: {
                    unit: 'month'
                }
            },
            y: {
                grid: {
                    display:false
                },
                title: {
                    display: true,
                    text: 'Under/Over Par'   
                },   
            }
        },
        maintainAspectRatio: false,
        indexAxis: 'y',
    }
    return (
        <div>
            <Scatter
                data={chartData}
                height={400}
                width={600}
                options={chartOptions}
            />
        </div>
    )
}

export default ScatterChart;