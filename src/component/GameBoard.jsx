const GameBoard = ({ turns, onSelectBox, playerSymbol }) => {
  return (
    <ol id="game-board">
      {turns.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((selectedBox, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectBox(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {selectedBox}
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
