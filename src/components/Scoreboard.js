import React from 'react'
import { GiPerspectiveDiceFive } from 'react-icons/gi'



function Scoreboard(props) {

  const trials = props.trialsScoreBoard
  const gameSet = props.gameRoundScoreBoard
  const userName = props.userName

  const [showButton, setShowButton] = React.useState(true)

  function toggleShow() {
    setShowButton(false)
  }

  function toggleShow2() {
    setShowButton(true)
  }


  return (
    <div>

      {showButton && <button onClick={toggleShow} type="button" className="scoreboard-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Scoreboard
      </button>}

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Scoreboard</h5>
              <button type="button" className='logo-btn' data-bs-dismiss="" aria-label=""><GiPerspectiveDiceFive className='animate__animated animate__heartBeat' /></button>
            </div>
            <div className="modal-body">
              <table>
                <tbody>
                  <tr>
                    <th>Player name</th>
                    <th>Game set</th>
                    <th>Trials</th>
                  </tr>
                  <tr>
                    <td className='scoreboard-player-name'>{userName}</td>
                    <td>{gameSet}</td>
                    <td>{trials}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button onClick={toggleShow2} type="button" className="close-btn" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scoreboard