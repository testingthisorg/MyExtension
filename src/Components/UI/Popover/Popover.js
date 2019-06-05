import React, { Component } from 'react'

import classes from "./Popover.module.scss";

export default class Popover extends Component {

    constructor(props) {
        super(props);
        this.state = {

            arrow: "down"
        }
    }
    render() {
        var { arrow } = this.state;
        var { x, y, visible } = this.props;
        var popover = null;
        if (visible) {
            popover = (
                <div style={{ left: x, top: y }} className={classes.body} >
                    {this.props.children}
                    <div className={classes.arrowBottom}>

                    </div>
                </div>);
        }
        return  popover ;
    }
}