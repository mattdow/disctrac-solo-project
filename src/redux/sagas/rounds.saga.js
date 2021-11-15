import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRounds() {
    // GET all the user rounds
    try {
        const response = yield axios.get('/api/rounds');
        yield console.log('User GET request response is:', response);
        yield put({ type: 'SET_ROUNDS', payload: response.data });
    } catch (err) {
        yield put({ type: 'FETCH_ROUNDS_ERROR' });
        console.log('Error in fetchRounds', err);
    }
}

function* roundsSaga() {
    // watching for actions related to the user's rounds
    yield takeLatest('FETCH_ROUNDS', fetchRounds);
}

export default roundsSaga;