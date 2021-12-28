import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar";
import ImageUploader from "react-images-upload";
import { storage } from "../firebase";
import "./style.css";
import { Link } from "react-router-dom";

const Explore = () => {
  const [collections, setCollections] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [weddingCollections, setWeddingCollections] = useState([]);
  const [menCollections, setMenCollections] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      role: state.Login.role,
    };
  });

  ///
  useEffect(() => {
    getAllCollections();
    getTheDesignrs();
    getWeddingCollections();
    getMenCollections();
  }, []);

  /// get all the collections
  const getAllCollections = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/collections`
    );
    setCollections(res.data);
  };

  /// get all designers
  const getTheDesignrs = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/designers`);
    setDesigners(res.data);
  };
  /// get Wedding Collections:

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
  //// get men collections
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
  //////
  const onDrop = (file) => {
    setCollections(file);
  };
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

  // const createLook = async ()=> {
  //   try{

  //   }
  // }
  const addCollection = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/collection`, {
        media: urls,
      });
    } catch (error) {
      console.log(error);
    }
    getAllCollections();
  };
  return (
    <>
      <div>
        <NavBar />

        {state.role.role === "Designer" && (
          <div>
            {/* <input type="file" multiple onChange={handleChange} />
            <button onClick={handleUpload}> Upload</button> */}
            <button>
              <Link to="/collection"> Add Collection </Link>
            </button>

            {/* <ImageUploader
              withIcon={false}
              withPreview={true}
              label="Upload imgaes here"
              buttonText="Upload "
              buttonClassName="imagesUploadBtn"
              onChange={onDrop}
              imgExtension={[".jpg"]}
              maxFileSize={5242880}
            /> */}
          </div>
        )}
        <div>
          <div className="collection-section">
            <h3>- Collections - </h3>
            {collections.map((coll) => {
              return (
                <div className="collections-slidshow" key={coll._id}>
                  <img
                    src={
                      coll.media &&
                      coll.media.length &&
                      coll.media.map((look) =>
                        look.look2.map((look) => look.img1)
                      )
                    }
                    alt="collection"
                  />

                  <h4> {coll.createdBy.username}</h4>
                </div>
              );
            })}
          </div>

          <div className="designers-section">
            <h3>- Our Designers - </h3>
            {designers.map((designer) => {
              return (
                <div className="designers-slideshow">
                  <img
                    src={designer.photos.map((img) => img.headerBg)}
                    alt="designer"
                  />
                </div>
              );
            })}
          </div>

          <div className="wedding-section">
            {/*  here  will show the wedding collections */}
          </div>

          <div className="men-section">
            {/*  here  will show the men collections */}
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default Explore;
