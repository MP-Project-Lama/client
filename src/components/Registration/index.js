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
  const [message, setMessage] = useState("");
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

  const signup = async () => {
    let exist = false;
    users.filter((user) => {
      if (user.email === email || user.username === username) {
        exist = true;
        console.log(user.data);
      }
    });
    if (exist) {
      console.log("exist");
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
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          identity: identity,
          password: loginPassword,
        }
      );
console.log(result);
      dispatch(
        signIn({
          role: result.data.result.role,
          token: result.data.token,
          user: result.data.result,
          
        })
      );
      if (result.res.status == 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status == 404){
        Swal.fire({
          title: error.response.data.message,
          showClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if (error.response.status == 403){
        Swal.fire({
          title: error.response.data.message,
          showClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if (error.response.status == 404) {
        Swal.fire({
          title: error.response.data.message,
          showClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    }
  };
  const flipCard = () => {
    document.querySelector("#flipper").classList.toggle("flip");
  };
  return (
    <div className="flip-container">
      {!state.token ? (
        <div className="flipper" id="flipper">
          <div className="front">
            <h2 className="title"> Login </h2>
            <input
              type="email"
              name="email"
              placeholder="Email or Username"
              required
              className="inputs"
              onChange={(e) => setIdentity(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="inputs"
              required
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <input
              type="submit"
              value="login"
              className="signup-submit"
              onClick={login}
            />
            <p className="flipbutton" onClick={flipCard}>
              Not a member? Sign up here
            </p>
          </div>
          <div className="back">
            <h2 className="title">Register</h2>
            <input
              type="text"
              placeholder="username"
              className="inputs"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="inputs"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="inputs"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              className="signup-submit"
              name="submit"
              value="Signup"
              onClick={() => {
                signup();
              }}
            />
            <p className="flipbutton" onClick={flipCard}>
              Are you a member? Login here
            </p>
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
