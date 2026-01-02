import React, { useEffect, Suspense, useState } from "react";
import { Outlet } from "react-router";
//import "./index.css";

function App() {
  return (
    <>
      <div>Hallo, Wikser!</div>
      <Outlet />
    </>
  );
}

export default App;
