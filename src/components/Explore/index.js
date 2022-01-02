import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar";
import "./style.css";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const Explore = () => {
  const [collections, setCollections] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [result, setResult] = useState([]);

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
    let collectionsArr = [];
    res.data.map((ele) => {
      if (ele.category !== "Men") {
        if (ele.category !== "Weddings") {
          collectionsArr.push(ele);
        }
      }
    });
    setCollections(collectionsArr);
  };

  /// get all designers
  const getTheDesignrs = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/designers`);
    setDesigners(res.data);

  };
  /// get Wedding Collections:

  const getWeddingCollections = async () => {
    const category = "Weddings";
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

        <div className="headerVideo">
          <video controls autoPlay loop aria-hidden="true" muted name="media">
            <source
              src="https://lv-vod.fl.freecaster.net/vod/louisvuitton/gJjgomc5Ra_HD.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        {state.role.role === "Designer" && (
          <div>
            <button className="addPost">
              <Link to="/collection"> Add Collection </Link>
            </button>
          </div>
        )}
        <div>
          <div className="collection-section">
            <h3>- Collections - </h3>
            <div className="collections">
              {collections.map((coll) => {
                return (
                  <div className="collections-slidshow" key={coll._id}>
                    <Link to={`/collection/${coll._id}`}>
                      <Splide
                        options={{
                          rewind: true,
                          width: 800,
                          gap: "1rem",
                        }}
                      >
                        <SplideSlide>
                          <img
                            src={
                              coll.media &&
                              coll.media.length &&
                              coll.media.map((look) => look.look)
                            }
                            alt="collection"
                          />
                        </SplideSlide>
                      </Splide>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="designers-section">
            <h3>- Our Designers - </h3>
            {designers.map((designer) => {
              return (
                <div key={designer._id} className="designers-slideshow">
                  <Link to={`/designer/${designer._id}`}>
                    <img
                      src={designer.photos.map((img) => img.headerBg)}
                      alt="designer photo"
                    />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="wedding-section">
            <h3>- Weddings - </h3>
            {weddingCollections.map((collection) => {
              return (
                <div className="weddings">
                  <img src={collection.media.map((look) => look.look)} />
                </div>
              );
            })}
          </div>

          <div className="men-section">
            {/*  here  will show the men collections */}
            <h3>- Men Collections - </h3>
            {menCollections.map((collection) => {
              return (
                <div className="weddings">
                  <img src={collection.media.map((look) => look.look)} />
                  {/* {console.log(collection.media.map((look) => look.look))} */}
                </div>
              );
            })}
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default Explore;
