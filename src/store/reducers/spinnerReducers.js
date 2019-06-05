import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
    isBusy: false,
    busyMessage: null
};

const spinnerStart = (state, action) => {
    return updateObject(state, { isBusy: true, busyMessage: action.busyMessage });
}
const spinnerStop = (state, action) => {
    return updateObject(state, { isBusy: false, busyMessage: null });
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.SPINNER_START: return spinnerStart(state, action);
        case actionTypes.SPINNER_STOP: return spinnerStop(state, action);
        default:
            return state;
    }
}

export default reducer;