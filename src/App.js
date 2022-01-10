import React from "react";
import { Route, Routes } from "react-router";
import Home from "./components/Landing";
import Registration from "./components/Registration";
import Blog from "./components/Blog";
import Post from "./components/Post";
import Explore from "./components/Explore";
import Collection from "./components/Collection";
import Verification from "./components/Verification";
import AddCollection from "./components/addCollection";
import AddPost from "./components/addPost";
import EditPost from "./components/editPost";
import Designer from "./components/Designer";
import EditCollection from "./components/editCollection";
import DirectMessage from "./components/directMessage";
import Profile from "./components/Profile";
import ResetPassword from "./components/resetPassword";
import Dashboard from "./components/Dashboard";
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
        <Route path="/collection/:id" element={<Collection />} />
        <Route path="/coll/edit/:id" element={<EditCollection />} />
        <Route path="/collection" element={<AddCollection />} />
        <Route path="/designer/:id" element={<Designer />} />
        <Route path="/directmessage/:id" element={<DirectMessage />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/reset/:id" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
