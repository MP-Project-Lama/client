import React from "react";
import { Route, Routes } from "react-router";
import Home from "./components/Landing";
import Registration from "./components/Registration"
import Blog from "./components/Blog";
import Explore from "./components/Explore";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  );
}

export default App;
