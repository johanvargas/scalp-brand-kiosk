import React, { useRef, useEffect } from "react";
import { useSnapshot, subscribe } from "valtio";
import image from "../assets/gothic-x.jpg";
import { clockState } from "./Timer.jsx";

const Floor = () => {
  const snap = useSnapshot(clockState);
  //const clockRef = useRef("none");
  //const clock_subscription = subscribe(clockState, () => {
  //  clockRef.current = clockState.msg;
  //});

  //useEffect(() => {
  //  clock_subscription();
  //}, [clockState]);

  const getGameMsgClass = () => {
    if (snap.playing) {
      return "game-msg game-msg-playing";
    } else if (snap.timeout <= 0) {
      return "game-msg game-msg-finished";
    } else {
      return "game-msg game-msg-ready";
    }
  };

  return (
    <>
      <img src={image} className="floor-image" />
      <h1 className="home-title">Floor</h1>
      <div className={getGameMsgClass()}>{snap.msg}</div>
      <div className="menu-message">
        <p>{"footer content"}</p>
      </div>
    </>
  );
};

export default Floor;
