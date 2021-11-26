const userRoundScoresReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_ROUND_SCORES':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default userRoundScoresReducer;