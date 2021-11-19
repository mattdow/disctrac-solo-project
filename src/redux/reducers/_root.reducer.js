import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import rounds from './rounds.reducer';
import currentCourse from './currentCourse.reducer';
import courses from './courses.reducer';
import activeRound from './activeRound.reducer';
import holeScore from './holeScore.reducer';
import holeNote from './holeNote.reducer';
import selectedHS from './selectedHS.reducer';
import currentHole from './currentHole.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  rounds, // a list of the user's rounds
  currentCourse, // an array of hole info objects for a selected course
  courses, // an array of courses in the DB
  activeRound, // an object of the round to be added / edited into the DB
  holeScore, // array of hole scores from the active round from the DB
  holeNote, // array of hole notes from same user and hole
  selectedHS, // object of selected hole score
  currentHole, // object of current hole
});

export default rootReducer;
