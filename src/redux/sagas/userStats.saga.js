import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// create a generator function to get the user's total number of rounds


function* userStatsSaga() {

    yield takeLatest('FETCH_TOTAL_ROUNDS', fetchTotalRounds);
}