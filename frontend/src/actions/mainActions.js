export const SET_X = "SET_X";
export const SET_Y = "SET_Y";
export const SET_R = "SET_R";
export const SET_BOX_SIZE = "SET_BOX_SIZE";
export function setR(R) {
    return{
        type: SET_R,
        payload: R
    }
}

export function setX(X) {
    return{
        type: SET_X,
        payload: X
    }
}

export function setY(Y) {
    return{
        type: SET_Y,
        payload: Y
    }
}

export function setBoxSize(width_height) {
    return{
        type: SET_BOX_SIZE,
        payload: width_height,
    }
}