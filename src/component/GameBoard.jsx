import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({ onSelectBox, playerSymbol }) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const handleSelectBox = (rowIndex, colIndex) => {
    setGameBoard((prevGameBoard) => {
      const updateBoard = [...prevGameBoard];
      updateBoard[rowIndex][colIndex] = playerSymbol;
      return updateBoard;
    });
    onSelectBox();
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectBox(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
