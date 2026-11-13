import React, { Component } from "react"

// https://www.npmjs.com/package/react-toasti
// https://fkhadra.github.io/react-toastify/introduction/
import { toast } from 'react-toastify' //! 02.Підлючення/виклик бібліотеки react-toastify

import css from "./PokemonInfo.module.css"


export class PokemonInfo extends Component {
	state={
		pokemon: null
	}

	setName = () => {
		this.setState({pokemon: this.props.pokemonName})
	};
	
	//! Цей метод викликається автоматично при оновленні пропсів або стейту
  componentDidUpdate(prevProps) {
    // Перевіряємо, чи змінився pokemonName, щоб не потрапити в нескінченний цикл
    if (prevProps.pokemonName !== this.props.pokemonName) {
      this.setName();
    }
  }
	render() {
		const {
      pokemon, //! об'єкт з даними про покемона
    } = this.state;

		const {
      pokemonName, //! ім'я покемона
    } = this.props;

		
		
		console.log("----------------------------------------------")
		console.log("ℹ️props-> 🐷 Покемон-ім'я:", pokemonName);
    console.log("ℹ️{🐷} Покемон-об'єкт:", pokemon);
    // console.log("ℹ️⏳ Індикатор завантаження (лоадер):", loading);
		console.log("______________________________________________")

		return (
			<>
				<div className={css.pokemonInfo}>
					<h1>Pokemon Info</h1>
					{/* <h2><u><i>Ви ввели ім'я покемона</i></u>:<b>{pokemonName}</b></h2> */}
					<h2><u><i>Ви ввели ім'я покемона</i></u>:<b>{pokemon}</b></h2>
				</div>
			</>
		)
	}
}
