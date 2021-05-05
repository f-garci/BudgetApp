const selectionReducer = (state = "All", action) => {
    switch (action.type) {
        case "SELECT":
            return state;
    }
};

export default selectionReducer;
