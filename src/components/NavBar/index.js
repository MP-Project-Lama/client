import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../reducers/Login";
import "antd/dist/antd.css";
import { AiOutlineLogout } from "react-icons/ai";
import "./style.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });


//// logout 
function logout() {
    try {
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <div>
        <div className="navHeader">
          <h1 className="logo">FASHIONDARY</h1>
        </div>
      </div>
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
            <>
              <li className="userProfile">
                Hi :
                <Link to={`/user/${state.user._id}`}>
                  {state.user.username.toUpperCase()}
                </Link>
              </li>
              <AiOutlineLogout onClick={logout} className="logoutIcon" />
            </>
          ) : (
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          )}
        </ul>
        <hr />
      </nav>
    </div>
  );
};

export default NavBar;
