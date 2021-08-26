import * as generalTypes from './generalTypes'


export const setToast = (message, messageType) => (dispatch) => {
    dispatch({type: generalTypes.SET_TOAST_MESSAGE, payload: {toastMessage: message, toastMessageType: messageType}});
}

export const setRedirect = (path) => (dispatch) => {
    dispatch({type: generalTypes.SET_REDIRECT, payload: path});
}