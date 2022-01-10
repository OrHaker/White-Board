import { DRAW_STATES } from "utility/utilFunctions";

import "./style.scss";

export default function ToolBar({ selectedColor, setDrawState, setSelectedColor, clearCanvas, setShapeSize }) {
  return (
    <div className="ToolBar">
      <div className="ToolBar__selected_color" onClick={() => setDrawState(DRAW_STATES.LINE)}>
        Draw
      </div>
      <div className="ToolBar__selected_color" style={{ backgroundColor: selectedColor, "--selected_color": selectedColor }}>
        &nbsp;
        <div className="ToolBar__picker">
          <input
            type="color"
            onChange={({ target }) => {
              console.log(`target.value`, target.value);
              setSelectedColor(target.value);
            }}
          />
        </div>
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
      <div className="ToolBar__clear" onClick={clearCanvas}>
        Clear
      </div>
    </div>
  );
}
