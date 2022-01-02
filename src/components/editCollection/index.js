import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../firebase";
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
  ///
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

  const editTheCollection = async () => {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/collection/${id}`,
      {
        title,
        desc,
        media: looks,
        material,
        category,
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
  ////////

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImg = e.target.files[i];
      newImg["id"] = Math.random();
      setImages((prevState) => [...prevState, newImg]);
    }
  };
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

  /// 
  const editLook = async ()=> {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/look/${id}`,{
        looks : urls
      }, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      setLooks(urls)
  }

  return (
    <div>
      {collection.length &&
        collection.map((looks) => {
          return (
            <div>
              <input
                type="text"
                defaultValue={looks.title}
                required
                className="coll-input"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                type="text"
                defaultValue={looks.desc}
                required
                className="description-input"
                onChange={(e) => setDesc(e.target.value)}
              />

              <input
                type="text"
                defaultValue={looks.material}
                required
                className="coll-input"
                onChange={(e) => setMaterial(e.target.value)}
              />
              <input
                type="text"
                defaultValue={looks.category}
                required
                className="coll-input"
                onChange={(e) => setCategory(e.target.value)}
              />

              <input id="files" type="file" multiple onChange={handleChange} />
              <button onClick={handleUpload}> Upload Images</button>
              <button onClick={editTheCollection}> Add Collection </button>
            </div>
          );
        })}
    </div>
  );
};

export default EditCollection;
