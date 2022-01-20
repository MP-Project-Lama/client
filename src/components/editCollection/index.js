import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import "antd/dist/antd.css";
import Swal from "sweetalert2";

const EditCollection = () => {
  const [collection, setCollection] = useState([]);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [material, setMaterial] = useState("");
  const [category, setCategory] = useState("");
  const [urls, setUrls] = useState([]);
  const [looks, setLooks] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const { id } = useParams();
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
    getTheCollection();
  }, []);

  ///getTheCollection
  const getTheCollection = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/collection/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setCollection(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /// editTheCollection
  const editTheCollection = async () => {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/collection/${id}`,
      {
        title : title.length > 0? title : collection.title,
        desc : desc.length > 0 ? desc : collection.desc,
        media: looks.length > 0 ? looks : collection.media,
        material : material.length > 0 ? material : collection.material,
        category : category.length > 0 ? category : collection.category,
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
      title: "Your collection has been Edited Successfully ",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/collections");
  };
  /// handleChange
  const handleChange = (e) => {
    for (let i = 0; i < e.fileList.length; i++) {
      const newImg = e.fileList[i];
      newImg["id"] = Math.random();
      setImages((prevState) => [...prevState, newImg]);
    }
  };
  //handleUpload
  const handleUpload = (image) => {
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

  /// edit look
  const editLook = async () => {
    handleUpload();
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/look/${id}`,
      {
        looks: urls,
      },
      {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }
    );
    setLooks(urls);
  };

  return (
    <div>
      {collection.length &&
        collection.map((looks) => {
          return (
            <div className="postForm">
              <input
                className="postTitle"
                type="text"
                placeholder={looks.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="textareaDiv">
                <textArea
                  className="postInput"
                  type="text"
                  onChange={(e) => setDesc(e.target.value)}
                >
                
                  {looks.desc}
                </textArea>
              </div>
              <input
                className="postTitle"
                type="text"
                placeholder={looks.material}
                onChange={(e) => setMaterial(e.target.value)}
              />
              <input
                className="postTitle"
                type="text"
                placeholder={looks.category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div className="uploadBtns">
                <input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleChange}
                />

                <button onClick={handleUpload} className="submitPost">
                  Upload files
                </button>
                <button onClick={editLook} className="submitPost">
                  Add look
                </button>
              </div>
              <input
                type="submit"
                value="Add Collection"
                onClick={editTheCollection}
                className="AddColl"
              />
            </div>
          );
        })}
    </div>
  );
};

export default EditCollection;
