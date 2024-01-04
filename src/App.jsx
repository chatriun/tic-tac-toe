import Player from "./component/Player";

const App = () => {
  return (
    <>
      <ol id="game-container">
        <div id="players">
          <Player initialName="player 1" symbol="X" />
          <Player initialName="player 2" symbol="O" />
        </div>
        <div>gameBoard</div>
        <div>log</div>
      </ol>
    </>
  );
};

export default App;
