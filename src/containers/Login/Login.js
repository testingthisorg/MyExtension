import * as actions from "../../store/actions/index";

import React, { Component } from "react";
import { checkValidity, updateObject } from "../../shared/utility";

import { Button } from "@material-ui/core";
import Input from "../../Components/UI/Input/Input";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import classes from "./Login.module.scss";
import compose from "recompose/compose";
import { connect } from "react-redux";
import withWidth from "@material-ui/core/withWidth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignup: false,
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

  componentDidMount = () => {
    if (this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  };

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

  submitSignInHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };


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
              <form onSubmit={this.submitSignInHandler} autoComplete="true">
                {signInform}
                <Button
                  fullWidth={true}
                  className={classes.loginBtn}
                  disabled={!this.state.canSubmit}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  LOGIN
                 </Button>
              </form>
              <NavLink className={classes.subText} exact to="/signup">Have an invite code?  Click here to sign up!</NavLink>
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
    onAuth: (email, password, isSignup) =>
      dispatch(actions.authAsyncAction(email, password, isSignup)),
    onSetAuthRedirectPath: () =>
      dispatch(actions.setAuthRedirectPathAction("/"))
  };
};

export default compose(withWidth())(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
