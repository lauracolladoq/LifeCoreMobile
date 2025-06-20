import React from "react";
import Svg, { Path } from "react-native-svg";

const ToggleOffIcon = () => (
  <Svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
  >
    <Path
      d="M11 12C11 13.6569 9.65685 15 8 15C6.34315 15 5 13.6569 5 12C5 10.3431 6.34315 9 8 9C9.65685 9 11 10.3431 11 12Z"
      stroke="#000000"
      strokeWidth={1.5}
    />
    <Path
      d="M16 6H8C4.68629 6 2 8.68629 2 12C2 15.3137 4.68629 18 8 18H16C19.3137 18 22 15.3137 22 12C22 8.68629 19.3137 6 16 6Z"
      stroke="#000000"
      strokeWidth={1.5}
    />
  </Svg>
);

export default ToggleOffIcon;