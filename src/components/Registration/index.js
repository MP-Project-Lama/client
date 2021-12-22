import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../reducers/Login";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./style.css";

const Registration = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [identity, setIdentity] = useState("");
  const [loginPassword, setLoginPassword] = useState("");




  const state = useSelector((state) => {
    return {
      token: state.Login.token,

    };
  });

  ///
  useEffect(() => {
    getAllUsers();
    console.log(users);
  }, []);

  const getAllUsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
    setUsers(res.data);
  };

  const signup = async (e) => {
    e.preventDefault();
    let exist = false;
    users.filter((user) => {
      if (user.email === email || user.username === username) {
        exist = true;
        console.log(user.data);
      }
    });
    if (exist) {
      Swal.fire({
        title: "Email or Username Already Exist ",
        showClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      try {
        const res = await axios.post(
          ` ${process.env.REACT_APP_BASE_URL}/signup`,
          {
            email,
            username,
            password,
          }
        );
        navigate(`/verify/${res.data._id}`);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };


const login = async () => {
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      identity: identity,
      password: password,
    });
    dispatch(
      signIn({
        role: result.data.result.role,
        token: result.data.token,
        user: result.data.result,
      })
    );
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};  

  return (
    <div>
      {!state.token ? (
        <div>
          <form className="signupForm">
            <input
              type="text"
              placeholder="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              className="password"
              name="submit"
              value="Signup"
              onSubmit={(e) => {
                signup();
              }}
            />
          </form>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email or Username"
              required
              className="email"
              onChange={(e) => setIdentity(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="password"
              required
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <input
              type="submit"
              value="login"
              className="loginBtn"
              onClick={login}
            />
          </div>
        </div>
      ) : (
        <div>
          <h1>
            You Already Logged in , Go to <Link to="/"> Home </Link>{" "}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Registration;
