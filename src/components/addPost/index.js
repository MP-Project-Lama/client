import React, { useState } from "react";
import { storage } from "../firebase";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import { Button, Upload, Form, Input } from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddPost = () => {
  const [firstDesc, setFirstDesc] = useState("");
  const [secDesc, setSecDesc] = useState("");
  const [finalDesc, setFinalDesc] = useState("");
  const [title, setTitle] = useState("");
  const [urls, setUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  
  const state = useSelector((state) => {
    return {
      user: state.Login.user,
      token: state.Login.token,
      role: state.Login.role,
    };
  });

  /// handleChange function
  const handleChange = (e) => {
    for (let i = 0; i < e.target.file[0]; i++) {
      const newImg = e.file[i];
      newImg["id"] = Math.random();
      setImages((prevState) => [...prevState, newImg]);
    }
  };

  /// create the post
  const addThePost = async (imgs) => {
    try {
      console.log("imgs", imgs);
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

  /// handleUpload
  const handleUpload = () => {
    // console.log(images);
    const promises = [];
    const imgUrls = [];
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
          try {
            const resultUrls = await storage
              .ref("images")
              .child(image.name)
              .getDownloadURL();

            imgUrls.push(resultUrls);
          } catch (error) {
            console.log("handleUpload error", error);
          }
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        console.log("imgUrls >>>>>>>>>", imgUrls);
        console.log("images have been uploaded");
        addThePost(imgUrls);
      })
      .catch((error) => console.log("firebase promise error", error));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {console.log(title)}
        <input
          type="text"
          placeholder="first"
          onChange={(e) => setFirstDesc(e.target.value)}
        />
        {console.log(firstDesc)}
        <input
          type="text"
          placeholder="second"
          onChange={(e) => setSecDesc(e.target.value)}
        />
        {console.log(secDesc)}
        <input
          type="text"
          placeholder="third"
          onChange={(e) => setFinalDesc(e.target.value)}
        />
        {console.log(finalDesc)}
        <input type="file" multiple onChange={(e) => handleChange(e)} />
        <input type="submit" value="add files" onChange={handleUpload} />

        <input type="submit" onChange={addThePost} />

        {/* <Form
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
              onChange={(e) => handleChange(e)}
            >
              <Button icon={<UploadOutlined />}>Upload files</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Button">
            <Button type="primary" onClick={handleUpload}>
              Add Post
            </Button>
          </Form.Item>
        </Form> */}
      </div>
    </div>
  );
};

export default AddPost;
