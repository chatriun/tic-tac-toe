import { useState } from "react";
import Player from "./component/Player";
import GameBoard from "./component/GameBoard";

const App = () => {
  const [activePlayer, setActivePlayer] = useState("X");
  const [playerTurn, setPlayerTurn] = useState([]);

  const handleSelectBox = (rowIndex, colIndex) => {
    setActivePlayer((curPlayer) => (curPlayer === "X" ? "O" : "X"));
    setPlayerTurn((prevTurn) => {
      let currentPlayer = "X";
      if (prevTurn.length > 0 && prevTurn[0].player === "X") {
        currentPlayer = "O";
      }
      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updateTurn;
    });
  };

  return (
    <>
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
        <div>log</div>
      </ol>
    </>
  );
};

export default App;
