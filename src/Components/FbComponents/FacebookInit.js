import { Component } from 'react'

export class FacebookInit extends Component {
    componentDidMount = () => {
        this.props.fbLogin();
    };
    render() {
        return (null);
    }
}

export default FacebookInit;
