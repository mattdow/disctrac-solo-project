const currentHoleReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_HOLE':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default currentHoleReducer;