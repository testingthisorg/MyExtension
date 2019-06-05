import * as actionTypes from "./actionTypes";
import * as notificationActions from "./notificationActions";

import axios from "axios";

export const appValuesGetUserRoles = () => {
  return dispatch => {
    let url = "/app-values/roles";
    axios
      .get(url)
      .then(response => {
        localStorage.setItem("user-roles", JSON.stringify(response.data));
        dispatch(appValuesGetUserRolesComplete(response.data));
      })
      .catch(err => {
        var errMsg = err.response.data.type === 1 ? err.response.data.text : "";
        errMsg += err.response.data.username ? err.response.data.username : "";
        errMsg += err.response.data.password ? err.response.data.password : "";
        dispatch(notificationActions.notificationAdd(errMsg, "error"));
      });
  };
};
// export const appValuesGetDataTypes = () => {
//   return dispatch => {
//     let url = "/app-data-types";
//     axios
//       .get(url)
//       .then(response => {
//         localStorage.setItem("app-data-types", JSON.stringify(response.data.map(k => { return { ...k, id: k.dataTypeId } })));
//         dispatch(appValuesGetUserRolesComplete(response.data));
//       })
//       .catch(err => {
//         var errMsg = err.response.data.type === 1 ? err.response.data.text : "";
//         errMsg += err.response.data.username ? err.response.data.username : "";
//         errMsg += err.response.data.password ? err.response.data.password : "";
//         dispatch(notificationActions.notificationAdd(errMsg, "error"));
//       });
//   };
// };
export const appValuesGetUserRolesComplete = userRoles => {
  return {
    type: actionTypes.APP_VALUES_GET_ROLES_COMPLETE,
    userRoles: userRoles
  };
};
export const appValuesGetDataTypesComplete = dataTypes => {
  return {
    type: actionTypes.APP_VALUES_GET_DATA_TYPES_COMPLETE,
    dataTypes: dataTypes
  };
};
