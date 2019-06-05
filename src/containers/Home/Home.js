import * as actions from "../../store/actions/index";

import React, { Component } from "react";

import classes from './Home.module.scss';
import { connect } from "react-redux";

// import { Button } from "@material-ui/core";



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleFBLogin = () => {
        console.log('[handleFBLogin]');
        window.FB.login(this.checkLoginState());
    }
    checkLoginState() {
        console.log('[checkLoginState]');
        window.FB.getLoginStatus(function (response) {

            console.log('[window.FB.getLoginStatus] ');
            this.statusChangeCallback(response);
        }.bind(this));
    }
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
    testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', function (response) {
            console.log('[testAPI]', response)
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
        });
    }

    render() {
        return (<div className={classes.content}><h1>Home Page</h1>
        </div>);
    }
}
const mapStateToProps = state => {
    return {
        adAssassinId: state.auth.adAssassinId
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);