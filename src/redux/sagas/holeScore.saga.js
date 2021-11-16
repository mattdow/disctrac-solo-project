import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postNewHoleScore(action) {
    console.log('In postNewHoleScore: ', action.payload);
    
    try {
        yield axios.post('/api/holescores', action.payload);
    } catch(err) {
        yield put({ type: 'ADD_HOLE_SCORE_ERROR'});
        console.log('Error in postNewHoleScore', err);
    }
} // end of postNewHoleScore

function* roundsSaga() {

    yield takeLatest('ADD_HOLE_SCORE', postNewHoleScore);
}