import { useState, useEffect } from 'react';
import './assets/styles/main.scss';
import PokemonCard from './component/PokemonCard';
import axios from 'axios';
import PokemonButton from './component/PokemonButton';

function App() {
	const [currentUrl, setCurrentUrl] = useState(
		'https://pokeapi.co/api/v2/pokemon/'
	);
	const [pokemonData, setPokemonData] = useState([]);
	const [isLoading, setIsloading] = useState(true);
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
		let startIndexNum;
		const randomIndexNum = Math.ceil(Math.random() * 20);

		if (randomIndexNum >= 16) {
			startIndexNum = 16;
		} else if (randomIndexNum <= 4) {
			startIndexNum = 0;
		} else {
			startIndexNum = randomIndexNum;
		}

		return startIndexNum;
	}

	function handleEasyClick() {
		setRandomNum(randomPokemonFunc());
	}

	if (isLoading) return '.....Loading';
	return (
		<>
			<div className='w-full py-5 bg-slate-400 text-center text-xl'>
				<h1>Pokemon Memory Game</h1>
			</div>
			<PokemonButton handleEasyClick={handleEasyClick} />
			<PokemonCard pokemonData={pokemonData} randomNum={randomNum} />
		</>
	);
}

export default App;
