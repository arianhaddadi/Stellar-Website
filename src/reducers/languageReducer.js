const langReducer = (state = "fa", action) => {
    if (action.type === "LANG_CHANGE") {
        return action.payload; 
    }
    return state;
}

export default langReducer;