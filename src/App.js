import "./App.scss";

import * as actions from "./store/actions/index";

import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import React, { Component, Suspense } from "react";

import { FacebookInit } from "./Components/FbComponents/FacebookInit";
import { FacebookSync } from "./Components/FbComponents/FacebookSync";
import Home from "./containers/Home/Home";
import Layout from "./containers/Layout/Layout";
import Loading from "./containers/Loading/Loading";
import Login from "./containers/Login/Login";
import Logout from "./containers/Logout/Logout";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import NewClientSetup from "./containers/NewClientSetup/NewClientSetup";
import Notifications from "./Components/Notifications/Notifications";
import { Route } from "react-router-dom";
import SignUp from "./containers/SignUp/SignUp";
import Spinner from "./Components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import theme from "./Theme/theme";

const UserManagement = React.lazy(() =>
  import("./containers/UserManagement/UserManagement")
);

const Administration = React.lazy(() =>
  import("./containers/Administration/Administration")
);

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routeArr = [];
    if (this.props.isAuthenticated) {
      routeArr.push(<Route key="home" exact path="/home" component={Home} />);
      routeArr.push(
        <Route key="logout" exact path="/logout" component={Logout} />
      );

      // routeArr.push(
      //   <Route
      //     key="ProjectCalculations"
      //     exact
      //     path="/project-calculations"
      //     render={() => (
      //       <Suspense fallback={<Loading />}>
      //         <ProjectCalculations />
      //       </Suspense>
      //     )}
      //   />
      // );

    }

    // if (this.props.isAuthenticated && this.props.roles === "Administrator") {
    routeArr.push(
      <Route
        key="UserManagement"
        exact
        path="/user-management"
        render={() => (
          <Suspense fallback={<Loading />}>
            <UserManagement />
          </Suspense>
        )}
      />
    );
    routeArr.push(
      <Route
        key="NewClientSetup"
        exact
        path="/new-client-setup"
        render={() => (
          <Suspense fallback={<Loading />}>
            <NewClientSetup />
          </Suspense>
        )}
      />
    );
    routeArr.push(
      <Route
        key="Administration"
        exact
        path="/administration"
        render={() => (
          <Suspense fallback={<Loading />}>
            <Administration />
          </Suspense>
        )}
      />
    );

    let redirect = localStorage.getItem('last-visited');
    if (!this.props.adAssassinId) {
      redirect = "/new-client-setup"
    } else if (!redirect) {
      redirect = '/home';
    }
    routeArr.push(
      <Redirect key="redirect" to={redirect} />)
    // } else {
    // routeArr.push(
    //   <Redirect key="redirect" to="/simulation-builder" />)
    // }

    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Layout>
            {this.props.isBusy ? (<Spinner message={this.props.message} />) : null}
            {this.props.adAssassinId ? <FacebookInit
              fbLogin={() => this.props.fbLogin(this.props.adAssassinId)} /> : null}
            {this.props.accessToken ? <FacebookSync accessToken={this.props.accessToken} /> : null}
            <Notifications />
            {!this.props.isAuthenticated ?
              (<React.Fragment>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/SignUp" component={SignUp} />
                  <Redirect to="/login" />
                </Switch>
              </React.Fragment>
              )

              : (
                <React.Fragment>
                  <Switch>
                    {routeArr}
                  </Switch>
                </React.Fragment>
              )
            }
          </Layout>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isBusy: state.spinner.isBusy,
    message: state.spinner.busyMessage,
    roles: state.auth.roles,
    adAssassinId: state.auth.adAssassinId,
    accessToken: state.fbAuth.accessToken
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    fbLogin: (adAssassinId) => dispatch(actions.fbAuthAsyncAction(adAssassinId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
