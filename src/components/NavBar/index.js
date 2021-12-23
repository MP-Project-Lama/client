import React from "react";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";

import "./style.css";

const NavBar = () => {

const state = useSelector((state) => {
  return {
    token: state.Login.token,
  };
});


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
        {state.token ? (
          <li>
            <Link to="/">Profile</Link>
          </li>
        ) : (
          <li>
            <Link to="/registration">Registration</Link>
          </li>
        )}
      </ul>
      <hr />
    </nav>
  );
};

export default NavBar;
