import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {  useParams} from "react-router-dom";
import { storage } from "../firebase";
import { Button, Upload, Form, Select, Input, Avatar, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import "./style.css";
import NavBar from "../NavBar";


const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [url, setUrl] = useState("");

  const [users, setUsers] = useState([]);
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
      // console.log(res.data);
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
          <Avatar size={170} src={user.avatar} shape="circle" />
          <Upload
            onChange={(e) => setAvatar(e.target.files)}
          >
            <Button icon={<UploadOutlined/>} onClick={handleUpload}>Edit avatar</Button>
          </Upload>
        </div>
        {/* <img src={user.avatar}/> */}
        <Input
          placeholder="default size"
          prefix={<UserOutlined />}
          value={user.about}
        />
        <h3>Username: {user.username}</h3>
        <h3> Email: {user.email}</h3>
      </div>
    </div>
  );
};

export default Profile;
