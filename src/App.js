import React, { Component } from 'react';
import './App.css';
import Letter from './Letter/Letter.js'
import Keyboard from './Keyboard/Keyboard.js'
import Counter from './Counter/Counter.js'
import 'bootstrap/dist/css/bootstrap.min.css'

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const allquiz = [
    {
        "question": "Quel est la capital économique du Bénin ?",
        "response": "COTONOU"
    },
    {
        "question": "Quel est la capital adminstrative du Bénin ?",
        "response": "PORTO"
    },
]

class App extends Component {
    state = {
        question: this.generateQuiz(),
        keyboard: this.generateKeyboard(),
        selection: [],
        gameState: "en cours",
    }

    generateQuiz() {
        const result = {
            letters: [],
            question: ''
        }//
        let randomquiz = Math.floor(Math.random() * allquiz.length)// on chposie une index 

        result.question = allquiz[randomquiz].question//on choisie le mot à l'index prédéfinit
        let oneWord = allquiz[randomquiz].response//on choisie le mot à l'index prédéfinit
        const word = oneWord.split('')//on découpe le mot
        while (word.length > 0) {
            const letter = word.shift()// la constante letter reçoit la lettre à l'index 0 qu'on supprime du mot word et l'index des autes mots sont décrémenté
            result.letters.push(letter)// on met la constante letter dans le tableau result l'un a près l'autre
        }
        return result
    }

    generateKeyboard() {
        const result = []
        const size = 26
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
        if (gameState == "en cours") {
            this.setState({ selection: [...selection, letter] }, this.gameState)
        }
    }

    newGame = () => {
        this.setState({ selection: [], question: this.generateQuiz(), gameState: "en cours" })
    }

    trying = () => {
        const { question, selection } = this.state
        return selection.filter(elt => !question.letters.includes(elt)).length//return la taille des élément choisit non compris dans le tableau
    }

    gameState = () => {
        const { question, selection } = this.state
        const lastTests = 10 - this.trying()
        const findWord = question.letters.filter(elt => selection.includes(elt)).length === question.letters.length
        if (lastTests > 0 && findWord) {
            this.setState({ gameState: "gagnée" })
        } else if (lastTests > 0) {
            return
        } else {
            this.setState({ gameState: "perdue" })
        }
    }

    render() {
        const { question, keyboard } = this.state

        return (
            <div className="hangman">
                <div className="header">
                    <h1 className="title">Jeu du pendu</h1>
                    <Counter
                        counter={this.trying()}
                        gameState={this.state.gameState}
                    />
                    <button className="restart" onClick={this.newGame}>Reprendre le Jeu</button>
                </div>
                <p className="question">{question.question}</p>

                <div className="game">
                    <div className="content">
                        {question.letters.map((letter, index) => (
                            <Letter
                                letter={letter}
                                feedback={this.getFeedback(letter) ? "visible" : "hidden"}
                                key={index}
                            />
                        ))}
                    </div>
                </div>

                <div className="keyboard">
                    {keyboard.map((letter, index) => (
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
