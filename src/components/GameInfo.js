import React from 'react'

function GameInfo(props) {

  return (
    <div className='game-info'>
        <h1 className="trials">Trials: {props.trials}</h1>
        <h1 className="timer">Game Set: {props.gameRound}</h1>
    </div>
  )
}

export default GameInfo