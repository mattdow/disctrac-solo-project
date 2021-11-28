import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper } from '@mui/material';
import { Scatter, Chart }  from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

function ScatterChart (courseID) {
    // set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // grab user round score data for the chart from Redux
    const userRoundScores = useSelector(store => store.userRoundScores);
    // grab the user's courses from store
    const userCourses = useSelector(store => store.userCourses);
    // define a variable mapping the scores_to_par as labels
    let courseLabel = 'All Courses';
    for(let course of userCourses) {
        if(course.id === courseID.courseID) {
         courseLabel = course.course_name;   
        } // end of if        
    }// end of for
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
                label: courseLabel,
                data: scoreData,
                backgroundColor: 'red',
            }
        ]
    }
    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size:18
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display:false
                },
                type: 'time',
                time: {
                    unit: 'month'
                },
                ticks: {
                    font: {
                        size: 14
                    }
                },
            },
            y: {
                grid: {
                    display:false
                },
                title: {
                    display: true,
                    text: 'Under/Over Par',
                    font: {
                        size: 18
                    }   
                },
                ticks: {
                    font: {
                        size: 18
                    }
                },      
            }
        },
        maintainAspectRatio: false,
        indexAxis: 'y',
    }
    // call useEffect to fetch the user round scores upon load
    useEffect(() => {
        dispatch({ type: 'FETCH_USER_ROUND_SCORES', payload: courseID});
    }, [dispatch, courseID]);
    return (
        <Paper sx={{m:1, display: 'flex'}}>
            <Scatter
                data={chartData}
                height={300}
                options={chartOptions}
            />
        </Paper>
    )
}

export default ScatterChart;