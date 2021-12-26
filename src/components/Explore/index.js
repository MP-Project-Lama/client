import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";
const Explore = () => {
  const [designers, setDesigners] = useState([]);
  const [collections, setCollections] = useState([]);
  const [category, setCategory] = useState("");
  const [weddingCollections, setWeddingCollections] = useState([]);
  const [menCollections, setMenCollections] = useState([]);


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
    const category = "Wedding"
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/collections`,{
        category
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

  return (
    <>
      <div className="explore">
        <NavBar />
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
        <div className="wedding-section">
          {menCollections.map((coll) => {
            return (
              <div className="wedding-card">
                <img src={coll.media.map((look) => look.look1)} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};


export default Explore;
