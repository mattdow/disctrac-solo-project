import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRounds() {
    // GET all the user rounds
    try {
        const response = yield axios.get('/api/rounds');
        yield console.log('User rounds GET request response is:', response);
        yield put({ type: 'SET_ROUNDS', payload: response.data });
    } catch (err) {
        yield put({ type: 'FETCH_ROUNDS_ERROR' });
        console.log('Error in fetchRounds', err);
    }
}

function* postNewRound(action) {
    try {
        const response = yield axios.post('/api/rounds', action.payload);
        yield console.log('New Round POST response is: ', response.data);
        // call SET_ROUND_ID to provide info to the activeRound reducer
        yield put({type: 'SET_ROUND_ID', payload: response.data.round_id});
        // may need to fetch the new rounds list
        yield put ({type: 'FETCH_ROUNDS'});
        yield put ({type: 'FETCH_ACTIVE_ROUND', payload: response.data.round_id});
    } catch(err) {
        yield put({ type: 'START_NEW_ROUND_ERROR'});
        console.log('Error in postNewRound', err);
    }

} // end of postNewRound

// define a function to send a delete round query to server/DB
function* deleteRound(action) {
    try {
        yield axios.delete(`/api/rounds/${action.payload}`);
        // fetch the rounds list again, should reflect delete
        yield put({ type: 'FETCH_ROUNDS'})
    } catch (err) {
        yield put({ type: 'DELETE_ROUND_ERROR'});
        console.log(err);
    }
}

// define a function to fetch the currently active round from the DB 
function* fetchActiveRound(action) {
    try {
        const response = yield axios.get(`api/rounds/${action.payload}`);
        yield put({ type: 'SET_ACTIVE_ROUND', payload: response.data})
    } catch(err) {
        yield put ({ type: 'FETCH_ACTIVE_ROUND_ERROR'});
        console.log(err);
    }
}

function* roundsSaga() {
    // watching for actions related to the user's rounds
    yield takeLatest('FETCH_ROUNDS', fetchRounds);
    yield takeLatest('START_NEW_ROUND', postNewRound);
    yield takeLatest('DELETE_ROUND', deleteRound);
    yield takeLatest('FETCH_ACTIVE_ROUND', fetchActiveRound);
}

export default roundsSaga;