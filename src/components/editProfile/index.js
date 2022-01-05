import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { Button, Upload, Form, Input } from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const EditProfile = () => {
  const { id } = useParams;
  const [user, setUser] = useState([]);
  const [about, setAbout] = useState("");
const [progress, setProgress] = useState(0);
  const [img, setImg] = useState([]);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const fileList= []; 


  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });
  const [profile, setProfile] = useState({
    _id: id,
    about: state.user.about,
    avatar: state.user.avatar,
  });

  useEffect(() => {
    getTheUser();
  }, []);

  const getTheUser = async () => {
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

  const editProfile = async () => {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/user/${id}`,
      {
        avatar: url.length > 0 ? url : user.avatar,
        about: about.length > 0 ? about : user.about,
      },
      {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }
    );
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your info has been updated Successfully ",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };


    const handleChange = (e) => {
      if (e.fileList[0]) {
        setImg(e.fileList[0]);
      }
    };

    const handleUpload = () => {
      const uploadTask = storage.ref(`images/${img.name}`).put(img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(img.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              console.log( "url ===",url);
               console.log("img ===", img);
            });
        }
      );
    };


  
  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item
          label="About You:"
          name="about"
          onChange={(e) => setAbout(e.target.value)}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Change Your Avater " name="Button">
          <Upload
            listType="picture"
            className="upload-list-inline"
            defaultFileList={[...fileList]}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
        </Form.Item>

        <Form.Item name="Button">
          <Button type="primary" onClick={handleUpload}>
            upload
          </Button>
        </Form.Item>
        <Form.Item name="Button">
          <Button type="primary" onClick={editProfile}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
