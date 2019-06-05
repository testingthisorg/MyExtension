import Fade from "@material-ui/core/Fade";
import React from "react";
import classes from "./Spinner.module.scss";
import { withTheme } from "@material-ui/core/styles";

const spinner = props => {
  const { theme } = props;
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  // let vals = secondaryColor + ";" + primaryColor + ";" + primaryColor;
  return (
    <Fade in>
      <div className={classes.outerContainer}>
        <div className={classes.innerContainer}>
          <svg width="65" height="80" viewBox="0 0 70 80" xmlns="http://www.w3.org/2000/svg" fill="#FFF">
            <g transform="matrix(1 0 0 -1 0 80)">
              <rect width="10" height="20" rx="3" fill={primaryColor}>
                <animate attributeName="height"
                  begin="0s" dur="4.3s"
                  values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear"
                  repeatCount="indefinite" />
              </rect>
              <rect x="15" width="10" height="80" rx="3" fill={secondaryColor}>
                <animate attributeName="height"
                  begin="0s" dur="2s"
                  values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear"
                  repeatCount="indefinite" />
              </rect>
              <rect x="30" width="10" height="50" rx="3" fill={primaryColor}>
                <animate attributeName="height"
                  begin="0s" dur="1.4s"
                  values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear"
                  repeatCount="indefinite" />
              </rect>
              <rect x="45" width="10" height="30" rx="3" fill={secondaryColor}>
                <animate attributeName="height"
                  begin="0s" dur="2s"
                  values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear"
                  repeatCount="indefinite" />
              </rect>
              <rect x="60" width="10" height="30" rx="3" fill={primaryColor}>
                <animate attributeName="height"
                  begin="0s" dur="3.0s"
                  values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear"
                  repeatCount="indefinite" />
              </rect>
            </g>
          </svg>
          {/* <svg
            className={classes.spinner}
            width="10rem"
            height="10rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <rect x="17" y="17" width="20" height="20" fill={primaryColor}>
              <animate
                attributeName="fill"
                values={vals}
                keyTimes="0;0.125;1"
                dur="1s"
                repeatCount="indefinite"
                begin="0s"
                calcMode="discrete"
              />
            </rect>
            <rect x="40" y="17" width="20" height="20" fill={primaryColor}>
              <animate
                attributeName="fill"
                values={vals}
                keyTimes="0;0.125;1"
                dur="1s"
                repeatCount="indefinite"
                begin="0.125s"
                calcMode="discrete"
              />
            </rect>
            <rect x="63" y="17" width="20" height="20" fill={primaryColor}>
              <animate
                attributeName="fill"
                values={vals}
                keyTimes="0;0.125;1"
                dur="1s"
                repeatCount="indefinite"
                begin="0.25s"
                calcMode="discrete"
              />
            </rect>
            <rect x="17" y="40" width="20" height="20" fill={primaryColor}>
              <animate
                attributeName="fill"
                values={vals}
                keyTimes="0;0.125;1"
                dur="1s"
                repeatCount="indefinite"
                begin="0.875s"
                calcMode="discrete"
              />
            </rect>
            <rect x="63" y="40" width="20" height="20" fill={primaryColor}>
              <animate
                attributeName="fill"
                values={vals}
                keyTimes="0;0.125;1"
                dur="1s"
                repeatCount="indefinite"
                begin="0.375s"
                calcMode="discrete"
              />
            </rect>
            <rect x="17" y="63" width="20" height="20" fill={primaryColor}>
              <animate
                attributeName="fill"
                values={vals}
                keyTimes="0;0.125;1"
                dur="1s"
                repeatCount="indefinite"
                begin="0.75s"
                calcMode="discrete"
              />
            </rect>
            <rect x="40" y="63" width="20" height="20" fill={primaryColor}>
              <animate
                attributeName="fill"
                values={vals}
                keyTimes="0;0.125;1"
                dur="1s"
                repeatCount="indefinite"
                begin="0.625s"
                calcMode="discrete"
              />
            </rect>
            <rect x="63" y="63" width="20" height="20" fill={primaryColor}>
              <animate
                attributeName="fill"
                values={vals}
                keyTimes="0;0.125;1"
                dur="1s"
                repeatCount="indefinite"
                begin="0.5s"
                calcMode="discrete"
              />
            </rect>
          </svg>
           */}
          <span className={classes.message}>
            {props.message ? props.message : "Please wait..."}
          </span>
        </div>
      </div>
    </Fade>
  );
};

export default withTheme()(spinner);
