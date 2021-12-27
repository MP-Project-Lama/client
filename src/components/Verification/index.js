import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import ReactCodeInput from "react-verification-code-input";
import "./style.css";

const Verification = () => {
  const [code, setCode] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
 
   

  const verify = async () => {
    if (code) 
   
    {
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
          password
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
          <h1 className="login"> Verify Your Account  </h1>
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
}

export default Verification
