import React, { useState } from "react";
import { storage } from "../firebase";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";

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
console.log(state);
  const handleChange = (e) => {
    // console.log(e);
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
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/look`, {
        look: urls,
      });
      setLooks((prevState) => [...prevState, res.data]);
      console.log("look has been added", res.data);
     
    } catch (error) {
      console.log(error);
    }
  };

  const addCollection = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/collection`, {
        title,
        desc,
        material,
        category,
        media: looks,
        // craetedBy : state.token
      });
      console.log("collection has been added " );

    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {state.role.role === "Designer" && (
        <div>
          <div className="coll-inputs">
            <input
              type="text"
              placeholder="Title"
              required
              className="coll-input"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Description ...."
              required
              className="description-input"
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category .."
              required
              className="coll-input"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Material .."
              required
              className="coll-input"
              onChange={(e) => setMaterial(e.target.value)}
            />
          </div>
          <input type="file" multiple onChange={handleChange} />
          <button onClick={handleUpload}> Upload</button>
          <button onClick={createLook}> Add look </button>
          <div>
            <button onClick={addCollection}>Add Collection</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCollection;
