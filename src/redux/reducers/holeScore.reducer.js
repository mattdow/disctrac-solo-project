const holeScoreReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HOLE_SCORES':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default holeScoreReducer;