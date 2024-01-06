import { useState } from "react";
import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import Log from "./component/Log";
import GameOver from "./component/GameOver";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";

const PLAYERS = {
  X: "player 1",
  O: "player 2",
};
const INITIAL_BOARD_GAME = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const derivePlayerTurn = (playerTurn) => {
  let currentPlayer = "X";
  if (playerTurn.length > 0 && playerTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};
const deriveGameBoard = (playerTurn) => {
  let gameBoard = [...INITIAL_BOARD_GAME.map((array) => [...array])];

  for (const turn of playerTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};
const deriveWinner = (gameBoard, players) => {
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
      winner = players[firstSymbolBox];
    }
  }
  return winner;
};

const App = () => {
  const [playerTurn, setPlayerTurn] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const activePlayer = derivePlayerTurn(playerTurn);

  const gameBoard = deriveGameBoard(playerTurn);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = playerTurn.length === 9 && !winner;

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
  const handleRematch = () => {
    setPlayerTurn([]);
  };
  const handleNameChange = (symbol, newName) => {
    setPlayers((prevName) => {
      return { ...prevName, [symbol]: newName };
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
            onNameChange={handleNameChange}
          />
          <Player
            initialName="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handleNameChange}
          />
        </div>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectBox={handleSelectBox} board={gameBoard} />
      </ol>
      <Log turns={playerTurn} />
    </main>
  );
};

export default App;
