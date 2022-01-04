import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {  useParams , useNavigate} from "react-router-dom";
import { storage } from "../firebase";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { signOut } from "../../reducers/Login";
import "./style.css";
import NavBar from "../NavBar";


const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [url, setUrl] = useState("");
  const [users, setUsers] = useState([]);
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
  }, [])
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
const handleUpload = (image) => {
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
          // console.log(url);
        });
    }
  );
};



  return (
    <div>
      <NavBar />
      <div className="profile">
        <div>
          <img src={user.avatar} alt="profile-pic" />
          {/* <Upload onChange={(e) => setAvatar(e.target.files)}>
            <Button icon={<UploadOutlined />} onClick={handleUpload}>
              Edit avatar
            </Button>
          </Upload> */}
        </div>
        {/* <img src={user.avatar}/> */}

        <h3>Username: {user.username}</h3>
        <h3> Email: {user.email}</h3>
        <button> Edit Profile </button>
        <button> Reset Password </button>
        <button onClick={logout}> Logout </button>
      </div>
    </div>
  );
};

export default Profile;
