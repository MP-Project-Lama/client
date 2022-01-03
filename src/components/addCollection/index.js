import React, { useState } from "react";
import { storage } from "../firebase";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import { Button, Upload, Form, Select, Input } from "antd";
import "antd/dist/antd.css";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;


const AddCollection = () => {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [material, setMaterial] = useState("");
  const [category, setCategory] = useState("");
  const [urls, setUrls] = useState([]);
  const [looks, setLooks] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  const state = useSelector((state) => {
    return {
      user: state.Login.user,
      token: state.Login.token,
      role: state.Login.role,
    };
  });
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImg = e.target.files[i];
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
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => console.log("images have been uploaded"))
      .catch((error) => console.log(error));
  };
  ////
  const createLook = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/look`,
        {
          look: urls,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setLooks((prevState) => [...prevState, res.data]);
      setUrls([]);
      setImages([]);

      const files = document.getElementById("files");
      files.value = [];
      console.log("look has been added", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCollection = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/collection`,
        {
          title,
          desc,
          material,
          category,
          media: looks,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      console.log("collection has been added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {state.role.role === "Designer" && (
        <div>
          <div className="coll-inputs">
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

              <Form.Item label="Description">
                <Input.TextArea onChange={(e) => setDesc(e.target.value)} />
              </Form.Item>
              <Form.Item
                label="Category"
                name="Category"
                onChange={(e) => setCategory(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please Enter The Category!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Material"
                name="Material"
                onChange={(e) => setMaterial(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please Enter The Material!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Button">
                <Upload
                  multiple
                  listType="picture"
                  className="upload-list-inline"
                >
                  <Button onClick={handleChange} icon={<UploadOutlined />}>
                    Upload files
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Button">
                <Button type="dashed" onClick={handleUpload}>
                  Upload files
                </Button>
              </Form.Item>

              <Form.Item label="Button">
                <Button onClick={createLook}>Add look</Button>
              </Form.Item>

              <Form.Item label="Button">
                <Button type="primary" onClick={addCollection}>
                  Add collection
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* <input id="files" type="file" multiple onChange={handleChange} /> */}

          {/* <button onClick={createLook}> Add look </button> */}

          {/* <button onClick={handleUpload}> Upload files</button> */}
        </div>
      )}
    </div>
  );
};

export default AddCollection;
