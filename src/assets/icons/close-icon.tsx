import React from "react";
import Svg, { Path } from "react-native-svg";

const CloseIcon = ({ width = 24, height = 24, color = "#000000" }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M19 5L5 19M5 5L19 19"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CloseIcon;