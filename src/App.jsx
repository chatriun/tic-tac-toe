import { useState } from "react";
import Player from "./component/Player";
import GameBoard from "./component/GameBoard";

const App = () => {
  const [activePlayer, setActivePlayer] = useState("X");

  const handleSelectBox = () => {
    setActivePlayer((curPlayer) => (curPlayer === "X" ? "O" : "X"));
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
        <GameBoard onSelectBox={handleSelectBox} playerSymbol={activePlayer} />
        <div>log</div>
      </ol>
    </>
  );
};

export default App;
