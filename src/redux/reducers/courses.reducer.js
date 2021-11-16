const coursesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COURSES':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default coursesReducer;