import * as actions from '../../store/actions'

import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.props.onLogout();
        this.props.onFbLogout();
    }
    render() {
        return (<Redirect to="/login" />);
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutAction()),
        onFbLogout: () =>dispatch(actions.fbLogoutAction())
    };
};
export default connect(null, mapDispatchToProps)(Logout);