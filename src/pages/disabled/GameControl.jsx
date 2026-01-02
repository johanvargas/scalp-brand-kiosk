import React from "react";
import { useSnapshot } from "valtio";
import { gameState } from "../state/gameState.js";

const GameControl = () => {
  // current player
  // Game playing or not
  // button start game
  // button stop game
  // throws counter (setter if can do)
  const gamesnap = useSnapshot(gameState);

  return (
    <>
      <div className="bg-lime-50 p-2 rounded-sm m-2">
        <p><span >Game ID .</span> {gamesnap.id}</p>
        <p>
          Game Play .
          {` ${gamesnap.gameIsSet}` ? " No game at the moment" : "Game On"}
        </p>
      </div>
    </>
  );
};

export default GameControl;
