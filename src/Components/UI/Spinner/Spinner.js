import { audioBars, bars, concentricCircles, rotatingBlocks } from './indicators';

import { Animate } from "react-show";
import Fade from "@material-ui/core/Fade";
import React from "react";
import classes from "./Spinner.module.scss";
import { withTheme } from "@material-ui/core/styles";

const spinner = props => {
  const { theme } = props;
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  // 

  let task = {};
  let indicator = null;
  if (props.tasks && props.tasks.length > 0) {
    task = props.tasks[0];
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
              {task.message}
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
};

export default withTheme()(spinner);
