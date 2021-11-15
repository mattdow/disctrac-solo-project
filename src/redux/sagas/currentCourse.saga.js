import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCurrentCourse() {
    // GET the current course based on the ID from a click
    try {
        const response = yield axios.get('api/courses');
        yield console.log('GET request for current course data is:', response);
        yield put({ type: 'SET_CURRENT_COURSE', payload: response.data });
    } catch (err) {
        yield put({ type: 'FETCH_CURRENT_COURSE_ERROR' });
        console.log('Error in fetchCurrentCourse', err);
    }
}

export default currentCourseSaga;