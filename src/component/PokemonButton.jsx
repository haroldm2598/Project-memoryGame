import '../assets/styles/main.scss';

export default function PokemonButton({ handleEasyClick }) {
	return (
		<div className='mb-2 py-5 flex justify-center bg-sky-950'>
			<button
				className='px-5 py-2 bg-sky-400 hover:bg-sky-700 rounded'
				onClick={handleEasyClick}
			>
				Easy
			</button>

			<button
				className='mx-2 px-5 py-2 bg-sky-400 hover:bg-sky-700 rounded'
				onClick={() => console.log('this medium')}
			>
				Medium
			</button>

			<button
				className='px-5 py-2 bg-sky-400 hover:bg-sky-700 rounded'
				onClick={() => console.log('this hard')}
			>
				Hard
			</button>
		</div>
	);
}
