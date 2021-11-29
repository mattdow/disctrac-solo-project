const userCoursesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_COURSES':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default userCoursesReducer;