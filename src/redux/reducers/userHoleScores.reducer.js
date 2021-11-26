const userHoleScoresReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_HOLE_SCORES':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default userHoleScoresReducer;