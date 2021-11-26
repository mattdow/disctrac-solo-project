import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper } from '@mui/material';
import { Scatter, Chart }  from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

function ScatterChart () {
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // grab user round score data for the chart from Redux
    const userRoundScores = useSelector(store => store.userRoundScores);
    
    // map the userRoundScores to a different array of objects for the chart
    const scoreData = userRoundScores.map((score) => {
        return {
            // Date from SQL needs to be truncated
            x: score.date_played.substring(0, 10),
            // score from SQL is a string, need to convert
            y: Number(score.total_score_to_par)
        }
    });
    console.log('User scoreData is:', scoreData);
    const chartData = {
        datasets: [
            {
                label: 'All courses',
                data: scoreData,
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
    // call useEffect to fetch the user round scores upon load
    useEffect(() => {
        dispatch({ type: 'FETCH_USER_ROUND_SCORES'});
    }, [dispatch]);
    return (
        <Box sx={{m:2, display: 'flex'}}>
            <Scatter
                data={chartData}
                height={300}
                options={chartOptions}
            />
        </Box>
    )
}

export default ScatterChart;