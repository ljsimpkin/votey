import {QRCodeSVG} from 'qrcode.react'

function Lobby(props) {
  const {changeRound, game} = props.state

  return (
    <>
    <div className="Menu">
      <h1 className="menuTitle">Lobby</h1>
      <h3 className="lobbySubTitle"> Game code</h3>
      <h2 className="gameCode"> {game.gameName} </h2>
      <div>
        <QRCodeSVG className="QR" size={250} value={`https://ljsimpkin.github.io/votey`} />
      </div>
      <button onClick={()=>{changeRound("next")}} className="readyButton buttons joinButton">Press me when ready</button>
    </div>
  </>
  
  );
}

export default Lobby;


