
// define an empty object that has the keys we will need to 
// populate for a new round
const emptyNewRound = {
    user_id: null,
    course_id: null,
    hole_scores_array: []
}
const activeRoundReducer = (state = emptyNewRound, action) => {
    switch (action.type) {
        case 'START_NEW_ROUND':
            return { ...state, user_id: action.payload.user, course_id: action.payload.course}
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
} // end of currentCourseReducer
export default activeRoundReducer;