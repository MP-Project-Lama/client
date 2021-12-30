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
import EditPost from "./components/editPost";
import Designer from "./components/Designer";

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
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/collection" element={<AddCollection />} />
        <Route path="/designer/:id" element={<Designer />} />
      </Routes>
    </div>
  );
}

export default App;
