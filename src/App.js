import React from "react";
import { Route, Routes } from "react-router";
import Home from "./components/Landing";
import Registration from "./components/Registration"
import Blog from "./components/Blog";
import Post from "./components/Post";
import Explore from "./components/Explore";
import Verification from "./components/Verification";
import AddCollection from "./components/addCollection";
import AddPost from "./components/addPost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/verify/:id" element={<Verification />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post" element={<AddPost />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/collection" element={<AddCollection />} />
      </Routes>
    </div>
  );
}

export default App;
