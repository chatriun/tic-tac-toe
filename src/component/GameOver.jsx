const GameOver = ({ winner, onRematch }) => {
  return (
    <div id="game-over">
      <h2>Game Over na!</h2>
      {winner && <p>you won, {winner}</p>}
      {!winner && <p>all you draw...</p>}
      {/* ทำไมต้องมีแท็ก p ครอบ */}
      <p>
        <button onClick={onRematch}>try again</button>
      </p>
    </div>
  );
};

export default GameOver;
