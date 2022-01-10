import { useRef, useEffect } from "react";

const useCanvas = (draw, options = {}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext(options.context || "2d");
    let frameCount = 0; //This is a control variable that counts frames. If you prefer, you can use a counter for time instead. The goal of this variable is provide a clock to our draw function since the animation is time dependent.
    let animationFrameId;
    const render = () => {
      //All the steps that will be repeated in the animation were wrapped in a function called render which will be called recursively by the requestAnimationFrame method
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);
  return canvasRef;
};
export default useCanvas;
