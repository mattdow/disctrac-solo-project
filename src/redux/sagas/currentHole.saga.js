import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCurrentHole(action) {
    // GET the current course based on the ID from a click
    try {
        console.log('fetchCurrentHole action.payload', action.payload);
        
        const response = yield axios.get(`api/hole/${action.payload.course}/${action.payload.id}`);
        yield console.log('GET request for current hole is:', response);
        yield put({ type: 'SET_CURRENT_HOLE', payload: response.data });
    } catch (err) {
        yield put({ type: 'FETCH_CURRENT_HOLE_ERROR' });
        console.log('Error in fetchCurrentHole', err);
    }
}

function* currentHoleSaga() {
    // watching for actions related to a hole the user has selected
    yield takeLatest('FETCH_CURRENT_HOLE', fetchCurrentHole);
}

export default currentHoleSaga;