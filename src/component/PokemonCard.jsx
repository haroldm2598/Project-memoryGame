import { useState } from 'react';
import '../assets/styles/main.scss';

export default function PokemonCard({
	pokemonData,
	// randomFirstNum,
	// randomSecondNum,
	randomNum,
	handleClick
}) {
	const [pokemonId, setPokemonId] = useState('');
	function getPokemonId(item) {
		setPokemonId(item);
	}

	// console.log(pokemonId);
	return (
		<section>
			<button
				className='px-5 py-2 bg-sky-400 hover:bg-sky-700 rounded'
				onClick={handleClick}
			>
				Random Pokemon
			</button>
			<div className='pokemonContainer mx-auto my-0'>
				{pokemonData.slice(0, randomNum).map((item) => (
					<div
						key={item.id}
						className='pokemonCard flex flex-col items-center'
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
