import React, { Component } from "react"
// https://www.npmjs.com/package/react-toasti
// https://fkhadra.github.io/react-toastify/introduction/
import { toast } from 'react-toastify' //! 02.Підлючення/виклик бібліотеки react-toastify
import css from "./PokemonInfo.module.css"

//? Застосуємо такі статуси:
//?     - idle - запиту ще немає, нічого не відбувається
//?     - pending - пішов запит
//?     - rejected - відповідь на запит з помилкою
//?     - resolved - успішна відповідь на запит

//* Плюси використання паттерна State Machine:
//*     - Зникають проблеми скидання полів «щоб працювало».
//*     - Не слід стежити за значеннями N полів. 
//*     - Зрозуміліші умови рендеру розмітки.

export class PokemonInfoAndErrorsStateMachine21 extends Component {
  state = {
    pokemon: null, //! об'єкт з даними про покемона
    error: null, //todo: Обробка помилок
    status: 'idle', //! статус
  };

  //! Цей метод викликається автоматично при оновленні пропсів або стейту
  componentDidUpdate(prevProps) {
    const prevName = prevProps.pokemonName
    const nextName = this.props.pokemonName //! ім'я покемона (оновлене)

    // Перевіряємо, чи змінився pokemonName, щоб не потрапити в нескінченний цикл
    if (prevName !== nextName) {
      console.log("❗️Змінилося ім'я ПОКЕМОНА")
      console.log("⏮️prevName (prevProps.pokemonName): ", prevProps.pokemonName)
      console.log("⏭️nextName (this.props.pokemonName): ", this.props.pokemonName)

      //*: New
      this.setState({ status: 'pending' }) //! статус
      setTimeout(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)

          // todo: Обробка помилок
          .then(response => {
            if (response.ok) {
              return response.json()
            };
            return Promise.reject(new Error(`🚫Покемена з ім'ям «${nextName}» не існує`))
          })
          .then(pokemon =>
            this.setState({
              pokemon,
              // error: null, // todo: Обробка помилок - вже не потрібно
              status: 'resolved', //! статус 
            }))

          //todo: Обробка помилок
          .catch(error =>
            this.setState({
              error,
              status: 'rejected', //! статус 
            }))
      }, 2000)
    }
  }

  render() {
    const {
      pokemon, //! об'єкт з даними про покемона
      error, //todo: Обробка помилок
      status, //! статус
    }
      = this.state

    const {
      pokemonName, //! ім'я покемона
    } = this.props

    const src = pokemon?.sprites.other['official-artwork'].front_default

    console.log("----------------------------------------------")
    console.log("ℹ️props-> 🐷 Покемон-ім'я:", pokemonName)
    console.log("ℹ️{🐷} Покемон-об'єкт:", pokemon)
    console.log("ℹ️❌ Помилка:", error)
    console.log("ℹ️❓ Статус:", status)
    console.log("----------------------------------------------")

    //? Застосуємо такі статуси:
    //?     - idle - запиту ще немає, нічого не відбувається
    //?     - pending - пішов запит
    //?     - rejected - відповідь на запит з помилкою
    //?     - resolved - успішна відповідь на запит

    //? idle - запиту ще немає, нічого не відбувається
    if (status === 'idle') {
      return (
        <div className={css.pokemonInfo}>
          <h1>Pokemon Info</h1>
          <h2><i>Введіть ім'я покемона</i></h2>
        </div>
      )
    };

    //? pending - пішов запит
    if (status === 'pending') {
      return (
        <div className={css.pokemonInfo}>
          <h1>Pokemon Info</h1>
          <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>{pokemonName}</b></h2>
          <h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>
        </div>
      )
    };
    //? rejected - відповідь на запит з помилкою
    if (status === 'rejected') {
      return (
        <div className={css.pokemonInfo}>
          <h1>Pokemon Info</h1>
          <h2 className={css.pokemonInfoTitleError}>{error.message}</h2>
        </div>
      )
    };

    //? resolved - успішна відповідь на запит
    if (status === 'resolved') {
      return (
        <div className={css.pokemonInfo}>
          <h1>Pokemon Info</h1>
          <p className={css.pokemonName}><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
          <img src={src} alt={pokemon.name} />
        </div>
      )
    };
  }
}