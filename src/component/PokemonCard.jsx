import { useState } from 'react';
import '../assets/styles/main.scss';

export default function PokemonCard({ pokemonData, randomNum, getPokeDex }) {
	const [pokemonId, setPokemonId] = useState('');
	function getPokemonId(id, item) {
		setPokemonId({ id, item });
	}

	// console.log(pokemonId);
	// - Should get the setPokeDex first
	// - And use it as a map for the post and remove the pokemonData as a main map
	return (
		<section>
			<div className='pokemonContainer mx-auto my-0'>
				{pokemonData.slice(randomNum, randomNum + 4).map((item) => (
					<div
						key={item.id}
						className='pokemonCard flex flex-col items-center'
						onClick={() => getPokemonId(item.id, item.name)}
					>
						<img src={item.sprites.front_default} alt={item.name} />
						<h3 className='pokemon__name'>{item.name}</h3>
						{console.log(item.name)}
					</div>
				))}
			</div>
		</section>
	);
}
