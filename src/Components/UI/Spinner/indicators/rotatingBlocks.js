import React from 'react';

export const rotatingBlocks = (primaryColor, secondaryColor) => {
  let vals = secondaryColor + ";" + primaryColor + ";" + primaryColor;

  return (
    <svg
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
  )
};