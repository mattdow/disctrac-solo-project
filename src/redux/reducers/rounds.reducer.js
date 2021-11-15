const roundsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ROUNDS':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default roundsReducer;