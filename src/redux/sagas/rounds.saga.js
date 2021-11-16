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
        yield put({type: 'SET_ROUND_ID', payload: response.data.round_id});
        // may need to fetch the new rounds list
        yield put ({type: 'FETCH_ROUNDS'});
    } catch(err) {
        yield put({ type: 'START_NEW_ROUND_ERROR'});
        console.log('Error in postNewRound', err);
    }

} // end of postNewRound

function* roundsSaga() {
    // watching for actions related to the user's rounds
    yield takeLatest('FETCH_ROUNDS', fetchRounds);
    yield takeLatest('START_NEW_ROUND', postNewRound);
}

export default roundsSaga;