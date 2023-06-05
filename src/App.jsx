import { useState, useEffect } from 'react';
import './assets/styles/main.scss';
import PokemonCard from './component/PokemonCard';
import axios from 'axios';

function App() {
	const [currentUrl, setCurrentUrl] = useState(
		'https://pokeapi.co/api/v2/pokemon/'
	);
	const [pokemonData, setPokemonData] = useState([]);
	const [isLoading, setIsloading] = useState(true);
	const [randomFirstNum, setRandomFirstNum] = useState(0);
	const [randomSecondNum, setRandomSecondNum] = useState(0);
	const [randomNum, setRandomNum] = useState(0);

	useEffect(() => {
		setIsloading(true);
		const fetchData = async () => {
			try {
				// USING ONLY FETCH
				// const response = await fetch(currentUrl);
				// const data = await response.json();
				// setPokemonData(data.results);
				// console.log(pokemonData);

				// USING ONLY AXIOS
				const response = await axios.get(currentUrl);
				getPokemonDetails(response.data.results);

				setIsloading(false);
			} catch (e) {
				console.log(e);
			}
		};

		function getPokemonDetails(res) {
			return res.map(async (item) => {
				const getUrl = await axios.get(item.url);
				setPokemonData((oldPokemon) => {
					oldPokemon = [...oldPokemon, getUrl.data];
					const uniqueState = [
						...new Map(oldPokemon.map((p) => [p.id, p])).values()
					];
					return uniqueState;
				});
			});
		}

		fetchData();
	}, [currentUrl]);

	function randomPokemonFunc() {
		// const firstNum = Math.ceil(Math.random() * 10);
		// const secondNum = Math.ceil(Math.random() * 10) + 10;

		// return [firstNum, secondNum];
		let startIndexNum;
		let lastIndexNum;
		const randomIndexNum = Math.ceil(Math.random() * 20);
		if (randomIndexNum >= 16) {
			startIndexNum = 16;
		} else if (randomIndexNum <= 4) {
			lastIndexNum = 4;
		} else {
			startIndexNum = randomIndexNum;
			lastIndexNum = randomIndexNum;
		}

		console.log(startIndexNum);
		console.log(lastIndexNum);
		return randomIndexNum;
	}

	function handleClick() {
		// setRandomFirstNum(randomPokemonFunc()[0]);
		// setRandomSecondNum(randomPokemonFunc()[1]);
		setRandomNum(randomPokemonFunc());
	}

	if (isLoading) return '.....Loading';
	return (
		<>
			<div className='w-full py-5 bg-slate-400 text-center text-xl'>
				<h1>Pokemon Memory Game</h1>
			</div>

			<PokemonCard
				pokemonData={pokemonData}
				// randomFirstNum={randomFirstNum}
				// randomSecondNum={randomSecondNum}
				randomNum={randomNum}
				handleClick={handleClick}
			/>
		</>
	);
}

export default App;
