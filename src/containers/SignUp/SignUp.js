import * as actions from "../../store/actions/index";

import React, { Component } from "react";
import { checkValidity, updateObject } from "../../shared/utility";

import { Button } from "@material-ui/core";
import Input from "../../Components/UI/Input/Input";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import classes from "./SignUp.module.scss";
import { connect } from "react-redux";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignup: true,
      controls: {
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            label: "Email Address"
          },
          value: "",
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            label: "Password"
          },
          value: "",
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        },
        passwordRepeate: {
          elementType: "input",
          elementConfig: {
            type: "password",
            label: "Repeat Password"
          },
          value: "",
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        },
        inviteCode: {
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "Invite Code"
          },
          value: "",
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        }
      }
    };
    // check initial validity
    let cntrlKeys = Object.keys(this.state.controls);
    for (let idx = 0; idx < cntrlKeys.length; idx++) {
      let key = cntrlKeys[idx];
      let cntrl = this.state.controls[key];
      this.state.controls[key].valid = checkValidity(
        cntrl.value,
        cntrl.validation
      );
    }



  }
  loadFbLoginApi() {

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 829556667400650,
        cookie: false,  // enable cookies to allow the server to access
        // the session
        xfbml: false,  // parse social plugins on this page
        version: 'v2.5' // use version 2.1
      });
    };

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  componentDidMount = () => {
    if (this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
    // this.loadFbLoginApi();
  };
  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    window.FB.api('/me', function (response) {
      console.log('[testAPI]', response)
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    let cntrlKeys = Object.keys(updatedControls);
    var formValid = true;
    let anyTouched = false;
    for (let idx = 0; idx < cntrlKeys.length; idx++) {
      let key = cntrlKeys[idx];
      if (!updatedControls[key].valid) {
        formValid = false;
      }
      if (updatedControls[key].touched) {
        anyTouched = true;
      }
    }

    let canSubmit = anyTouched && formValid;
    this.setState({ controls: updatedControls, canSubmit: canSubmit });
  };

  submitSignUpHandler = event => {
    event.preventDefault();
    this.props.onSignUp(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.controls.inviteCode.value
    );
  };
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };
  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      console.log("Please log into this app.");
    } else {
      console.log("Please log into this facebook.");
    }
  }
  checkLoginState() {
    window.FB.getLoginStatus(function (response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }
  handleFBLogin = () => {
    window.FB.login(this.checkLoginState());
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let signInform = formElementsArray.map(formElement => (
      <Input
        id={formElement.id}
        key={formElement.id}
        required={formElement.config.validation.required}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.container}>
        <div className={classes.overlay}>
          {authRedirect}
          <div className={classes.loginPanelContainer}>
            <div className={classes.topPanel}>
              <div>
                {/* <Button
                  id="btn-social-login"
                  onClick={this.handleFBLogin}
                >
                  <span>Sign in with Facebook</span>
                </Button>
                <div style={{minWidth: "100px", minHeight:"100px", backgroundColor: "gray"}} id="status"></div> */}
              </div>
            </div>
            <div className={classes.bottomPanel}>
              {/* <h4>{!this.state.isSignup ? "Login" : "Signup"}</h4> */}
              <form onSubmit={this.submitSignUpHandler} autoComplete="true">
                {signInform}
                <Button
                  fullWidth={true}
                  className={classes.loginBtn}
                  disabled={!this.state.canSubmit}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  SIGN UP
                 </Button>
              </form>
              <NavLink  className={classes.subText} exact to="/login">Already a member? Click here to login.</NavLink>
            </div>

          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (email, password, inviteCode) => dispatch(actions.signUpAsyncAction(email, password, inviteCode)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPathAction("/")),

  };
};

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp);
