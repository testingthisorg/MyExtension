import * as actions from "../../store/actions/index";

import React, { Component } from "react";
import { checkValidity, updateObject } from "../../shared/utility";

import { Button } from "@material-ui/core";
import Input from "../../Components/UI/Input/Input";
import classes from "./NewClientSetup.module.scss";
import { connect } from "react-redux";

class NewClientSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignup: true,
      controls: {
        firstName: {
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "First Name"
          },
          value: "",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 20
          },
          valid: false,
          touched: false
        },
        lastName: {
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "Last Name"
          },
          value: "",
          validation: {
            required: true,
            minLength: 2,
            maxLength: 20
          },
          valid: false,
          touched: false
        },
        adAssassinsId: {
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "Ad Assassins Id"
          },
          value: "",
          validation: {
            required: true,
            minLength: 14,
            maxLength: 18
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
  // loadFbLoginApi() {

  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       appId: 829556667400650,
  //       cookie: false,  // enable cookies to allow the server to access
  //       // the session
  //       xfbml: false,  // parse social plugins on this page
  //       version: 'v2.5' // use version 2.1
  //     });
  //   };

  //   console.log("Loading fb api");
  //   // Load the SDK asynchronously
  //   (function (d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s); js.id = id;
  //     js.src = "//connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
  // }

  componentDidMount = () => {
    // this.loadFbLoginApi();
  };
  // testAPI() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   window.FB.api('/me', function (response) {
  //     console.log('[testAPI]', response)
  //     console.log('Successful login for: ' + response.name);
  //     document.getElementById('status').innerHTML =
  //       'Thanks for logging in, ' + response.name + '!';
  //   });
  // }
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

  submitHandler = event => {
    event.preventDefault();
    this.props.userSettingsUpdateAction(
      this.props.appUserId,
      this.state.controls.firstName.value,
      this.state.controls.lastName.value,
      this.state.controls.adAssassinsId.value
    );
  };
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };
  // statusChangeCallback(response) {
  //   console.log('statusChangeCallback');
  //   console.log(response);
  //   if (response.status === 'connected') {
  //     this.testAPI();
  //   } else if (response.status === 'not_authorized') {
  //     console.log("Please log into this app.");
  //   } else {
  //     console.log("Please log into this facebook.");
  //   }
  // }
  // checkLoginState() {
  //   window.FB.getLoginStatus(function (response) {
  //     this.statusChangeCallback(response);
  //   }.bind(this));
  // }
  // handleFBLogin = () => {
  //   window.FB.login(this.checkLoginState());
  // }
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
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

    return (
      <div className={classes.container}>
        <div className={classes.overlay}>
          <div className={classes.panelContainer}>
            <div className={classes.headline}>Welcome!</div>
            <div className={classes.subText}>Please complete setting up your account.</div>
            <div className={classes.divider} />

            <form onSubmit={this.submitHandler} autoComplete="false">
              {form}
              <Button
                fullWidth={true}
                className={classes.loginBtn}
                disabled={!this.state.canSubmit}
                type="submit"
                variant="contained"
                color="primary"
              >
                CONTINUE
                 </Button>
            </form>

          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    appUserId: state.auth.appUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPathAction("/")),
    userSettingsUpdateAction: (appUserId, firstName, lastName, adAssassinsId) => dispatch(actions.userSettingsUpdateAction(appUserId, firstName, lastName, adAssassinsId))
  };
};

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewClientSetup);
