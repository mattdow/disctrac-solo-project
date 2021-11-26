const userStatsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_STATS':
            return action.payload;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}

export default userStatsReducer;