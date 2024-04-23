import React, { useState, useEffect } from "react";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Feed from "./pages/feed";

function App() {
  return (
    <div className="App">
      <Profile />
      {/* <Feed /> */}
    </div>
  );
}

export default App;
