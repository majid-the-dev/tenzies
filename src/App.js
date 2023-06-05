import React from "react";
import Die from "./components/Die";
import Scoreboard from "./components/Scoreboard";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { GiPerspectiveDiceFive } from 'react-icons/gi';
import { IoPersonCircle } from "react-icons/io5";
import 'animate.css';

function App() {

  const [formData, setFormData] = React.useState("")
  const [updatePlayer, setUpdatePlayer] = React.useState("")
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [trials, setTrials] = React.useState(0)
  const [gameRound, setGameRound] = React.useState(1)
  const [welcome, setWelcome] = React.useState(0)

  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSame = dice.every(die => firstValue === die.value)
  const winGame = allHeld === true && allSame === true

  React.useEffect(() => {
    if (winGame) {
      // setGameRound(prevRound => prevRound + 1)
      setTenzies(true)
    } else {
      setTenzies(false)
    }
  }, [dice, winGame])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setTrials(prevTrial => prevTrial + 1)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setGameRound(prevRound => prevRound + 1)
      setDice(allNewDice())
      setTrials(0);
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  function startGame() {
    setWelcome(prevWelcome => prevWelcome + 1);
    // setFormData(formData.playerName)
    console.log(localStorage.getItem('formData'));
  }

  function handleChange(event) {
    // const { name, value, type } = event.target
    // setFormData(prevFormData => ({
    //   ...prevFormData,
    //   [name]: value
    // }))
    setFormData(event.target.value)
  }

  function handleChange2(event) {
    const { name, value } = event.target
    setUpdatePlayer (prevPlayerName => ({
      ...prevPlayerName,
      [name]: value
    }))
  }

  function handleSubmitWelcome(event) {
    event.preventDefault();
    localStorage.setItem('formData', formData);
    localStorage.setItem('welcome', welcome)
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function updateName(event) {
    // event.preventDefault();
    setFormData(updatePlayer.updatePlayerName)
  }


  const diceElement = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  return (
    <main>
      {
        welcome === 0 ?
          <div className="pre-page">
            <GiPerspectiveDiceFive className="dice-logo animate__animated animate__bounce" />
            <h1>WELCOME PLAYER</h1>
            <form onSubmit={handleSubmitWelcome}>
              <input className="player-name-input" type="text" name="playerName" placeholder="Enter name" value={formData} onChange={handleChange} /> <br />
              <button className="roll-dice" type="submit" onClick={startGame}>Start New Game</button>
            </form>
          </div>
          :
          <>
            <div className="scoreboard">
              <Scoreboard trialsScoreBoard={trials} gameRoundScoreBoard={gameRound} userName={formData} />
            </div>

            <div>
              <button type="button" className="player-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                <IoPersonCircle className="player-icon" />{formData}
              </button>

              <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">Edit Player Info</h5>
                      <button type="button" className='user-img' data-bs-dismiss="" aria-label=""><IoPersonCircle className='animate__animated animate__heartBeat' /></button>
                    </div>
                    <div className="modal-body text-center">
                      <IoPersonCircle className="player-image" />
                      <form className="player-form" onSubmit={handleSubmit}>
                        <input className='update-player-input' type="text" placeholder={formData} name="updatePlayerName" value={updatePlayer.updatePlayerName} onChange={handleChange2} />
                        <div className="modal-footer player-modal">
                        <button type="button" className="close-btn close" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="close-btn" data-bs-dismiss="modal" onClick={updateName}>Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
              Roll until all dice are the same. Click each die to freeze it at its
              current value between rolls.
            </p>
            <div className="dice-container">
              {diceElement}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
          </>
      }
    </main>
  );
}

export default App;



