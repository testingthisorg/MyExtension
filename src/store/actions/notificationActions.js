
import * as actionTypes from './actionTypes';

export const notificationAdd = (message, variant) => {
    return {
        type: actionTypes.NOTIFICATION_ADD,
        message: message,
        variant: variant
    };
}

export const notificationNext = () => {
    return dispatch => {
        dispatch(closeNotification());
        setTimeout(() => {
            dispatch(shiftNotificationQueue());
        }, 500);
    }
}

export const closeNotification = () => {
    return {
        type: actionTypes.NOTIFICATION_CLOSE
    };
}

export const shiftNotificationQueue = () => {
    return {
        type: actionTypes.NOTIFICATION_SHIFT_QUEUE
    };
}