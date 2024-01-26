import { useState } from "react";

const Player = ({ initialName, symbol, isActive }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setEditing((edit) => !edit);
  };

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const nameBox = editing ? (
    <input onChange={handleNameChange} value={playerName} />
  ) : (
    <span className="player-name">{playerName}</span>
  );
  return (
    // <span className="highlight-player">
    // <li className={isActive ? "active" : undefined}>
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {nameBox}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleClick}>{editing ? "save" : "edit"}</button>
      </span>
    </li>
    // </span>
  );
};

export default Player;
