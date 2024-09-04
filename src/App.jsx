import { useState } from "react";
import Header from "./components/header";
import "./index.css";
import Cards from "./components/cards";

function App() {
	function dataFromCards(score) {
		setScore(score);
		if (highScore <= score) {
			SetHighScore(score);
		}
	}
	const [score, setScore] = useState(0);
	const [highScore, SetHighScore] = useState(0);
	return (
		<>
			<Header score={score} highScore={highScore} />
			<div className="card-container">
				<Cards getGameInfo={dataFromCards} />
			</div>
		</>
	);
}

export default App;