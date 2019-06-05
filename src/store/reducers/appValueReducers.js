import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
    userRoles: [],
    dataTypes: []
};

const appValuesGetRolesComplete = (state, action) => {
    return updateObject(state, { userRoles: action.userRoles });
}
const appValuesGetDataTypesComplete = (state, action) => {
    return updateObject(state, { dataTypes: action.dataTypes });
}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.APP_VALUES_GET_ROLES_COMPLETE: return appValuesGetRolesComplete(state, action);
        case actionTypes.APP_VALUES_GET_DATA_TYPES_COMPLETE: return appValuesGetDataTypesComplete(state, action);
        default:
            return state;
    }
}

export default reducer;