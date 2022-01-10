import React from "react";

import Canvas from "components/Canvas";
import ToolBar from "components/ToolBar";

import { DRAW_STATES } from "utility/utilFunctions";

import "./App.scss";

function App() {
  const [selectedColor, setSelectedColor] = React.useState("black");
  const [drawState, setDrawState] = React.useState(DRAW_STATES.LINE);
  const [shapeSize, setShapeSize] = React.useState(50);

  return (
    <div className="App">
      <ToolBar
        selectedColor={selectedColor}
        setDrawState={setDrawState}
        setSelectedColor={setSelectedColor}
        shapeSize={shapeSize}
        setShapeSize={setShapeSize}
      />
      <Canvas shapeSize={shapeSize} strokeStyle={selectedColor} drawState={drawState} onMouseLeave={() => setDrawState(DRAW_STATES.DEFAULT)} />
    </div>
  );
}

export default App;
