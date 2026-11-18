import React, { Component } from "react"

// https://www.npmjs.com/package/react-toasti
// https://fkhadra.github.io/react-toastify/introduction/
import { toast } from 'react-toastify' //! 02.Підлючення/виклик бібліотеки react-toastify

import css from "./PokemonInfo.module.css"


export class PokemonInfoAndErrors extends Component {
	state = {
		pokemon: null,
		loading: false, //! індикатор завантаження (лоадер)
		error: null, //todo: Обробка помилок
	}

	// setName = () => {
	// 	this.setState({pokemon: this.props.pokemonName})
	// };

	//! Цей метод викликається автоматично при оновленні пропсів або стейту
	componentDidUpdate(prevProps) {
		const prevName = prevProps.pokemonName
		const nextName = this.props.pokemonName //! ім'я покемона (оновлене)

		// Перевіряємо, чи змінився pokemonName, щоб не потрапити в нескінченний цикл
		if (prevName !== nextName) {
			console.log("❗️Змінилося ім'я ПОКЕМОНА")
			console.log("⏮️prevName (prevProps.pokemonName): ", prevProps.pokemonName)
			console.log("⏭️nextName (this.props.pokemonName): ", this.props.pokemonName)

		this.setState({ 
			loading: true, 
			pokemon: null, 
			error: null 
		}); //! індикатор завантаження (лоадер) = true

			setTimeout(() => {
				fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
					// .then(res => res.json())

					// todo: Обробка помилок
					.then(response => {
            if (response.ok) {
              return response.json()
            };
            return Promise.reject(new Error(`🚫Покемена з ім'ям «${nextName}» не існує`))
          })
					
					.then(pokemon => this.setState({
            pokemon,
            error: null, // todo: Обробка помилок
          }))
					// todo: Обробка помилок
          .catch(error => this.setState({
            pokemon: null,
            error
          }))

					.finally(() => this.setState({ loading: false })); //! індикатор завантаження (лоадер) = false
			}, 2000)
		}
	}

	render() {
		const {
			pokemon, //! об'єкт з даними про покемона
			loading,
			error
		} = this.state

		const {
			pokemonName, //! ім'я покемона
		} = this.props
    
		const src = pokemon?.sprites.other['official-artwork'].front_default;

		console.log("----------------------------------------------")
		console.log("ℹ️props-> 🐷 Покемон-ім'я:", pokemonName)
		console.log("ℹ️{🐷} Покемон-об'єкт:", pokemon)
		console.log("ℹ️{🐷} Покемон-зображення:", src)
		console.log("ℹ️❌ Помилка:", error);
		console.log("______________________________________________")

		return (
			<div className={css.pokemonInfo}>
				<h1>Pokemon Info</h1>
				{/* //todo: Обробка помилок */}
				{/* {error && (<h2>Покемена з ім'ям {pokemonName} не існує</h2>)} */}
				{error && <h2 className={css.pokemonInfoTitleError}>{error.message}</h2>}
				{/* //todo: Обробка помилок */}
        {!pokemon && !loading && !error && <h2><i>Введіть ім'я покемона</i></h2>}
				{pokemon && (
					<h2><u><i>Ви ввели ім'я покемона</i></u>:<b>{pokemonName}</b></h2>
				)}
				{loading && (
					<h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>
				)}
				{pokemon && (
					<div className={css.pokemonContainer}>
						<p className={css.pokemonName}><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
						<img
							src={src}
						/>
					</div>
				)}
			</div>
		)
	}
}