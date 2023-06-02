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
		const firstNum = Math.ceil(Math.random() * 10);
		const secondNum = Math.ceil(Math.random() * 10) + 10;

		return [firstNum, secondNum];
	}

	function handleClick() {
		setRandomFirstNum(randomPokemonFunc()[0]);
		setRandomSecondNum(randomPokemonFunc()[1]);
	}

	if (isLoading) return '.....Loading';
	return (
		<>
			<h1>Pokemon Memory Game</h1>
			<PokemonCard
				pokemonData={pokemonData}
				randomFirstNum={randomFirstNum}
				randomSecondNum={randomSecondNum}
				handleClick={handleClick}
			/>
		</>
	);
}

export default App;
