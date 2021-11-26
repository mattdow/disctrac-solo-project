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

function* userStatsSaga() {

    yield takeLatest('FETCH_USER_SUMMARY', fetchUserSummary);
}

export default userStatsSaga;