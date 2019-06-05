import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    appUserId: null,
    externalId: null,
    avatarUrl: null,
    email: null,    
    error: null,
    loading: false,
    refreshToken: null,
    adAssassinId: null,
    authRedirectPath: "/"
};

const authStartReducer = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccessReducer = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        appUserId: action.appUserId,
        externalId: action.externalId,
        email: action.email,
        avatarUrl: action.avatarUrl,
        roles: action.roles,
        fullName: action.fullName,
        refreshToken: action.refreshToken,
        adAssassinId: action.adAssassinId,
        error: null,
        loading: false
    });
};

const authFailReducer = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const logoutReducer = (state, action) => {
    return updateObject(state, { token: null, appUserId: null, externalId: null, refreshToken: null });
}
const setAuthRedirectPathReducer = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_START: return authStartReducer(state, action);
        case actionTypes.LOGIN_SUCCESS: return authSuccessReducer(state, action);
        case actionTypes.LOGIN_FAIL: return authFailReducer(state, action);
        case actionTypes.LOGOUT: return logoutReducer(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPathReducer(state, action);
        default:
            return state;
    }
}

export default reducer;