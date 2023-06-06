import { useState } from 'react';
import '../assets/styles/main.scss';

export default function PokemonCard({ pokemonData, randomNum }) {
	const [pokemonId, setPokemonId] = useState('');
	function getPokemonId(id, item) {
		setPokemonId({ id, item });
	}

	console.log(pokemonId);
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
					</div>
				))}
			</div>
		</section>
	);
}
