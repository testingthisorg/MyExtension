import React, { Component } from 'react'

export class FacebookInit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false
        };
    }
    componentDidMount = () => {
        console.log('[FacebookInit][componentDidMount]');
        if (!this.state.initialized) {
            this.props.fbLogin();
            this.setState({ initialized: true });
        }
    };
    render() {
        return (<div style={{ height: "0px", width: "0px", backgroundColor: "purple" }}></div>);
    }
}

export default FacebookInit;
