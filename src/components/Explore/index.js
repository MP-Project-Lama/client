import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";
import { storage } from "../firebase";
import Swal from "sweetalert2";

const Explore = () => {
  const [designers, setDesigners] = useState([]);
  const [collections, setCollections] = useState([]);
  const [weddingCollections, setWeddingCollections] = useState([]);
  const [menCollections, setMenCollections] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState([]);
  const [description, setDescription] = useState("");

  //
  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      role: state.Login.role,
    };
  });

  useEffect(() => {
    getTheDesignrs();
    getAllCollections();
    getWeddingCollections();
    getMenCollections();
  }, []);

  const getTheDesignrs = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/designers`);
    setDesigners(res.data);
  };

  ///
  const getAllCollections = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/collections`
    );
    setCollections(res.data);
  };

  // / get the wedding collections
  const getWeddingCollections = async () => {
    const category = "Wedding";
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/collections`,
      {
        category,
      }
    );
    setWeddingCollections(res.data);
  };

  /// get men collections
  const getMenCollections = async () => {
    const category = "Men";
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/collections`,
      {
        category,
      }
    );
    setMenCollections(res.data);
  };
  ////
  const handleChange = (e) => {

    const { target : { value }, } = e;

    // for (let i = 0; i < e.target.files.length; i++) {
    //   const newImg = e.target.files[i];
    //   newImg["id"] = Math.random();
    //   setCollections((prevState) => [...prevState, newImg]);
    }
  
  const handleUpload = (image) => {
    // console.log("image :", image);

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
          setProgress(progress)
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
              console.log(image);
            });
        }
      );
    });
    Promise.all(promises).then(()=> console.log("images have been uploaded")).catch((error)=> console.log(error))
  };

  console.log("image: ", images);
  console.log(state);

  return (
    <>
      <div className="explore">
        <NavBar />
        {state.role.role == "Designer" ? (
          <div>
            <input type="file" multiple onChange={handleChange} />
            <button onClick={handleUpload}> upload </button>
          </div>
        ) : (
          ""
        )}
        hi i'm the Explore
        <div className="collection-section">
          <h3> RunWay</h3>
          {collections.map((coll) => {
            return (
              <div className="collection-crad" key={coll._id}>
                <img
                  src={coll.media.map((look) => look.look1)}
                  alt="collection"
                />
              </div>
            );
          })}
        </div>
        <div className="collBtn">
          <button id="collBtn">Explore Colletions</button>
        </div>
        <div className="designers-section">
          <h3>Our Designers</h3>
          {designers.map((designer) => {
            return (
              <div className="designers-card">
                <img src={designer.photos.map((photo) => photo.headerBg)} />
              </div>
            );
          })}
        </div>
        <div className="wedding-section">
          {weddingCollections.map((coll) => {
            return (
              <div className="wedding-card">
                <img src={coll.media.map((look) => look.look1)} />
              </div>
            );
          })}
        </div>
        <div className="men-section">
          {menCollections.map((coll) => {
            return (
              <div className="men-card">
                <img src={coll.media.map((look) => look.look1)} />
              </div>
            );
          })}
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default Explore;
