import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// create a generator function to get the user's total number of rounds
function* fetchUserSummary(action) {
    console.log('In fetchUserSummary for user summary stats');
    try {
        const response = yield axios.get(`/api/userstats/rounds`);
        yield console.log('User total rounds GET request response:', response);
        yield put({ type: 'SET_USER_STATS', payload: response.data });
    } catch (err) {
        yield put({ type: 'FETCH_USER_SUMMARY_ERROR'});
        console.log('Error in fetchTotalRounds');
    }
}
// generator function to fetch the count of the user's hole scores grouped by score in relation to par
function* fetchUserHoleScores(action) {
    console.log('In fetchUserHoleScores with courseID', action.payload.courseID);
    try { 
        // if all courses is selected, make the router call for all courses
        if(action.payload.courseID === 0) {
            const response = yield axios.get(`/api/userstats/holescores`);
            yield console.log('User holescore GET for all courses:', response.data);
            yield put({ type: 'SET_USER_HOLE_SCORES', payload: response.data });
        } // if there is a course value, make the specific router call
        else {
            const response = yield axios.get(`api/userstats/holescores/${action.payload.courseID}`);
            yield console.log('User holescore GET for one course', action.payload, response);
            yield put({ type: 'SET_USER_HOLE_SCORES', payload: response.data });             
        }       
    } catch (err) {
        yield put({ type: 'FETCH_USER_HOLESCORE_ERROR'});
        console.log('Error in fetchUserHoleScores');        
    }    
}
//generator function to fetch the total round scores for the user
function* fetchUserRoundScores(action) {
    console.log('In fetchUserRoundScores with courseID', action.payload.courseID);
    try {
        // if all courses is selected, route call all courses
        if(action.payload.courseID === 0) {
            const response = yield axios.get(`/api/userstats/roundscores`);
            yield put ({ type: 'SET_USER_ROUND_SCORES', payload: response.data });
        }
        else {
            const response = yield axios.get(`api/userstats/roundscores/${action.payload.courseID}`);
            yield put ({ type: 'SET_USER_ROUND_SCORES', payload: response.data });
        }
        
    } catch (err) {
        yield put({ type: 'FETCH_USER_ROUND_SCORES_ERROR'});
    }    
}
// generator function to fetch the courses the user has played
function* fetchUserCourses(action) {
    console.log('In fetchUserCourses');
    try {
        const response = yield axios.get(`/api/userstats/courses`);
        yield put ({ type: 'SET_USER_COURSES', payload: response.data});
    } catch (err) {
        yield put({ type: 'FETCH_USER_COURSES_ERROR'});
    }
}

function* userStatsSaga() {

    yield takeLatest('FETCH_USER_SUMMARY', fetchUserSummary);
    yield takeLatest('FETCH_USER_HOLE_SCORES', fetchUserHoleScores);
    yield takeLatest('FETCH_USER_ROUND_SCORES', fetchUserRoundScores);
    yield takeLatest('FETCH_USER_COURSES', fetchUserCourses);
}

export default userStatsSaga;