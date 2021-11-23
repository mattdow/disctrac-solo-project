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

function* postNewCourse(action) {
    try {
        console.log('In postNewCourse');
        
        const response = yield axios.post('/api/courses', action.payload);
        // define an object that is a combination of the new course and the hole information from payload
        // remove the course info from action.payload, leaving only hole info
        console.log('postNewCourse saga, response is:', response.data.course_id);
        const courseHoleInfo = yield axios.get(`/api/newcourse/${action.payload.course_id}`);
            console.log('postNewCourse saga, courseHoleInfo is: ', courseHoleInfo);
        yield axios.post(`/api/newholes/${response.data.course_id}`, courseHoleInfo.data);
        
    } catch(err) {
        yield put({ type: 'ADD_NEW_COURSE_ERROR'});
        console.log('Error in postNewCourse', err);
    }
}

function* coursesSaga() {
    // watching for actions related to the courses table in DB
    yield takeLatest('FETCH_COURSES', fetchCourses);
    yield takeLatest('ADD_NEW_COURSE', postNewCourse);
}

export default coursesSaga;