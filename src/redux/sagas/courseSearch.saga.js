import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCourseSearch(action) {
    // GET the DGCR course search results based on the name entered
    try {
        console.log('In fetchCourseSearch with action: ', action);
        
        const response = yield axios.get(`/api/coursesearch/${action.payload.name}`);
        yield console.log('New DGCR course search response: ', response.data); 
        yield put ({ type: 'SET_COURSE_SEARCH_RESULTS', payload: response.data });   
    } catch(err) {
        yield put({ type: 'COURSE_SEARCH_ERROR'});
        console.log('Error in fetchCourseSearch', err);
    }
}









function* courseSearchSaga() {
    // watching for a course search action
    yield takeLatest('FETCH_COURSE_SEARCH', fetchCourseSearch);
}

export default courseSearchSaga;