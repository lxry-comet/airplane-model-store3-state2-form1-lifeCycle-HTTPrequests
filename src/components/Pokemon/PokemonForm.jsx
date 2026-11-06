import React, { Component } from "react"
import css from "./PokemonForm.module.css"


export class PokemonForm extends Component {
	state = {
		pokemonName:"",
	}
	reset = () => {
		this.setState({pokemonName:""});
	};

	handleSubmit = event => {
		event.preventDefault();
		const {pokemonName} = this.state;
		console.log(`Ім'я покемона: ${pokemonName}`);
		if(pokemonName===""){
			alert("Введіть ім'я покемона!")
			return
		}
		this.props.onSubmit(pokemonName); //! Тут відбувається виклик функції з AppComplexForm submit({ ...this.state })
		this.reset();
	};

	handleChange = event => {
		const { name, value } = event.currentTarget;
		console.log("name:", name);
		console.log("value:", value);
		this.setState({
			[name]: value,
		});

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
				<form 
					className={css.pokemonForm}
					onSubmit={this.handleSubmit}
				>
					<input 
						className={css.pokemonFormInput}
						type="text" 
						name='pokemonName'
						value={pokemonName}
						onChange={this.handleChange}
					/>
					<button 
						className={css.pokemonButton}
						type="submit"
					>
						Search
					</button>
				</form>
			</>
		)
	}

}
