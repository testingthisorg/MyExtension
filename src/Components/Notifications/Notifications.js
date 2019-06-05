import React, { Component } from 'react';
import NotificationContent from './NotificationContent/NotificationContent'
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Notifications extends Component {
    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.props.nextNotification();
    };

    handleExited = () => {
        this.props.nextNotification();
    };

    render() {
        var message = null;
        var variant = "info";
        if (this.props.currentNotification !== null) {
            message = this.props.currentNotification.message;
            variant = this.props.currentNotification.variant;
        }
        return (

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.props.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <NotificationContent
                variant={variant}
                message={message}
                onClose={this.handleClose}>

                </NotificationContent>
            </Snackbar>
        );

    }
}
const mapStateToProps = state => {
    return {
        currentNotification: state.notify.currentNotification,
        open: state.notify.isOpen
    };
};
const mapDispatchToProps = dispatch => {
    return {
        nextNotification: () => dispatch(actions.notificationNext())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);