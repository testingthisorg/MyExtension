import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
    // isBusy: false,
    spinnerTasks: []
    // busyMessage: null
};

// const spinnerStart = (state, action) => {
//     return updateObject(state, { isBusy: true, busyMessage: action.busyMessage });
// }
// const spinnerStop = (state, action) => {
//     return updateObject(state, { isBusy: false, busyMessage: null });
// }

const spinnerTaskAdd = (state, action) => {
    let tasks = state.spinnerTasks.concat(action.task);
    return updateObject(state, { spinnerTasks: tasks });
}
const spinnerTaskUpdate = (state, action) => {
    let tasks = state.spinnerTasks.slice();
    let taskIdx = tasks.findIndex(k => k.id === action.task.id);
    let task = tasks[taskIdx];
    tasks[taskIdx] = { ...task, ...action.task };
    return updateObject(state, { spinnerTasks: tasks });
}
const spinnerTaskRemove = (state, action) => {
    let tasks = state.spinnerTasks.filter(k => k.id !== action.task_id);
    return updateObject(state, { spinnerTasks: tasks });
}
const spinnerTasksClear = (state, action) => {
    return updateObject(state, { spinnerTasks: [] });
}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        // case actionTypes.SPINNER_START: return spinnerStart(state, action);
        // case actionTypes.SPINNER_STOP: return spinnerStop(state, action);
        case actionTypes.SPINNER_TASK_ADD: return spinnerTaskAdd(state, action);
        case actionTypes.SPINNER_TASK_UPDATE: return spinnerTaskUpdate(state, action);
        case actionTypes.SPINNER_TASK_REMOVE: return spinnerTaskRemove(state, action);
        case actionTypes.SPINNER_TASKS_CLEAR: return spinnerTasksClear(state, action);
        default:
            return state;
    }
}

export default reducer;