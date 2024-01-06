import { useState } from "react";
import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import Log from "./component/Log";
import GameOver from "./component/GameOver";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = { X: "player 1", O: "player 2" };

const deriveActivePlayer = (playerTurn) => {
  let currentPlayer = "X";
  if (playerTurn.length > 0 && playerTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const deriveWinnerPlayer = (gameBoard, players) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstBoxSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondBoxSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdBoxSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstBoxSymbol &&
      firstBoxSymbol === secondBoxSymbol &&
      firstBoxSymbol === thirdBoxSymbol
    ) {
      winner = players[firstBoxSymbol];
    }
  }
  return winner;
};

const deriveGameBoard = (playerTurn) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of playerTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const App = () => {
  const [playerTurn, setPlayerTurn] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(playerTurn);
  const gameBoard = deriveGameBoard(playerTurn);
  const winner = deriveWinnerPlayer(gameBoard, players);
  const hasDraw = playerTurn.length === 9 && !winner;

  const handleSelectBox = (rowIndex, colIndex) => {
    setPlayerTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
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

  const handleChangeName = (symbol, newName) => {
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
            onChangeName={handleChangeName}
          />
          <Player
            initialName="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleChangeName}
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
