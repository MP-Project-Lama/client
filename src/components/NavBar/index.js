import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const NavBar = () => {
  return (
    <nav>
      <ul className="navBar">
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Profile</Link>
        </li>
      </ul>
      <hr />
    </nav>
  );
};

export default NavBar;
