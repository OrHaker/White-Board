import React from "react";

import "./style.scss";

export default function ColorBar({ colors, pickColor }) {
  const _handlePickColor = (color) => pickColor(color);

  return (
    <div className="ColorBar">
      {colors.map((color, idx) => (
        <div className="color" key={idx} style={{ backgroundColor: color[1] }} title={color[0]} onClick={() => _handlePickColor(color[1])}></div>
      ))}
    </div>
  );
}
