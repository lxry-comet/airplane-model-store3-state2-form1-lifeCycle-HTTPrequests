import css from "./PokemonInfo.module.css"

export function PokemonInfoViewСontainer({
	title,
	children
}) {
	return (
		<div className={css.pokemonInfo}>
			<h1>{title}</h1>
			{children}
		</div>
	);
}
