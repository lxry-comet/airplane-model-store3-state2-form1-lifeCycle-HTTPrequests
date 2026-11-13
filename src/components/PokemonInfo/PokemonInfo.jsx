import React, { Component } from "react"

// https://www.npmjs.com/package/react-toasti
// https://fkhadra.github.io/react-toastify/introduction/
import { toast } from 'react-toastify' //! 02.Підлючення/виклик бібліотеки react-toastify

import css from "./PokemonInfo.module.css"


export class PokemonInfo extends Component {
	state={
		pokemon: null,
		// loading: false //! індикатор завантаження (лоадер)
	}

	// setName = () => {
	// 	this.setState({pokemon: this.props.pokemonName})
	// };
	
	//! Цей метод викликається автоматично при оновленні пропсів або стейту
  componentDidUpdate(prevProps) {
		const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName; //! ім'я покемона (оновлене)

    // Перевіряємо, чи змінився pokemonName, щоб не потрапити в нескінченний цикл
    if (prevName !== nextName) {
			console.log("❗️Змінилося ім'я ПОКЕМОНА");
      console.log("⏮️prevName (prevProps.pokemonName): ", prevProps.pokemonName);
      console.log("⏭️nextName (this.props.pokemonName): ", this.props.pokemonName);

      setTimeout(() => {
			fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
				.then(res => res.json())
				// .then(pokemon => console.log("pokemon:", pokemon))
				.then(pokemon => this.setState({pokemon}))
				// .finally(() => this.setState({ loading: false })); //! індикатор завантаження (лоадер) = false
			}, 2000);
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
					<h2><u><i>Ви ввели ім'я покемона</i></u>:<b>{pokemonName}</b></h2>
					{/* <h2><u><i>Ви ввели ім'я покемона</i></u>:<b>{pokemon}</b></h2> */}
				</div>
			</>
		)
	}
}
