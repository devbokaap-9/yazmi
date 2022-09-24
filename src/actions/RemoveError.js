import {
    GET_ERRORS
} from "../Constants";

// remove errors
export const removeErrorData = () => (dispatch) => {
    dispatch({
        type: GET_ERRORS,
        payload : ''
    })
};
