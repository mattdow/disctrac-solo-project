import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchRounds() {
    // GET all the user rounds
    try {
        const response = yield axios.get('/api/rounds')
    }
}