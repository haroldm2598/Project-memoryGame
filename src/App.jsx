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
	const [pokeDex, setPokeDex] = useState([]);
	const [randomNum, setRandomNum] = useState(0);
	const [scoreResult, setScoreResult] = useState(0);
	const [isPokemonSelect, SetIsPokemonSelect] = useState([]);
	const [gameScore, setGameScore] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(currentUrl);
				getPokemonDetails(response.data.results);
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

	useEffect(() => {
		gameBoard();
	}, [isPokemonSelect]);

	function randomPokemonFunc() {
		const randomIndexNum = Math.ceil(Math.random() * 20);

		return randomIndexNum >= 16 ? 16 : randomIndexNum;
	}

	function handleClick(firstRandom, secondRandom, gameScoreLimit) {
		setRandomNum(randomPokemonFunc());
		setPokeDex(pokemonData.slice(firstRandom, secondRandom));
		setGameScore(gameScoreLimit);
		setScoreResult(0);
		SetIsPokemonSelect([]);
	}

	function gameBoard() {
		if (scoreResult === gameScore) return;

		let set = new Set();
		isPokemonSelect.some((item) => {
			if (set.size === set.add(item.pokeName).size) {
				setPokeDex([]);
				SetIsPokemonSelect([]);
				setScoreResult(0);
			} else {
				setScoreResult(scoreResult + 1);
			}
		});
	}

	function getPokemonAnswer(pokeId, pokeName) {
		SetIsPokemonSelect((oldState) => [
			...oldState,
			{ pokeId, pokeName, isClick: true }
		]);
	}

	return (
		<>
			<div className='w-full py-5 bg-slate-400 text-center text-xl'>
				<h1>Pokemon Memory Game</h1>
			</div>
			<PokemonButton
				randomNum={randomNum}
				scoreResult={scoreResult}
				handleClick={handleClick}
			/>
			<PokemonCard pokeDex={pokeDex} getPokemonAnswer={getPokemonAnswer} />
		</>
	);
}

export default App;
