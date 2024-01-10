import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = () => {
  const [board, setBoard] = useState(initialGameBoard);

  const handleSelectBox = (rowIndex, colIndex) => {
    setBoard((prevBoard) => {
      const gameBoard = [...prevBoard];
      gameBoard[rowIndex][colIndex] = "X";
    });
  };

  return (
    <div id="game-board">
      <ol>
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSelectBox, colIndex) => (
                <li key={colIndex}>
                  <button onClick={() => handleSelectBox(rowIndex, colIndex)}>
                    {playerSelectBox}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default GameBoard;
