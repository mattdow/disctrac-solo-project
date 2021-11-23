const courseSearchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COURSE_SEARCH_RESULTS':
            return action.payload;
        default:
            return state;
    }
};

export default courseSearchReducer;