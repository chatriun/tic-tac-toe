import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { useState } from "react";
import GameOver from "./component/GameOver";

const PLAYERS = {
  X: "player 1",
  O: "player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const getGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const getCurPlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const getWinner = (gameBoard, playerName) => {
  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSelectBox =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSelectBox =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSelectBox =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSelectBox &&
      firstSelectBox === secondSelectBox &&
      firstSelectBox === thirdSelectBox
    ) {
      winner = playerName[firstSelectBox];
    }
  }
  return winner;
};

const getDraw = (gameTurns, winner) => {
  let hasDraw = false;
  if (gameTurns.length === 9 && !winner) {
    hasDraw = true;
  }
  return hasDraw;
};

const App = () => {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);

  const gameBoard = getGameBoard(gameTurns);
  const activePlayer = getCurPlayer(gameTurns);
  const winner = getWinner(gameBoard, playerName);
  const hasDraw = getDraw(gameTurns);

  const handleNameChange = (symbol, newName) => {
    setPlayerName((oldName) => ({ ...oldName, [symbol]: newName }));
  };
  const handleRematch = () => {
    setGameTurns([]);
  };
  const handleSelectBox = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurn) => {
      const currentPlayer = getCurPlayer(prevGameTurn);
      const updateGameBoard = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurn,
      ];
      return updateGameBoard;
    });
  };

  return (
    <>
      <main id="game-container">
        <ol>
          <span id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handleNameChange}
            />
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handleNameChange}
            />
          </span>
        </ol>
        <GameBoard turns={gameBoard} onSelectBox={handleSelectBox} />
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
      </main>
      <Log turns={gameTurns} />
    </>
  );
};

export default App;
