import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import Swal from "sweetalert2";

const EditPost = () => {
  const { id } = useParams;
  const [post, setPost] = useState([]);
  const [firstDesc, setFirstDesc] = useState("");
  const [secDesc, setSecDesc] = useState("");
  const [finalDesc, setFinalDesc] = useState("");
  const [title, setTitle] = useState("");
  const [urls, setUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  ////
  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
      role: state.Login.role,
    };
  });

  ///

  useEffect(() => {
    getThePost();
  }, []);

  ///
  const getThePost = async () => {
    try {
      
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  ///

  const editPost = async () => {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/post/${id}`,
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
      title: "Your post has been Edited Successfully ",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/blog");
  };

  ///
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

  return (
    <div>
      {post.map((ele) => {
        return (
          <div>
            <input
              type="text"
              placeholder={ele.title}
              required
              className="coll-input"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="text"
              placeholder={ele.firstDesc}
              required
              className="description-input"
              onChange={(e) => setFirstDesc(e.target.value)}
            />
            <textarea
              type="text"
              placeholder={ele.secDesc}
              required
              className="description-input"
              onChange={(e) => setSecDesc(e.target.value)}
            />
            <textarea
              type="text"
              placeholder={ele.finalDesc}
              required
              className="description-input"
              onChange={(e) => setFinalDesc(e.target.value)}
            />
            <input id="files" type="file" multiple onChange={handleChange} />
            <button onClick={handleUpload}> Upload Images</button>
            <button onClick={editPost}> Add Post </button>
          </div>
        );
      })}
    </div>
  );
};

export default EditPost;
