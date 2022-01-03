import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useAlert } from "react-alert";
import ReactCodeInput from "react-verification-code-input";
// import "./style.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


const ResetPassword = () => {
  const [user, setUser] = useState([]);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const alert = useAlert();

  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
      role: state.Login.role,
    };
  });

  ///
  useEffect(() => {
    getUserInfo();
  }, []);
  ////

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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const verify = async () => {
    if (code) {
      const { value: password } = await Swal.fire({
        title: "Enter your new password",
        input: "password",
        inputLabel: "",
        inputPlaceholder: "Enter your password",
        inputAttributes: {
          minlength: 8,
          autocapitalize: "off",
          autocorrect: "off",
        },
      });

      if (password) {
        Swal.fire(`Entered password: ${password}`);
      }
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/reset`, {
          id,
          code,
          password,
        });

        navigate("/registration");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div>
        <h1 className="login"> Verify Your Account </h1>
        <h3> Enter the code here:</h3>
        <ReactCodeInput
          className="digit"
          fields={4}
          onComplete={(digit) => setCode(digit)}
        />
        <button className="confirmBtn" onClick={verify}>
          Confirm
        </button>
      </div>
    </>
  );
};

export default ResetPassword;
