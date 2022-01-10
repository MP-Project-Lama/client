import React, { useState } from "react";
import { storage } from "../firebase";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button, Upload, Form,  Input } from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const AddPost = () => {
  const [firstDesc, setFirstDesc] = useState("");
  const [secDesc, setSecDesc] = useState("");
  const [finalDesc, setFinalDesc] = useState("");
  const [title, setTitle] = useState("");
  const [urls, setUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
   const fileList = [];

  ///
  const state = useSelector((state) => {
    return {
      user: state.Login.user,
      token: state.Login.token,
      role: state.Login.role,
    };
  });



  /////
  const handleChange = (e) => {
    console.log(e.fileList, "<----");
    for (let i = 0; i < e.fileList.length; i++) {
      const newImg = e.fileList[i];
      newImg["id"] = Math.random();
      setImages((prevState) => [...prevState, newImg]);
    }
  };

  const handleUpload = (image) => {
    // console.log(images);
    const promises = [];
    images.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
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
        async () => {
          await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
              console.log("image:===", image);
              console.log("urls:===", urls);
            })
            .catch((err) => {
              console.log("err firebase upload", err);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => console.log("images have been uploaded"))
      .catch((error) => console.log("firebase promise error", error));
  };

  /////

  //// create the post
  const addThePost = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/post`,
        {
          title,
          desc: [{ part1: firstDesc, part2: secDesc, part3: finalDesc }],
          media: urls,
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
        title: "Your post has been added ",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("collection has been added");
      navigate("/blog");
    } catch (error) {
      console.log(error);
    }
  };
 

  return (
    <div>
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
            label="Title"
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="introduction">
            <Input.TextArea onChange={(e) => setFirstDesc(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea onChange={(e) => setSecDesc(e.target.value)} />
          </Form.Item>
          <Form.Item label="final">
            <Input.TextArea onChange={(e) => setFinalDesc(e.target.value)} />
          </Form.Item>

          <Form.Item label="Button">
            <Upload
              multiple
              listType="picture"
              className="upload-list-inline"
              defaultFileList={[...fileList]}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>Upload files</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Button">
            <Button onClick={handleUpload}>Set files</Button>
          </Form.Item>
          <Form.Item label="Button">
            <Button type="primary" onClick={addThePost}>
              Add Post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddPost;
