const pageReducer = (state = 0, action) => {
    if (action.type === "PAGE_CHANGE") {
        return (state + action.payload); 
    }
    return state;
}

export default pageReducer;