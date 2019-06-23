import React, { Component } from "react";
import { audioBars, bars, concentricCircles, rotatingBlocks } from './indicators';

import { Animate } from "react-show";
import Fade from "@material-ui/core/Fade";
import classes from "./Spinner.module.scss";
import { withTheme } from '@material-ui/core';

// import { withTheme } from "@material-ui/core/styles";

const delay = 7500;
const quotes = [
  'In the middle of every difficulty lies opportunity',
  '"When you can\'t find the sunshine be the sunshine"',
  'The grass is greener where you water it.',
  'Hang in there kiddo!',
  'Sit tight we\'re getting closer.',
  'Life is like riding a bicycle. To keep your balance, you must keep moving.',
];

class spinner extends Component {
  constructor(props) {
    super(props);
    var randIdx = Math.floor(Math.random() * quotes.length);
    this.state = {
      message: quotes[randIdx],
      primaryColor: props.theme.palette.primary.main,
      secondaryColor: props.theme.palette.secondary.main,
      timer: null
    };

  }
  componentDidMount() {
    this.beginMessageRotation();
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  beginMessageRotation = () => {
   var timer = setInterval(() => {
      var randIdx = Math.floor(Math.random() * quotes.length);
      this.setState({ message: quotes[randIdx] });
    }, delay);
    this.setState({timer});
  }

  render() {
    let task = {};
    let indicator = null;
    let { primaryColor, secondaryColor } = this.state;

    if (this.props.tasks && this.props.tasks.length > 0) {
      task = this.props.tasks[0];
      switch (task.indicator) {
        case 0: // audio bars
          indicator = audioBars;
          break;
        case 1:
          indicator = rotatingBlocks;
        case 2:
          indicator = concentricCircles;
          break;
        case 3:
          indicator = bars;
          break;
        default:
          indicator = bars;
          break;
      }
    }

    let msg = task.message ? task.message : this.state.message;

    return (
      <Fade in>
        <div className={classes.outerContainer}>
          <div className={classes.innerContainer}>
            {indicator(primaryColor, secondaryColor)}
            <Animate
              // key={d.key}
              show={true}
              transitionOnMount
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                overflow: "hidden",
                // background: d.color,
                transitionDelay: "0ms",
                width: "100%",
                height: "5rem"

              }}
              start={{
                width: "100%",
                height: "0rem"
              }}
            >
              <span className={classes.message}>
                {msg}
              </span>
            </Animate>
            <Animate
              // key={d.key}
              show={!!task.pct_complete}
              transitionOnMount
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                overflow: "hidden",
                // background: d.color,
                transitionDelay: "0ms",
                width: "100%",
                height: "4rem"

              }}
              start={{
                width: "0px",
                height: "0px"
              }}
            >
              <div className={classes.progressBarContainer}>
                <div className={classes.progressBar} style={{ width: task.pct_complete + "%" }}>

                </div>
              </div>
            </Animate>
          </div>
        </div>
      </Fade>
    );
  }
}

export default withTheme()(spinner);