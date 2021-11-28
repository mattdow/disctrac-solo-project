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
    console.log('In fetchUserHoleScores');
    try { 
        const response = yield axios.get(`/api/userstats/holescores`);
        yield console.log('User holescore GET response:', response);
        yield put({ type: 'SET_USER_HOLE_SCORES', payload: response.data }); 
    } catch (err) {
        yield put({ type: 'FETCH_USER_HOLESCORE_ERROR'});
        console.log('Error in fetchUserHoleScores');        
    }    
}
//generator function to fetch the total round scores for the user
function* fetchUserRoundScores(action) {
    console.log('In fetchUserRoundScores');
    try {
        const response = yield axios.get(`/api/userstats/roundscores`);
        yield put ({ type: 'SET_USER_ROUND_SCORES', payload: response.data });
    } catch (err) {
        yield put({ type: 'FETCH_USER_ROUND_SCORES_ERROR'});
    }    
}

function* userStatsSaga() {

    yield takeLatest('FETCH_USER_SUMMARY', fetchUserSummary);
    yield takeLatest('FETCH_USER_HOLE_SCORES', fetchUserHoleScores);
    yield takeLatest('FETCH_USER_ROUND_SCORES', fetchUserRoundScores);
    yield 
}

export default userStatsSaga;