import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
// create a generator function to add a hole score
function* postNewHoleScore(action) {
    console.log('In postNewHoleScore: ', action.payload);
    
    try {
        yield axios.post('/api/holescores', action.payload);
    } catch(err) {
        yield put({ type: 'ADD_HOLE_SCORE_ERROR'});
        console.log('Error in postNewHoleScore', err);
    }
} // end of postNewHoleScore
// create a generator function to grab holescores for a given round from DB
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

// create a generator function to fetch the appropriate hole notes
function* fetchHoleNotes(action) {
    console.log('In fetchHoleNotes with payload:', action.payload);
    try {
        const response = yield axios.get(`api/holescores/${action.payload.course}/${action.payload.hole}`)
        yield put({ type: 'SET_HOLE_NOTES', payload: response.data });
    } catch(err) {
        yield put({ type: 'FETCH_HOLE_NOTES_ERROR'});
        console.log('Error in fetchHoleNotes', err);
    }
}

// create a generator function to change an existing hole score
function* changeHoleScore(action) {
    console.log('In changeHoleScore for holeScoreID: ', action.payload.holeScore_id);
    try {
        yield axios.put('api/holescores', action.payload);
    } catch(err) {
        yield put({ type: 'CHANGE_HOLE_SCORE_ERROR'});
        console.log('Error in changeHoleScore', err);
    }
} // end of changeHoleScores

function* fetchSelectedHS(action) {
    console.log('In fetchSelectedHS for HS ID:', action.payload);
    try {
        const response = yield axios.get(`api/selectedhole/${action.payload}`);
        console.log('Response from fetchSelHS:', response);
        
        yield put({ type: 'SET_SELECTED_HS', payload: response.data })
    } catch(err) {
        yield put({ type: 'FETCH_SELECTED_HS_ERROR'});
        console.log('Error in fetch sle HS', err);    
    } 
}

function* holeScoreSaga() {

    yield takeLatest('ADD_HOLE_SCORE', postNewHoleScore);
    yield takeLatest('CHANGE_HOLE_SCORE', changeHoleScore);
    yield takeLatest('FETCH_HOLE_SCORES', fetchHoleScores);
    yield takeLatest('FETCH_HOLE_NOTES', fetchHoleNotes);
    yield takeLatest('FETCH_SELECTED_HS',  fetchSelectedHS);
}

export default holeScoreSaga;