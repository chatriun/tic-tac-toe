import { useState } from "react";

const Player = ({ initialName, symbol }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setEditing((edit) => !edit);
  };

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };

  const playerBox = editing ? (
    <input onChange={handleChange} value={playerName} />
  ) : (
    <span className="player-name">{playerName}</span>
  );
  return (
    <li>
      <div className="player">
        <span>
          {playerBox}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{editing ? "save" : "edit"}</button>
      </div>
    </li>
  );
};

export default Player;
