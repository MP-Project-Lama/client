import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useAlert } from "react-alert";
import ReactCodeInput from "react-verification-code-input";

const Verification = () => {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const alert = useAlert();
  const navigate = useNavigate();

  const verify = async () => {
    if (code) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/verify`,
          {
            id,
            code,
          }
        );
        setMessage(" your email successfully confirmed");
        alert.show(message, {
          timeout: 5000,
          type: "success",
        });
        navigate("/registration");
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          setMessage(error.response.data.message);
          alert.show(message, {
            timeout: 5000,
            type: "error",
          });
        }
      }
    } else {
      setMessage(" Please Enter The Full Code");
      alert.show(message, {
        timeout: 5000,
        type: "info",
      });
    }
  };

  return (
    <>
      <div className="resetCom">
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

export default Verification;
