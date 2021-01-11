import {
    SET_BOX_SIZE,
    SET_R,
    SET_Y,
    SET_X
} from "../actions/mainActions";

const initialState = {
    x: null,
    y: null,
    r:5,
    boxSize: 600
}

export function mainReducer(state=initialState, action){
    switch (action.type) {
        case(SET_X):
            return {...state, x: action.payload};
        case(SET_Y):
            return {...state, y: action.payload};
        case(SET_R):
            return {...state, r: action.payload};
        case (SET_BOX_SIZE):
            return {...state, boxSize: action.payload}
    }
    return state;
}
