import React, { useState } from "react";
import { storage } from "../firebase";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";

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


  /// handlechange function
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImg = e.target.files[i];
      newImg["id"] = Math.random();
      setImages((prevState) => [...prevState, newImg]);
    }
  };
  /// handleupload function
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


  /// create a look
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

  /// create collection
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
          <div className="postForm">
            <input
              className="postTitle"
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="textareaDiv">
              <textarea
                className="postInput"
                type="text"
                placeholder="Enter the description here ..."
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <input
              className="postTitle"
              type="text"
              placeholder="Material"
              onChange={(e) => setMaterial(e.target.value)}
            />
            <input
              className="postTitle"
              type="text"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className="uploadBtns">
              <input id="files" type="file" multiple onChange={handleChange} />

              <button onClick={handleUpload} className="submitPost">
                Upload files
              </button>
              <button onClick={createLook} className="submitPost">
                Add look
              </button>
            </div>
            <input
              type="submit"
              value="Add Collection"
              onClick={addCollection}
              className="AddColl"
            />
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
