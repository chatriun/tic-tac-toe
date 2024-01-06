import { useState } from "react";
import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import Log from "./component/Log";

const derivePlayerTurn = (playerTurn) => {
  let currentPlayer = "X";
  if (playerTurn.length > 0 && playerTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const App = () => {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [playerTurn, setPlayerTurn] = useState([]);
  const activePlayer = derivePlayerTurn(playerTurn);

  const handleSelectBox = (rowIndex, colIndex) => {
    // setActivePlayer((curPlayer) => (curPlayer === "X" ? "O" : "X"));
    setPlayerTurn((prevTurn) => {
      const currentPlayer = derivePlayerTurn(prevTurn);

      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updateTurn;
    });
  };

  return (
    <main>
      <ol id="game-container">
        <div id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </div>
        <GameBoard onSelectBox={handleSelectBox} turns={playerTurn} />
      </ol>
      <Log turns={playerTurn} />
    </main>
  );
};

export default App;
