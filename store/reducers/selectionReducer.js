import { modalVisible, selected, signedIn } from "../actions/actionTypes";

const initialState = {
    month: "All",
    modalVisible: false,
    signedIn: false,
};

const selectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case selected:
            return { ...state, month: action.month };
        case modalVisible:
            return { ...state, modalVisible: action.visible };
        case signedIn:
            return { ...state, signedIn: action.isSignedIn };
        default:
            return state;
    }
};

export default selectionReducer;
