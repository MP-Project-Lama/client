import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { signOut } from "../../reducers/Login";
import NavBar from "../NavBar";
import Swal from "sweetalert2";

import "./style.css";

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

  
  useEffect(() => {
    getUserInfo();
  }, []);
  

  /// logout
  function logout() {
    try {
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  /// get user
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
  
/// reset password
  const resetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Password",
      input: "email",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonColor: "#E07A5F",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });
    if (email) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/check`, {
          email,
        });

        alert.show("Confirm your email to reset the password", {
          timeout: 5000,
          type: "success",
        });
        navigate("/reset/:id");
      } catch (error) {
        alert.show("Somthing Went Wrong !", {
          timeout: 5000,
          type: "error",
        });
      }
    }
  };

  
  
  return (
    <div className="profilePage">
      <NavBar />
      <div className="profile">
        <div>
          <img src={user.avatar} alt="profile-pic" />
        </div>
        {/* <p> Change avatar</p> */}

        <h3 className="userInfo">
          <AiOutlineUser className="userIcons" />
          <span>Username: </span>
          {user.username}
        </h3>
        <h3 className="userInfo">
          <MdAlternateEmail className="userIcons" /> <span> Email: </span>
          {user.email}
        </h3>
        <button className="editBtn" onClick={resetPassword}>
          Reset Password
        </button>
        <button onClick={logout} className="editBtn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
