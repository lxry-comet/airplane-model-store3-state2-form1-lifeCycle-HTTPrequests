// console.log(
//   "%c 6.1.Основи HTTP-запитів у React",
//   "color: white; background-color: #D33F49",
// );

// https://pokeapi.co/
// https://pokeapi.co/api/v2/pokemon

import React, { Component } from "react"
import css from "./AppHTTPRequestAdvanced.module.css"

import { PokemonForm } from '@/components/Pokemon/PokemonForm.jsx'

import { ToastContainer } from 'react-toastify'; //! 01.Підлючення бібліотеки react-toastify
// https://www.npmjs.com/package/react-toasti
// https://fkhadra.github.io/react-toastify/introduction/



export class AppHTTPRequestAdvanced extends Component {
	state = {
		pokemonName: "",
	}
	submitForm = (pokemonName) => {
		console.log("🐷🐷🐷pokemonName", pokemonName)
		this.setState({
			pokemonName: pokemonName,
		})
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
					<PokemonForm onSubmit={this.submitForm} />


{/* //! 01.Підлючення бібліотеки react-toastify */}
          <ToastContainer 
						position="top-left"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
					/>
				</div>
			</>
		)
	}
}
