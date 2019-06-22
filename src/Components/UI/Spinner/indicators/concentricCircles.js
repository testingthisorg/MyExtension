import React from 'react';

export const concentricCircles = (primaryColor, secondaryColor) => {
  let strokeWidth = 6;
  let total_time = 2.75;
  let radius = 12;
  let maxRadius = 50;
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" stroke={primaryColor}>
      <g fill="none" fillRule="evenodd" transform="translate(1 1)" strokeWidth={strokeWidth}>
        <circle cx="44" cy="44" r={radius} strokeOpacity="0">
          <animate attributeName="r"
            begin={total_time/2 + "s"} dur={total_time + "s"}
            values={radius + ";" + maxRadius}
            calcMode="linear"
            repeatCount="indefinite" />
          <animate attributeName="stroke-opacity"
            begin={total_time/2 + "s"} dur={total_time + "s"}
            values="1;0" calcMode="linear"
            repeatCount="indefinite" />
          <animate attributeName="stroke-width"
            begin={total_time/2 + "s"} dur={total_time + "s"}
            values={strokeWidth + ";0"}  calcMode="linear"
            repeatCount="indefinite" />
        </circle>
        <circle cx="44" cy="44" r={radius} strokeOpacity="0" stroke={secondaryColor}>
          <animate attributeName="r"
            begin={total_time + "s"} dur={total_time + "s"}
            values={radius + ";" + maxRadius}
            calcMode="linear"
            repeatCount="indefinite" />
          <animate attributeName="stroke-opacity"
            begin={total_time + "s"} dur={total_time + "s"}
            values="1;0" calcMode="linear"
            repeatCount="indefinite" />
          <animate attributeName="stroke-width"
            begin={total_time + "s"} dur={total_time + "s"}
            values={strokeWidth + ";0"} calcMode="linear"
            repeatCount="indefinite" />
        </circle>
        <circle cx="44" cy="44" r="16">
          <animate attributeName="r"
            begin="0s" dur={total_time/2 + "s"}
            values="12;2;4;6;8;10;12"
            calcMode="linear"
            repeatCount="indefinite" />
        </circle>
      </g>
    </svg>)
};