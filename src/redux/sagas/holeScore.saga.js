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

function* fetchHoleScores(action) {
    console.log('In fetchHoleScores for round ID: ', action.payload);
    try {
        const response = yield axios.get(`/api/holescores/${action.payload}`);
        yield console.log('Hole Score GET request response is:', response);
        yield put({ type: 'SET_HOLE_SCORES', payload: response.data });        
    } catch(err) {
        yield put({ type: 'FETCH_HOLE_SCORE_ERROR'});
        console.log('Error in fetchHoleScores', err); 
    }
}

function* holeScoreSaga() {

    yield takeLatest('ADD_HOLE_SCORE', postNewHoleScore);
    yield takeLatest('FETCH_HOLE_SCORES', fetchHoleScores)
}

export default holeScoreSaga;