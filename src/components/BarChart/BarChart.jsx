import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Box, Paper } from '@mui/material';


function BarChart() {
    // get the user's info from the store
    const user = useSelector((store) => store.user);
    //set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // grab user hole score data for the chart from Redux store
    const userHoleScores = useSelector(store => store.userHoleScores);
    console.log('userHoleScores are:', userHoleScores);
    // define a variable mapping the scores_to_par as labels
    const scoreLabels = userHoleScores.map((score) => {
        if (score.scores_to_par <= -2) {
            return 'Eagle or Better';
        } else if (score.scores_to_par === -1) {
            return 'Birdie';
        } else if (score.scores_to_par === 0) {
            return 'Par';
        } else if (score.scores_to_par === 1) {
            return 'Bogey';
        } else if (score.scores_to_par === 2) {
            return 'Double Bogey';
        } else return 'Worse';
    });
    console.log('scoreLabels are: ', scoreLabels);
    // define a variable extracting the score data via array map
    const scoreData = userHoleScores.map(score => Number(score.count));
    console.log('scoreData is:', scoreData);
    const chartData = {
        labels: scoreLabels,
        datasets: [{
            label: 'All Courses',
            data: scoreData,
            backgroundColor: ['#A6D1F2']
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
    // call useEffect to fetch the user hole scores upon load
    useEffect(() => {
        dispatch({ type: 'FETCH_USER_HOLE_SCORES'});
    }, [dispatch])

    // JSX code to render the chart to the DOM
    return (
        <Box sx={{m:2, display: 'flex'}}>
            <Bar
                data={chartData}
                options={chartOptions}
                height={300}
            />
        </Box>
    )
}

export default BarChart;