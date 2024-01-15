const modeReducer = (state = "Home", action) => {
    if (action.type === "CHANGE_MODE") {
        return action.payload;
    }
    return state;
}

export default modeReducer;