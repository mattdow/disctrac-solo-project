const holeNoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HOLE_NOTES':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}
export default holeNoteReducer;