import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
    accessToken: null,
    data_access_expiration_time: null,
    expiresIn: null,
    reauthorize_required_in: null,
    signedRequest: null,
    userID: null,
    status: false
};

const fbAuthStartReducer = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const fbAuthSuccessReducer = (state, action) => {
    return updateObject(state, {
        accessToken: action.accessToken,
        data_access_expiration_time: action.data_access_expiration_time,
        expiresIn: action.expiresIn,
        reauthorize_required_in: action.reauthorize_required_in,
        signedRequest: action.signedRequest,
        userID: action.userID,
        status: action.status,
    });
};

const fbAuthFailReducer = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

// const setFbAuthRedirectPathReducer = (state, action) => {
//     return updateObject(state, { authRedirectPath: action.path });
// }
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FB_LOGIN_START: return fbAuthStartReducer(state, action);
        case actionTypes.FB_LOGIN_SUCCESS: return fbAuthSuccessReducer(state, action);
        case actionTypes.FB_LOGIN_FAIL: return fbAuthFailReducer(state, action);
        case actionTypes.FB_LOGOUT: return fbLogoutReducer(state, action);
        default:
            return state;
    }
}

const fbLogoutReducer = (state, action) => {
    return updateObject(state,
        {
            accessToken: null,
            data_access_expiration_time: null,
            expiresIn: null,
            reauthorize_required_in: null,
            signedRequest: null,
            userID: null,
            status: null
        });
}

export default reducer;