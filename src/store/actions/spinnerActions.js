import * as actionTypes from './actionTypes';

// export const spinnerStart = (message) => {
//     return {
//         type: actionTypes.SPINNER_START,
//         isBusy: true,
//         busyMessage: message
//     };
// }

// export const spinnerStop = () => {
//     return {
//         type: actionTypes.SPINNER_STOP,
//         isBusy: false,
//         busyMessage: null
//     };
// }

export const spinnerAddTask = (id, message, indicator, pct_complete) => {
    return {
        type: actionTypes.SPINNER_TASK_ADD,
        task: {
            id: id,
            message: message,
            pct_complete: pct_complete,
            indicator: indicator
        }
    };
}
export const spinnerRemoveTask = (task_id) => {
    return {
        type: actionTypes.SPINNER_TASK_REMOVE,
        task_id: task_id
    };
}
export const spinnerUpdateTask = (id, message, indicator, pct_complete) => {
    return {
        type: actionTypes.SPINNER_TASK_UPDATE,
        task: {
            id: id,
            message: message,
            pct_complete: pct_complete,
            indicator:indicator
        }
    };
}

export const spinnerClearTasks = () => {
    return {
        type: actionTypes.SPINNER_TASKS_CLEAR
    };
}