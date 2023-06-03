import { useState } from 'react';
import '../assets/styles/main.scss';

export default function PokemonCard({
	pokemonData,
	randomFirstNum,
	randomSecondNum,
	handleClick
}) {
	const [pokemonId, setPokemonId] = useState('');
	function getPokemonId(item) {
		setPokemonId(item);
	}

	console.log(pokemonId);
	return (
		<section>
			<button className='bg-sky-500 hover:bg-sky-700' onClick={handleClick}>
				Random Pokemon
			</button>
			<div className='pokemonContainer'>
				{pokemonData.slice(randomFirstNum, randomSecondNum).map((item) => (
					<div
						key={item.id}
						className='pokemonCard'
						onClick={() => getPokemonId(item.name)}
					>
						<img src={item.sprites.front_default} alt={item.name} />
						<h3 className='pokemon__name'>{item.name}</h3>
					</div>
				))}
			</div>
		</section>
	);
}
