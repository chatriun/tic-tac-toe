import { useState } from "react";
import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (playerTurn) => {
  let currentPlayer = "X";
  if (playerTurn.length > 0 && playerTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const App = () => {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [playerTurn, setPlayerTurn] = useState([]);

  const activePlayer = deriveActivePlayer(playerTurn);

  let gameBoard = initialGameBoard;

  for (const turn of playerTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstBoxSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondBoxSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdBoxSymbol = gameBoard[combination[2].row][combination[2].column];
    console.log(firstBoxSymbol);
    console.log(secondBoxSymbol);
    console.log(thirdBoxSymbol);
    if (
      firstBoxSymbol &&
      firstBoxSymbol === secondBoxSymbol &&
      firstBoxSymbol === thirdBoxSymbol
    ) {
      winner = firstBoxSymbol;
    }
  }

  const handleSelectBox = (rowIndex, colIndex) => {
    // setActivePlayer((curPlayer) => (curPlayer === "X" ? "O" : "X"));
    setPlayerTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
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
        {winner && <p>winner is {winner}</p>}
        <GameBoard onSelectBox={handleSelectBox} board={gameBoard} />
      </ol>
      <Log turns={playerTurn} />
    </main>
  );
};

export default App;
