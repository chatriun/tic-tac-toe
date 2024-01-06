import { useState } from "react";
import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";

const derivePlayerTurn = (playerTurn) => {
  let currentPlayer = "X";
  if (playerTurn.length > 0 && playerTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const App = () => {
  const [playerTurn, setPlayerTurn] = useState([]);
  const activePlayer = derivePlayerTurn(playerTurn);

  let gameBoard = initialGameBoard;

  for (const turn of playerTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  const handleSelectBox = (rowIndex, colIndex) => {
    setPlayerTurn((prevTurn) => {
      const currentPlayer = derivePlayerTurn(prevTurn);

      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updateTurn;
    });
  };
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbolBox = gameBoard[combination[0].row][combination[0].column];
    const secondSymbolBox =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSymbolBox = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbolBox &&
      firstSymbolBox === secondSymbolBox &&
      firstSymbolBox === thirdSymbolBox
    ) {
      winner = firstSymbolBox;
    }
  }

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
        {winner && <span>winner is {winner}</span>}
        <GameBoard onSelectBox={handleSelectBox} board={gameBoard} />
      </ol>
      <Log turns={playerTurn} />
    </main>
  );
};

export default App;
