import React from 'react';

import Canvas from 'components/Canvas';
import ToolBar from 'components/ToolBar';

import { DRAW_STATES } from 'utility/utilFunctions';

import './App.scss';
import Chat from 'components/Chat';
function App() {
	const [selectedColor, setSelectedColor] = React.useState('black');
	const [drawState, setDrawState] = React.useState(DRAW_STATES.LINE);
	const [shapeSize, setShapeSize] = React.useState(50);
	const canvasRef = React.useRef();

	return (
		<div className="App">
			<Chat />
			{/* <div className="container">
				<ToolBar
					selectedColor={selectedColor}
					setDrawState={setDrawState}
					setSelectedColor={setSelectedColor}
					shapeSize={shapeSize}
					setShapeSize={setShapeSize}
					clearCanvas={() => canvasRef.current.clear()}
				/>
			</div>
			<Canvas
				ref={canvasRef}
				shapeSize={shapeSize}
				strokeStyle={selectedColor}
				drawState={drawState}
				onMouseLeave={() => setDrawState(DRAW_STATES.DEFAULT)}
			/> */}
		</div>
	);
}

export default App;
