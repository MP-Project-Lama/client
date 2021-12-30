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

  return (
    <>
      <div>
        <NavBar />

        {state.role.role === "Designer" && (
          <div>
            <button>
              <Link to="/collection"> Add Collection </Link>
            </button>
          </div>
        )}
        <div>
          <div className="collection-section">
            <h3>- Collections - </h3>
            {collections.map((coll) => {
              return (
                <div
                  className="collections-slidshow"
                  key={coll._id}
                >
                  <img
                    src={
                      coll.media &&
                      coll.media.length &&
                      coll.media.map((look) => look.look)
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
                <div key={designer._id} className="designers-slideshow">
                  <Link to={`/designer/${designer._id}`}>
                    <img
                      src={designer.photos.map((img) => img.headerBg)}
                      alt="designer"
                    />
                  </Link>
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
