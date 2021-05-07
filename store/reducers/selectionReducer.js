import { selected } from "../actions/actionTypes";

const initialState = {
    month: "All",
};

const selectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case selected:
            return { ...state, month: action.month };
        default:
            return state;
    }
};

export default selectionReducer;
