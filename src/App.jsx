import { useState } from "react";
import Player from "./component/Player";
import GameBoard from "./component/GameBoard";

const App = () => {
  const [playerTurn, setPlayerTurn] = useState([]);

  return (
    <main>
      <ol id="game-container">
        <span id="players">
          <Player initialName="player 1" symbol="X" />
          <Player initialName="player 2" symbol="O" />
        </span>
        <GameBoard />
      </ol>
      <p>Log</p>
    </main>
  );
};

export default App;
