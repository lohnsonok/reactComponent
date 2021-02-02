import React, { Component } from 'react';
import './App.css';
import Letter from './Letter/Letter.js'
import Keyboard from './Keyboard/Keyboard.js'
import Counter from './Counter/Counter.js'
// import 'bootstrap/dist/css/bootstrap.min.css'

const alphabet = "AOBNDCEFUGHITWXYKLM"
const allword = ["COTONOU"]

class App extends Component {
  state = {
    letters: this.generateWords(),
    keyboard : this.generateKeyboard(),
    selection : [],
    gameState : "en cours",
  }

  generateWords() {
    const result = []//tableau vide
    let oneWord = Math.floor(Math.random()* allword.length)// on chposie une index 
    oneWord = allword[oneWord]//on choisie le mot à l'index prédéfinit
    const word = oneWord.split('')//on découpe le mot
    while (word.length>0) {
      const letter = word.shift()// la constante letter reçoit la lettre à l'index 0 qu'on supprime du mot word et l'index des autes mots sont décrémenté
      result.push(letter)// on met la constante letter dans le tableau result l'un a près l'autre
    }
    return result
  }

  generateKeyboard() {
    const result = []
    const size = 19
    const allLetters = alphabet.split('')
    while (result.length < size) {
      const letter = allLetters.shift()
      result.push(letter)// on met les lettres de alphabet dans le tableau
    }
    return result
  }

  getFeedback(letter) {
    const { selection } = this.state
    return selection.includes(letter)
  }// cette fonction permet de vérifier si une lettre est inclue dans le tableau letter

  handleClick = letter => {
    const { selection, gameState } = this.state
    if(gameState == "en cours") {
      this.setState({selection: [...selection, letter]}, this.gameState)
    }
  }

  newGame = () => {
    this.setState({selection: [], letters: this.generateWords(), gameState : "en cours" })
  }

  trying = () => {
    const {letters, selection} = this.state
    return selection.filter(elt => !letters.includes(elt)).length//return la taille des élément choisit non compris dans le tableau
  }

  gameState = () => {
    const {letters, selection} = this.state
    const lastTests = 10 - this.trying()
    const findWord = letters.filter(elt => selection.includes(elt)).length === letters.length
    if (lastTests > 0 && findWord) {
      this.setState({gameState : "gagnée"})
    } else if (lastTests > 0 ) {
      return
    } else {
      this.setState({gameState : "perdue"})
    }
  }

  render() {
    const { letters, keyboard } = this.state

    return (
      <div className="hangman">
        <div className="header">
          <h1 className="title">Jeu du pendu</h1>
          <Counter
              counter = {this.trying()}
              gameState = {this.state.gameState}
              />
          <button className="restart" onClick={this.newGame}>Reprendre le Jeu</button>
        </div>
        <p className="question">Quel est la capital économique du Bénin ? </p>

        <div className="game">
          <div className="content"> 
            { letters.map((letter, index) => (
              <Letter
                letter={letter}
                feedback={this.getFeedback(letter) ? "visible" : "hidden"}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className="keyboard">
          { keyboard.map((letter, index) => (
            <Keyboard
              letter={letter}
              key={index}
              onClick={this.handleClick}
              feedback={this.getFeedback(letter) ? "gray" : "#ffa500"}
              />
          ))}
        </div>
      </div>

    )
  }
}

export default App;
