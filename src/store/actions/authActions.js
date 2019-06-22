import * as actionTypes from "./actionTypes";
import * as notificationActions from "./notificationActions";
import * as spinner from "./spinnerActions";

import axios from "axios";
import { notifyMsgFromHttpRespErr } from "../../shared/utility";

export const authStartAction = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

export const authSuccessAction = (
  token,
  appUserId,
  externalId,
  email,
  avatarUrl,
  roles,
  fullName,
  refreshToken,
  adAssassinId
) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    idToken: token,
    appUserId: appUserId,
    externalId: externalId,
    email: email,
    avatarUrl: avatarUrl,
    roles: roles,
    fullName: fullName,
    refreshToken: refreshToken,
    adAssassinId: adAssassinId
  };
};

export const authFailAction = error => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  };
};

export const logoutAction = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration-date");
  localStorage.removeItem("app-user-id");
  localStorage.removeItem("external-id");
  localStorage.removeItem("email");
  localStorage.removeItem("avatar-url");
  localStorage.removeItem("roles");
  localStorage.removeItem("user-roles");
  localStorage.removeItem("last-project");
  localStorage.removeItem("view-matrix");
  localStorage.removeItem("full-name");
  localStorage.removeItem("refresh-token");
  localStorage.removeItem("ad-assassin-id");
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkAuthTimeoutAction = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      console.log("[Refreshing Id Token]");
      dispatch(refreshIdTokenAction());
      //dispatch(logoutAction());
    },
    expirationTime * 1000-30000 // exp time in seconds minus 30 seconds
    );
  };
};
export const refreshIdTokenAction = () => {
  return dispatch => {
    let refreshToken = localStorage.getItem("refresh-token");
    let url = "/accounts/refresh/" + refreshToken;
    axios
      .get(url)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expiration-date", expirationDate);
        localStorage.setItem("refresh-token", response.data.refreshToken);
        dispatch(checkAuthTimeoutAction(response.data.expiresIn));
      })
      .catch(err => {
        let errMsg = notifyMsgFromHttpRespErr(err);
        dispatch(logoutAction());
        dispatch(spinner.spinnerClearTasks());
        dispatch(notificationActions.notificationAdd(errMsg, "error"));
      });
  };
}

export const authAsyncAction = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStartAction());
    dispatch(spinner.spinnerAddTask(1, "Authenticating"));
    const authData = {
      email: email,
      password: password
    };
    let url = "/accounts/login";
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expiration-date", expirationDate);
        localStorage.setItem("app-user-id", response.data.appUserId);
        localStorage.setItem("external-id", response.data.externalId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("avatar-url", response.data.avatarUrl);
        localStorage.setItem("roles", response.data.roles);
        localStorage.setItem("full-name", response.data.fullName);
        localStorage.setItem("refresh-token", response.data.refreshToken);
        localStorage.setItem("ad-assassin-id", response.data.adAssassinId);

        // dispatch(appValueActions.appValuesGetUserRoles());
        // dispatch(appValueActions.appValuesGetDataTypes());
        dispatch(
          authSuccessAction(
            response.data.idToken,
            response.data.appUserId,
            response.data.externalId,
            response.data.email,
            response.data.avatarUrl,
            response.data.roles,
            response.data.fullName,
            response.data.refreshToken,
            response.data.adAssassinId
          )
        );
        dispatch(checkAuthTimeoutAction(response.data.expiresIn));
        dispatch(spinner.spinnerRemoveTask(1));
      })
      .catch(err => {
        let errMsg = notifyMsgFromHttpRespErr(err);
        dispatch(authFailAction(errMsg));
        dispatch(notificationActions.notificationAdd(errMsg, "error"));
        dispatch(spinner.spinnerRemoveTask(1));
      });
  };
};
export const signUpAsyncAction = (email, password, inviteCode) => {
  return dispatch => {
    dispatch(authStartAction());
    dispatch(spinner.spinnerAddTask(2, "Registering"));
    const authData = {
      email: email,
      password: password,
      inviteCode: inviteCode
    };
    let url = "/accounts/signup";
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expiration-date", expirationDate);
        localStorage.setItem("app-user-id", response.data.appUserId);
        localStorage.setItem("external-id", response.data.externalId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("avatar-url", response.data.avatarUrl);
        localStorage.setItem("roles", response.data.roles);
        localStorage.setItem("full-name", response.data.fullName);
        localStorage.setItem("refresh-token", response.data.refreshToken);
        localStorage.setItem("ad-assassin-id", response.data.adAssassinId);

        // dispatch(appValueActions.appValuesGetUserRoles());
        // dispatch(appValueActions.appValuesGetDataTypes());
        dispatch(
          authSuccessAction(
            response.data.idToken,
            response.data.appUserId,
            response.data.externalId,
            response.data.email,
            response.data.avatarUrl,
            response.data.roles,
            response.data.fullName,
            response.data.refreshToken,
            response.data.adAssassinId
          )
        );
        dispatch(checkAuthTimeoutAction(response.data.expiresIn));
        dispatch(spinner.spinnerRemoveTask(2));
      })
      .catch(err => {
        let errMsg = notifyMsgFromHttpRespErr(err);
        dispatch(authFailAction(errMsg));
        dispatch(notificationActions.notificationAdd(errMsg, "error"));
        dispatch(spinner.spinnerRemoveTask(2));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logoutAction());
    } else {
      const expirationDate = new Date(localStorage.getItem("expiration-date"));
      if (expirationDate < new Date()) {
        dispatch(logoutAction());
      } else {
        const appUserId = localStorage.getItem("app-user-id");
        const externalId = localStorage.getItem("external-id");
        const email = localStorage.getItem("email");
        const avatarUrl = localStorage.getItem("avatar-url");
        const roles = localStorage.getItem("roles");
        const fullName = localStorage.getItem("full-name");
        // const dataTypes = JSON.parse(localStorage.getItem("app-data-types"));
        const refreshToken = localStorage.getItem("refresh-token");
        const adAssassinId = localStorage.getItem("ad-assassin-id");
        // Promise.all([
          // dispatch(appValueActions.appValuesGetUserRolesComplete(userRoles)),
          // dispatch(appValueActions.appValuesGetDataTypesComplete(dataTypes))
        // ]).then(() => {
          dispatch(
            authSuccessAction(
              token,
              appUserId,
              externalId,
              email,
              avatarUrl,
              roles,
              fullName,
              refreshToken,
              adAssassinId
            )
          );
        // });

        dispatch(
          checkAuthTimeoutAction(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const setAuthRedirectPathAction = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const userSettingsUpdateSuccess = (fullName, adAssassinsId) => {
  return {
    type: actionTypes.USER_SETTINGS_UPDATE_SUCCESS,
    fullName: fullName,
    adAssassinId: adAssassinsId
  }
}

export const userSettingsUpdateAction = (appUserId, firstName, lastName, adAssassinId) => {
  return dispatch => {
    dispatch(spinner.spinnerAddTask(3, "Updating"));
    const data = {
      appUserId: appUserId,
      firstName: firstName,
      lastName: lastName,
      adAssassinId: adAssassinId
    };
    let url = "/users";
    axios
      .patch(url, data)
      .then(response => {

        localStorage.setItem("full-name", response.data.fullName);
        localStorage.setItem("ad-assassin-id", response.data.adAssassinId);
        dispatch(
          userSettingsUpdateSuccess(
            response.data.fullName,
            response.data.adAssassinId
          )
        );
        dispatch(spinner.spinnerRemoveTask(3));
      })
      .catch(err => {
        let errMsg = notifyMsgFromHttpRespErr(err);
        dispatch(notificationActions.notificationAdd(errMsg, "error"));
        dispatch(spinner.spinnerRemoveTask(3));
      });
  };
};