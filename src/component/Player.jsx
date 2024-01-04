import { useState } from "react";

const Player = ({ initialName, symbol, isActive }) => {
  const [isEditing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleClick = () => {
    setEditing((editing) => !editing);
  };

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };

  const playerBox = isEditing ? (
    <input type="text" value={playerName} onChange={handleChange} />
  ) : (
    <span className="player-name" value={initialName}>
      {playerName}
    </span>
  );

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerBox}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
};

export default Player;
