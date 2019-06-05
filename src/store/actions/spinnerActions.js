
import * as actionTypes from './actionTypes';

export const spinnerStart = (message) => {
    return {
        type: actionTypes.SPINNER_START,
        isBusy: true,
        busyMessage: message
    };
}

export const spinnerStop = () => {
    return {
        type: actionTypes.SPINNER_STOP,
        isBusy: false,
        busyMessage: null
    };
}
