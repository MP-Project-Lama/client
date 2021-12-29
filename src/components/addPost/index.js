import React, { useState } from "react";
import { storage } from "../firebase";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
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

  ///
  const state = useSelector((state) => {
    return {
      user: state.Login.user,
      token: state.Login.token,
      role: state.Login.role,
    };
  });

  //////

  /////
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

  /////

  //// create the post
  const addThePost = async () => {
    console.log(firstDesc);
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
        <input
          type="text"
          placeholder="Title"
          required
          className="coll-input"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="first Description ...."
          required
          className="description-input"
          onChange={(e) => setFirstDesc(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="second Description ...."
          required
          className="description-input"
          onChange={(e) => setSecDesc(e.target.value)}
        />
        <textarea
          type="text"
          placeholder=" third Description ...."
          required
          className="description-input"
          onChange={(e) => setFinalDesc(e.target.value)}
        />
        <input id="files" type="file" multiple onChange={handleChange} />
        <button onClick={handleUpload}> Upload Images</button>
        <button onClick={addThePost}> Add Post </button>
      </div>
    </div>
  );
};

export default AddPost;
