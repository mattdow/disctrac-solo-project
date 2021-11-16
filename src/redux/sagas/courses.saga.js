import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCourses() {
    // GET all the courses in the DB
    try {
        const response = yield axios.get('/api/courses');
        yield console.log('All courses GET request response is:', response);
        yield put({ type: 'SET_COURSES', payload: response.data });
    } catch (err) {
        yield put({ type: 'FETCH_COURSES_ERROR' });
        console.log('Error in fetchCourses', err);        
    }
}

function* coursesSaga() {
    // watching for actions related to the courses table in DB
    yield takeLatest('FETCH_COURSES', fetchCourses);
}

export default coursesSaga;