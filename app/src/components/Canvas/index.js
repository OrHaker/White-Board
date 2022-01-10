import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import classNames from "classnames";
import { DRAW_STATES } from "utility/utilFunctions";

import "./style.scss";

const Canvas = forwardRef(({ strokeStyle = "black", drawState = DRAW_STATES.LINE, shapeSize }, ref) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [starDrawingPos, setStarDrawingPos] = useState({ x: 0, y: 0 });

  let xMovement = 0,
    yMovement = 0;

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
    contextRef.current.fillStyle = strokeStyle;
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
    setStarDrawingPos({ x: offsetX, y: offsetY });
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    xMovement = yMovement = 0;
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    switch (drawState) {
      case DRAW_STATES.LINE:
        contextRef.current.lineTo(offsetX + 1, offsetY + 18); //cursor size
        contextRef.current.stroke();
        break;
      case DRAW_STATES.ERASER:
        contextRef.current.clearRect(offsetX + 1, offsetY + 1, shapeSize * 0.9, shapeSize * 0.9);
        break;
      case DRAW_STATES.SQUARE:
        xMovement = offsetX - starDrawingPos.x;
        yMovement = offsetY - starDrawingPos.y;
        contextRef.current.fillRect(starDrawingPos.x, starDrawingPos.y, xMovement, yMovement);
    }
  };

  useImperativeHandle(ref, () => ({
    clear() {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    },
  }));

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
});

export default Canvas;
