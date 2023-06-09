import '../assets/styles/main.scss';

export default function PokemonButton({ randomNum, scoreResult, handleClick }) {
	return (
		<div className='mb-2 py-5 flex justify-center items-center bg-sky-950'>
			<button
				className='px-5 py-2 bg-sky-400 hover:bg-sky-700 rounded'
				onClick={() => handleClick(randomNum, randomNum + 4, 4)}
			>
				Easy
			</button>

			<button
				className='mx-2 px-5 py-2 bg-sky-400 hover:bg-sky-700 rounded'
				onClick={() => handleClick(randomNum, randomNum + 6, 6)}
			>
				Medium
			</button>

			<button
				className='px-5 py-2 bg-sky-400 hover:bg-sky-700 rounded'
				onClick={() => handleClick(randomNum, randomNum + 8, 8)}
			>
				Hard
			</button>
			<h3 className='mx-2 text-sky-400'>Score Result: {scoreResult}</h3>
		</div>
	);
}
