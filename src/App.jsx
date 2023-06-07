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
	const [isPokemonSelect, SetIsPokemonSelect] = useState('');

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

	function handleClick(firstRandom, secondRandom) {
		setRandomNum(randomPokemonFunc());
		setPokeDex(pokemonData.slice(firstRandom, secondRandom));
	}

	/*
		Where all logic come
		DONE - store the array in PokeDex 
		DONE - create new array where it store the selected || clicked object then 
		DONE - Add a Boolean value to the object if the array of object has already true 
		WORKING ... - Then add click event if this is click then add score +1
		- Else if already clicked then deducted the score -1 or Gameover
		- if the score is already at this length then the player is Winner
	*/
	function gameBoard() {
		let score = 0;
		const result = isPokemonSelect.find((item) =>
			item.isClick === true ? '-1 ka nyan lods' : 'tama kana lods'
		);
		console.log(result);
		setScoreResult((oldScore) => (score = oldScore + 1));
	}

	function getPokemonAnswer(pokeId, pokeName) {
		SetIsPokemonSelect((oldState) => [
			...oldState,
			{ pokeId, pokeName, isClick: true }
		]);
		gameBoard();
	}

	// console.log(
	// 	isPokemonSelect.find((item) =>
	// 		item?.isClick === true ? '+1 lods' : 'meron na lods talo ka'
	// 	)
	// );

	return (
		<>
			<div className='w-full py-5 bg-slate-400 text-center text-xl'>
				<h1>Pokemon Memory Game</h1>
			</div>
			<PokemonButton randomNum={randomNum} handleClick={handleClick} />
			<PokemonCard pokeDex={pokeDex} getPokemonAnswer={getPokemonAnswer} />
			<div>
				<h3>Scoreboard: {scoreResult}</h3>
			</div>
		</>
	);
}

export default App;
