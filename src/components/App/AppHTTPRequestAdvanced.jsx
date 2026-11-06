// console.log(
//   "%c 6.1.Основи HTTP-запитів у React",
//   "color: white; background-color: #D33F49",
// );

// https://pokeapi.co/
// https://pokeapi.co/api/v2/pokemon

import React, { Component } from "react"
import css from "./AppHTTPRequestAdvanced.module.css"

import { PokemonForm } from '@/components/Pokemon/PokemonForm.jsx'

export class AppHTTPRequestAdvanced extends Component {
	state = {
		pokemonName: null, 
	}


	render() {

		const {
			pokemonName,
		} = this.state


		console.log("----------------------------------------------")
		console.log("✅🐷 Ім'я покемона:", pokemonName)
		console.log("----------------------------------------------")


		return (
			<>
				<div className={css.mainContainer} >

					{/* //! Форма для отримання ім'я покемона */}
					<PokemonForm />
				</div>
			</>
		)
	}
}
