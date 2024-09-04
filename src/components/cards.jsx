import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
export default function Cards({ getGameInfo }) {
	const numOfCards = 12;
	const randomPokemonSet = Math.floor(Math.random() * (360 - 1) + 1);
	const [clickedCards, setClickedCards] = useState([]);
	const [cardData, setCardData] = useState([]);
	const [gameOver, setGameOver] = useState(false);

	const randomiseCards = () => {
		const cards = [...cardData];
		const newOrder = cards.sort(() => 0.5 - Math.random());
		setCardData(newOrder);
	};

	const checkCards = (cardToCheck) => {
		if (clickedCards.includes(cardToCheck)) {
			setGameOver(true);
			setClickedCards([]);
			return;
		} else {
			const newCardList = [...clickedCards, cardToCheck];
			setClickedCards(newCardList);
			randomiseCards();
			getGameInfo(clickedCards.length + 1);
		}
	};

	const resetGame = () => {
		setClickedCards([]);
		setGameOver(false);
		getGameInfo(clickedCards.length);
	};

	useEffect(() => {
		const allPokemon = `https://pokeapi.co/api/v2/pokemon/?limit=${numOfCards}&offset=${randomPokemonSet}`;
		const getPokemonData = async () => {
			try {
				const res = await fetch(allPokemon);
				const data = await res.json();
				const pokemonList = data.results;

				const pokemonArray = await Promise.all(
					pokemonList.map(async (pokemon) => {
						const res = await fetch(pokemon.url);
						return res.json();
					}),
				);
				setCardData(pokemonArray);
			// eslint-disable-next-line no-unused-vars
			} catch (err) {
				console.error;
			}
		};
		getPokemonData();
	}, [gameOver]);
	return (
		<>
			{!gameOver ? (
				cardData.map((pokemon) => (
					<div
						id={pokemon.id}
						onClick={() => checkCards(pokemon.id)}
						key={pokemon.id}
						className="pokemon-card"
					>
						<img src={pokemon.sprites.front_default}></img>
						<p>{pokemon.name}</p>
					</div>
				))
			) : (
				<div className="reset-wrapper">
					<p className="gameover"> Game Over..!! &#128549;</p>
					<button onClick={resetGame}>Play Again?</button>
				</div>
			)}
		</>
	);
}