import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
    notificationQueue: [],
    currentNotification: null,
    isOpen: false
};

const notificationAdd = (state, action) => {
    var item = { message: action.message, variant: action.variant };
    if (state.currentNotification === null) {
        return updateObject(state,
            {
                currentNotification: item,
                isOpen: true
            });
    }
    else {
        var newArray = state.notificationQueue.concat(item);
        return updateObject(state,
            { notificationQueue: newArray });
    }

}
const notificationShiftQueue = (state, action) => {
    var newArray = state.notificationQueue.slice();
    var currNotification = newArray.shift();
    return updateObject(state,
        {
            notificationQueue: newArray,
            currentNotification: !!currNotification ? currNotification : null,
            isOpen: !!currNotification
        }
    );
}
const notificationClose = (state, action) => {
    return updateObject(state, { isOpen: false });
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.NOTIFICATION_ADD: return notificationAdd(state, action);
        case actionTypes.NOTIFICATION_SHIFT_QUEUE: return notificationShiftQueue(state, action);
        case actionTypes.NOTIFICATION_CLOSE: return notificationClose(state, action);
        default:
            return state;
    }
}

export default reducer;