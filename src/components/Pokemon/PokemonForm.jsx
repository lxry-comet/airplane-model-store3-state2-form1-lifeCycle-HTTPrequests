import React, { Component } from "react"
import css from "./PokemonForm.module.css"


export class PokemonForm extends Component {
	state = {
		pokemonName:null
	}


	render() {

		const {
			pokemonName,
		} = this.state


console.log("----------------------------------------------");
        console.log("🔖🐷 Ім'я покемона:", pokemonName);
console.log("______________________________________________");


		return (
			<>
				<form className={css.pokemonForm}>
					<input 
					type="text" 
					className={css.pokemonFormInput}
					/>
					<button 
					type="submit"
					className={css.pokemonButton}
					>
						Search
					</button>
				</form>
			</>
		)
	}

}
