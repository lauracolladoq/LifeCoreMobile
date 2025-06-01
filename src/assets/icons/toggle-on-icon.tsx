import React from "react";
import Svg, { Path } from "react-native-svg";

const ToggleOnIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none">
    <Path
      d="M19 12C19 13.6569 17.6569 15 16 15C14.3431 15 13 13.6569 13 12C13 10.3431 14.3431 9 16 9C17.6569 9 19 10.3431 19 12Z"
      fill="#000000"
    />
    <Path
      d="M16 6H8C4.68629 6 2 8.68629 2 12C2 15.3137 4.68629 18 8 18H16C19.3137 18 22 15.3137 22 12C22 8.68629 19.3137 6 16 6Z"
      stroke="#000000"
      strokeWidth={1.5}
    />
  </Svg>
);

export default ToggleOnIcon;
