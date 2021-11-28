import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Box, Paper } from '@mui/material';


function BarChart(courseID) {
    // get the user's info from the store
    const user = useSelector((store) => store.user);
    //set dispatch hook as a variable for use
    const dispatch = useDispatch();
    // grab user hole score data for the chart from Redux store
    const userHoleScores = useSelector(store => store.userHoleScores);
    console.log('userHoleScores are:', userHoleScores);
    // grab the user's courses from store
    const userCourses = useSelector(store => store.userCourses);
    // define a variable mapping the scores_to_par as labels
    let courseLabel = 'All Courses';
    for(let course of userCourses) {
        if(course.id === courseID.courseID) {
         courseLabel = course.course_name;   
        } // end of if        
    }// end of for
    console.log('Course label is: ', courseLabel);
    const scoreLabels = userHoleScores.map((score) => {
        if (score.scores_to_par <= -2) {
            return 'Eagle';
        } else if (score.scores_to_par === -1) {
            return 'Birdie';
        } else if (score.scores_to_par === 0) {
            return 'Par';
        } else if (score.scores_to_par === 1) {
            return 'Bogey';
        } else if (score.scores_to_par === 2) {
            return 'Double B';
        } else return 'Worse';
    });
    console.log('scoreLabels are: ', scoreLabels);
    // define a variable extracting the score data via array map
    const scoreData = userHoleScores.map(score => Number(score.count));
    console.log('scoreData is:', scoreData);
    const chartData = {
        labels: scoreLabels,
        datasets: [{
            label: courseLabel,
            data: scoreData,
            backgroundColor: ['#A6D1F2', '#78E425', '#E7FF5C', '#FFB347', '#FF4747', '#64453F']
        }]
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
                ticks: {
                    font: {
                        size: 18
                    }
                },
            },
            y: {
                grid: {
                    display:false
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
    // call useEffect to fetch the user hole scores upon load
    useEffect(() => {
        dispatch({ type: 'FETCH_USER_HOLE_SCORES', payload: courseID});
    }, [dispatch, courseID])

    // JSX code to render the chart to the DOM
    return (
        <Paper sx={{m:1, display: 'flex'}}>
            <Bar
                data={chartData}
                options={chartOptions}
                height={300}
            />
        </Paper>
    )
}

export default BarChart;