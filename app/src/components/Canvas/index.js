import React from "react";

const Canvas = (strokeStyle = "black") => {
  const canvasRef = React.useRef(null);
  const contextRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.5;

    canvas.style.width = `${window.innerWidth * 0.5}px`;
    canvas.style.height = `${window.innerHeight * 0.5}px`;

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  React.useEffect(() => {
    contextRef.current.strokeStyle = strokeStyle.strokeStyle;
  }, [strokeStyle]);

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
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return <canvas ref={canvasRef} onMouseDown={starDrawing} onMouseUp={finishDrawing} onMouseMove={draw} />;
};

export default Canvas;
