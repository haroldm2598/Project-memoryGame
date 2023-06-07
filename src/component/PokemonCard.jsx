// import { useState } from 'react';
import '../assets/styles/main.scss';

export default function PokemonCard({ pokeDex }) {
	// const [pokemonId, setPokemonId] = useState('');
	// function getPokemonId(id, item) {
	// 	setPokemonId({ id, item });
	// }

	return (
		<section>
			<div className='pokemonContainer mx-auto my-10'>
				{pokeDex.map((item) => (
					<div
						key={item.id}
						className='pokemonCard flex flex-col items-center transition delay-150 duration-300 ease-in-out hover:scale-125'
						// onClick={() => getPokemonId(item.id, item.name)}
					>
						<img src={item.sprites.front_default} alt={item.name} />
						<h3 className='pokemon__name'>{item.name}</h3>
					</div>
				))}
			</div>
		</section>
	);
}
