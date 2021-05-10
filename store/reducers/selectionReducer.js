import { modalVisible, selected } from "../actions/actionTypes";

const initialState = {
    month: "All",
    modalVisible: false,
};

const selectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case selected:
            return { ...state, month: action.month };
        case modalVisible:
            return { ...state, modalVisible: action.visible };
        default:
            return state;
    }
};

export default selectionReducer;
