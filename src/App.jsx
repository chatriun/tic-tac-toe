import Player from "./component/Player";
import GameBoard from "./component/GameBoard";

const App = () => {
  return (
    <>
      <ol id="game-container">
        <div id="players">
          <Player initialName="player 1" symbol="X" />
          <Player initialName="player 2" symbol="O" />
        </div>
        <GameBoard />
        <div>log</div>
      </ol>
    </>
  );
};

export default App;
