// import * as actions from "../../store/actions/index";

import React, { Component } from "react";

import classes from './Home.module.scss';
import { connect } from "react-redux";

// import { Button } from "@material-ui/core";



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div className={classes.content}><h1>Home Page</h1>
        </div>);
    }
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);