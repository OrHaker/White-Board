import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import { DRAW_STATES } from "utility/utilFunctions";

import rough from "roughjs/bundled/rough.esm";

import "./style.scss";

const createElement = (id, x1, y1, x2, y2, type) => {
  switch (type) {
    case "line":
    case "rectangle":
      const roughElement = type === "line" ? generator.line(x1, y1, x2, y2) : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
      return { id, x1, y1, x2, y2, type, roughElement };
    case "pencil":
      return { id, type, points: [{ x: x1, y: y1 }] };
    case "text":
      return { id, type, x1, y1, x2, y2, text: "" };
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};

const Canvas = ({ strokeStyle = "black", drawState = DRAW_STATES.LINE, shapeSize }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const generator = rough.generator();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    //handle stroke color change
    contextRef.current.strokeStyle = strokeStyle;
  }, [strokeStyle]);

  useEffect(() => {
    //handle window resize
    function handleResize() {
      const canvas = canvasRef.current;
      const { width, height } = canvas.getBoundingClientRect();

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  //drawing methods
  const starDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    switch (drawState) {
      case DRAW_STATES.LINE:
        contextRef.current.lineTo(offsetX, offsetY + 15); //cursor size
        contextRef.current.stroke();
        break;
      case DRAW_STATES.ERASER:
        contextRef.current.clearRect(offsetX + 1, offsetY + 1, shapeSize * 0.9, shapeSize * 0.9);
        break;
      case DRAW_STATES.SQUARE:
        rough.canvas(canvasRef.current).rectangle(offsetX, offsetY, shapeSize, shapeSize);
    }
  };

  const canvasClass = classNames({
    Canvas: true,
    ERASER: drawState === DRAW_STATES.ERASER,
    LINE: drawState === DRAW_STATES.LINE,
  });

  return (
    <canvas
      style={{ border: "1px solid #000000" }}
      className={canvasClass}
      ref={canvasRef}
      onMouseDown={starDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
    />
  );
};

export default Canvas;
