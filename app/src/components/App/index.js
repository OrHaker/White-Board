import React from "react";

import Canvas from "components/Canvas";
import ColorBar from "components/ColorBar";

import colors, { allColors } from "utility/colors";

import "./App.scss";

function App() {
  const [colorBarColors, setColorBarColors] = React.useState([]);
  const [selectedColor, setSelectedColor] = React.useState("black");

  React.useEffect(() => {
    setColorBarColors(Object.entries(colors));
  }, []);
  return (
    <div className="App">
      <Canvas strokeStyle={selectedColor} />
      <ColorBar colors={colorBarColors} pickColor={(color) => setSelectedColor(color)} />
    </div>
  );
}

export default App;
