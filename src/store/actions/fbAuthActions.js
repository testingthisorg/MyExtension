import * as actionTypes from "./actionTypes";
import * as spinner from "./spinnerActions";

export const fbAuthSuccessAction = (
  accessToken,
  data_access_expiration_time,
  expiresIn,
  reauthorize_required_in,
  signedRequest,
  userID,
  status
) => {
  return {
    type: actionTypes.FB_LOGIN_SUCCESS,
    accessToken: accessToken,
    data_access_expiration_time: data_access_expiration_time,
    expiresIn: expiresIn,
    reauthorize_required_in: reauthorize_required_in,
    signedRequest: signedRequest,
    userID: userID,
    status: status
  };
};

export const fbAuthFailAction = error => {
  return {
    type: actionTypes.FB_LOGIN_FAIL,
    error: error
  };
};

export const fbPollStatus = () => {
  return dispatch => {
    var interval = setInterval(() => {
      window.FB.getLoginStatus(checkStatus);
    }, 3000);
    function checkStatus(response) {
      console.log('[fbPollStatus][checkStatus]', response);

      if (response.status !== 'connected') {

      } else if (response.status === 'connected') {
        dispatch(
          fbAuthSuccessAction(
            response.authResponse.accessToken,
            response.authResponse.data_access_expiration_time,
            response.authResponse.expiresIn,
            response.authResponse.reauthorize_required_in,
            response.authResponse.signedRequest,
            response.authResponse.userID,
            response.status
          )
        );
        dispatch(spinner.spinnerStop());
        window.clearInterval(interval);
      } else {
        console.log('[fbStatusChanged] Unhandled status!!! "' + response.status + '"');
      }
    }
  }

}

export const fbAuthAsyncAction = (adAssassinId) => {
  return dispatch => {
    try {
      console.log('[fbAuthActions][fbAuthAsyncAction]');
      function fbStatusChanged(response) {
        console.log('[FB.Event][auth.statusChange]', response);

        if (response.status !== 'connected') {
          handleFBLogin();
          dispatch(fbPollStatus);
        } else if (response.status === 'connected') {
          dispatch(
            fbAuthSuccessAction(
              response.authResponse.accessToken,
              response.authResponse.data_access_expiration_time,
              response.authResponse.expiresIn,
              response.authResponse.reauthorize_required_in,
              response.authResponse.signedRequest,
              response.authResponse.userID,
              response.status
            )
          );
          dispatch(spinner.spinnerStop());
        } else {
          console.log('[fbStatusChanged] Unhandled status!!! "' + response.status + '"');
        }
      }
      function fbAuthLogin(response) {

        console.log('[FB.Event][auth.login]', response);
      }
      function fbAuthLogout(response) {

        console.log('[FB.Event][auth.logout]', response);
      }
      function fbAuthResponseChange(response) {

        console.log(new Date(), '[FB.Event][auth.authResponseChange]', response);
      }
      function handleFBLogin() {
        console.log('[handleFBLogin]');
        window.FB.login(fbStatusChanged);
      }

      dispatch(spinner.spinnerStart("Signing in to Facebook"));

      console.log("[Initializing Fb 1st]", adAssassinId);
      window.fbAsyncInit = () => {
        console.log("[Initializing Fb 2nd]", adAssassinId);
        window.FB.Event.subscribe('auth.statusChange', fbStatusChanged);
        window.FB.Event.subscribe('auth.login', fbAuthLogin);
        window.FB.Event.subscribe('auth.logout', fbAuthLogout);
        window.FB.Event.subscribe('auth.authResponseChange', fbAuthResponseChange);
        window.FB.init({
          appId: adAssassinId,
          status: true,
          cookie: false,  // enable cookies to allow the server to access
          // the session
          xfbml: false,  // parse social plugins on this page
          version: 'v3.3' // use version 2.1
        });
        window.FB.getLoginStatus(fbStatusChanged);
      }
      window.fbAsyncInit();
      // console.log("[Pre-Loading fb api]");
      // Load the SDK asynchronously
      // (function (d, s, id) {
      //   console.log("[Loading fb api]");
      //   var js, fjs = d.getElementsByTagName(s)[0];
      //   if (d.getElementById(id)) return;
      //   js = d.createElement(s); js.id = id;
      //   js.src = "//connect.facebook.net/en_US/sdk.js";
      //   fjs.parentNode.insertBefore(js, fjs);
      //   console.log("[Fb api load complete]");
      // }(document, 'script', 'facebook-jssdk'));
    }
    catch (ex) {
      console.log(ex);
    }

  };

};

export const fbLogoutAction = () => {
  return {
    type: actionTypes.FB_LOGOUT
  };
}
