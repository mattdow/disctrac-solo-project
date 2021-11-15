const currentCourseReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CURRENT_COURSE':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default currentCourseReducer;