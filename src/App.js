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
        <Route key="logout" exact path="/logout" component={Logout} />
      );

    }

    let redirect = localStorage.getItem('last-visited');

    let fbInitComponent = null;
    if (this.props.adAssassinId) {
      // console.log('[App.js] - Adding init component');
      fbInitComponent = <FacebookInit fbLogin={() => this.props.fbLogin(this.props.adAssassinId)} />
    }
    let fbSyncComponent = null;
    if (this.props.adAssassinId && this.props.accessToken && this.props.userId) {
      // console.log('[App.js] - Adding sync component');
      fbSyncComponent = <FacebookSync
        spinAddTask={this.props.spinAddTask}
        spinRemoveTask={this.props.spinRemoveTask}
        spinUpdateTask={this.props.spinUpdateTask}
        accessToken={this.props.accessToken}
        notify={this.props.notify}
        appUserId={this.props.appUserId}
        userId={this.props.userId}
      />
    }

    if (!this.props.isAuthenticated) {
      redirect = '/login';
    }
    else if (!this.props.adAssassinId) {
      redirect = "/new-client-setup"
    } else {
      redirect = '/home';
    }
    // console.log('[App.js] [Computed Redirect]', redirect);

    routeArr.push(<Redirect key="redirect" to={redirect} />);
    let showSpinner = this.props.spinnerTasks && this.props.spinnerTasks.length > 0;
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Layout>
            {showSpinner ? (<Spinner tasks={this.props.spinnerTasks} />) : null}
            {fbInitComponent}
            {fbSyncComponent}
            <Notifications />
            {!this.props.isAuthenticated ?
              (<React.Fragment>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={SignUp} />
                  <Redirect to="/login" />
                </Switch>
              </React.Fragment>
              )
              : !this.props.adAssassinId ? (
                <React.Fragment>
                  <Switch>
                    <Route path="/new-client-setup" component={NewClientSetup} />
                    <Redirect to="/new-client-setup" />
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
    spinnerTasks: state.spinner.spinnerTasks,
    roles: state.auth.roles,
    adAssassinId: state.auth.adAssassinId,
    accessToken: state.fbAuth.accessToken,
    appUserId: state.auth.appUserId,
    userId: state.fbAuth.userID
  };
};
const mapDispatchToProps = dispatch => {
  return {
    spinAddTask: (id, spinner_message, indicator, pct_complete) => dispatch(actions.spinnerAddTask(id, spinner_message, indicator, pct_complete)),
    spinUpdateTask: (id, spinner_message, indicator, pct_complete) => dispatch(actions.spinnerUpdateTask(id, spinner_message, indicator, pct_complete)),
    spinRemoveTask: (task_id) => dispatch(actions.spinnerRemoveTask(task_id)),
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    fbLogin: (adAssassinId) => dispatch(actions.fbAuthAsyncAction(adAssassinId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
