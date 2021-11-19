const selectedHSReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELECTED_HS':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default selectedHSReducer;