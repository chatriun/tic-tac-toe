const GameBoard = ({ turns, onSelectBox }) => {
  return (
    <ol id="game-board">
      {turns.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {/* เปลี่ยนชื่อตัวแปร selectedBox เพราะไม่บอกจุดประสงค์ชัดเจน */}
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectBox(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
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
