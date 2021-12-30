import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";
import NavBar from "../NavBar";

const Designer = () => {
  const [designer, setDesigner] = useState([]);
  const { id } = useParams();
  ///

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  ///

  useEffect(() => {
    getTheDesignr();
    console.log(designer);
  }, []);

  
  const getTheDesignr = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/designer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setDesigner(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        {designer &&
          designer.length &&
          designer.map((ele) => {
            return (
              <div key={ele._id}>
                <NavBar />
                <div className="designer-header">
                  <img src={ele.photos.map((img) => img.headerBg)} />
                </div>
                <div className="about-designer">
                  <p>{ele.about}</p>
                  <img src={ele.photos.aboutImg} />
                </div>
                <div className="concat-designer">
                  <div>
                      <ul>
                    <li>
                      <button> My Collections</button>
                    </li>
                    <li>
                      <button> My Shows </button>
                    </li>
                    <button> Message Me </button>
                  </ul>
                  </div>
                </div>

                <div className="designer-overview">
                  <div>
                  
                      <img src={ele.imgArr.map((img) => img.img1)} />
                 
                      <img src={ele.imgArr.map((img) => img.img2)} />
                  
                      <img src={ele.imgArr.map((img) => img.img3)} />
                  
                      <img src={ele.imgArr.map((img) => img.img4)} />
                    
                      <img src={ele.imgArr.map((img) => img.img5)} />
                   
                      <img src={ele.imgArr.map((img) => img.img6)} />
                    
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Designer;
