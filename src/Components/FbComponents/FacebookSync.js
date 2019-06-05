import  { Component } from 'react'
import { connect } from 'react-redux'

export class FacebookSync extends Component {

    componentDidMount = () => {
        console.log("[Facebook Syncing]", this.props.accessToken);
    };

    render() {
        return (null)
    }
}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookSync)
