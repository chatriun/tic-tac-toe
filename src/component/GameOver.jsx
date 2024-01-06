const GameOver = ({ winner, onRematch }) => {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p> {winner} win!</p>}
      {!winner && <p>it's draw</p>}
      <p>
        <button onClick={onRematch}>rematch</button>
      </p>
    </div>
  );
};

export default GameOver;
