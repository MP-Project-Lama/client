import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";

import { signOut } from "../../reducers/Login";
import "./style.css";
import NavBar from "../NavBar";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  // ///
  useEffect(() => {
    getUserInfo();
  }, []);
  ///

  function logout() {
    try {
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  ///
  
  return (
    <div className="profilePage">
      <NavBar />
      <div className="profile">
        <div>
          <img src={user.avatar} alt="profile-pic" />
        </div>

        <h3 className="userInfo">
          <AiOutlineUser className="userIcons" />
          <span>Username: </span>
          {user.username}
        </h3>
        <h3 className="userInfo">
          <MdAlternateEmail className="userIcons" /> <span> Email: </span>{" "}
          {user.email}
        </h3>
        <button className="editBtn"> Edit Profile </button>
        <button className="editBtn"> Reset Password </button>
        <button onClick={logout} className="editBtn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
