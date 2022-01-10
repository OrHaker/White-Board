import ColorBar from "components/ColorBar";

import { DRAW_STATES } from "utility/utilFunctions";
import colors from "utility/colors";

import "./style.scss";

export default function ToolBar({ selectedColor, setDrawState, setSelectedColor, shapeSize, setShapeSize }) {
  return (
    <div className="ToolBar">
      <div
        className="ToolBar__selected_color"
        style={{ backgroundColor: selectedColor, "--selected_color": selectedColor }}
        onClick={() => setDrawState(DRAW_STATES.LINE)}
      >
        Draw
        {/* <ColorBar colors={Object.entries(colors)} pickColor={(color) => setSelectedColor(color)} /> */}
      </div>
      <div className="ToolBar__eraser" onClick={() => setDrawState(DRAW_STATES.ERASER)}>
        Eraser
      </div>
      <div className="ToolBar__eraser" onClick={() => setDrawState(DRAW_STATES.SQUARE)}>
        SQUARE
      </div>
      <div className="ToolBar__shapeSize">
        Shape Size
        <input type="range" min="0" max="70" onChange={({ target }) => setShapeSize(target.value)} />
      </div>
    </div>
  );
}
