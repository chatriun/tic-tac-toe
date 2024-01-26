import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
// import { WINNING_COMBINATIONS } from "./winning-combinations";
import { useState } from "react";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// for (const combinations of WINNING_COMBINATIONS){

// }
const deriveCurPlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const App = () => {
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  const activePlayer = deriveCurPlayer(gameBoard);
  console.log(activePlayer);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  const handleSelectBox = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurn) => {
      const currentPlayer = deriveCurPlayer(prevGameTurn);
      const updateGameBoard = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurn,
      ];
      console.log(currentPlayer);
      console.log(updateGameBoard);
      return updateGameBoard;
    });
  };
  return (
    <>
      <main id="game-container">
        <ol>
          <span id="players" className="highlight-player">
            <Player
              initialName="Player 1"
              symbol="X"
              isActive={activePlayer === "X"}
            />
            <Player
              initialName="Player 2"
              symbol="O"
              isActive={activePlayer === "O"}
            />
          </span>
        </ol>
        <GameBoard
          turns={gameBoard}
          onSelectBox={handleSelectBox}
          playerSymbol={activePlayer}
        />
      </main>
      Log
    </>
  );
};

export default App;
