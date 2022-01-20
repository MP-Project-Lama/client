import React, { useState } from "react";
import { storage } from "../firebase";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { GoCloudUpload } from "react-icons/go";

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
    for (let i = 0; i < e.target.files.length; i++) {
      const newImg = e.target.files[i];
      newImg["id"] = Math.random();
      setImages((prevState) => [...prevState, newImg]);
    }
  };

  /// create the post
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

  /// handleUpload
  const handleUpload = () => {
    console.log("images", images);
    const promises = [];
    const urlsImgs = [];
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
              urlsImgs.push(urls);
              setUrls((prevState) => [...prevState, urls]);
              console.log("image:===", image);
              console.log("urls:===", urls);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        console.log("urls", urls);
        console.log("images have been uploaded");
      })
      .catch((error) => console.log(error));
  };

  return (
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
            placeholder="Enter the intro here ..."
            onChange={(e) => setFirstDesc(e.target.value)}
          />
        </div>
        <div className="textareaDiv">
          <textarea
            className="postInput"
            type="text"
            placeholder="Enter the subject here ..."
            onChange={(e) => setSecDesc(e.target.value)}
          />
        </div>
        <div className="textareaDiv">
          <textarea
            className="postInput"
            type="text"
            placeholder="Enter the last part here ..."
            onChange={(e) => setFinalDesc(e.target.value)}
          />
        </div>
        <div className="uploadBtns">
          <input
            className="choosefile"
            type="file"
            multiple
            onChange={handleChange}
          />
          <input
            type="submit"
            value="add files"
            onClick={handleUpload}
            className="submitPost"
          />
        </div>
        <input
          type="submit"
          value="Add Post"
          onClick={addThePost}
          className="AddColl"
        />
      </div>
    </div>
  );
};

export default AddPost;
