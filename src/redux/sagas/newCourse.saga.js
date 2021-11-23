import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// define a function to add a course to the DB







function* newCourseSaga() {
    // watching for actions related to adding new course information
    yield takeLatest('ADD_COURSE', postNewCourse)
}