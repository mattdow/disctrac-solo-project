
// define an empty object that has the keys we will need to 
// populate for a new round
const emptyNewRound = {
    user_id: null,
    course_id: null,
    round_id: null,
}
const activeRoundReducer = (state = emptyNewRound, action) => {
    switch (action.type) {
        case 'START_NEW_ROUND':
            // spreading the state object and changing the non-array values
            return { ...state, user_id: action.payload.user, course_id: action.payload.course};
        case 'SET_ROUND_ID':
            // spreading the state object and changing the round_id to the new ID
            return { ...state, round_id: action.payload};
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
} // end of currentCourseReducer
export default activeRoundReducer;