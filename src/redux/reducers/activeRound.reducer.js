
// define an empty object that has the keys we will need to 
// populate for a new round
const emptyNewRound = {
    user_id: null,
    course_id: null,
    round_id: null,
}
// const activeRoundReducer = (state = emptyNewRound, action) => {
//     switch (action.type) {
//         case 'START_NEW_ROUND':
//             // spreading the state object and changing the non-array values
//             return { ...state, user_id: action.payload.user, course_id: action.payload.course};
//         case 'SET_ROUND_ID':
//             // spreading the state object and changing the round_id to the new ID
//             return { ...state, round_id: action.payload};
//         case 'LOGOUT':
//             return {};
//         default:
//             return state;
//     }
// } // end of currentCourseReducer

const activeRoundReducer = (state = emptyNewRound, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_ROUND':
            return { ...state, user_id: action.payload.user_id, course_id: action.payload.course_id, round_id: action.payload.id};
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
} // end of activeRoundReducer

export default activeRoundReducer;