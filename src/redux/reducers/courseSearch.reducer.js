const courseSearchReducer = (state = [], action => {
    switch (action.type) {
        case 'SET_COURSE_SEARCH_RESULTS':
            return [...state, action.payload];
        default:
            return state;
    }
})