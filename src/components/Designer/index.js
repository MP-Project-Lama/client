import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams  , useNavigate} from "react-router-dom";
import "./style.css";
import NavBar from "../NavBar";

const Designer = () => {
  const [designer, setDesigner] = useState(null);
  const [collection, setCollection] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  useEffect(() => {
    getTheDesignr();
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

      console.log("designer", res.data);
      setDesigner(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  ///

  const getAllCollections = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/collections`
    );
    res.data.find((ele) => {
      if (ele.createdBy._id ===  designer._id) {
       
       setCollection(ele.data)
       
      }
     
    });
    console.log(collection);
    
  };


  return (
    <>
      <div className="desPage">
        <NavBar />
        {designer && (
          <div>
            <div key={designer._id}>
              <div className="designer-header">
                <img src={designer.photos.map((img) => img.headerBg)} />
                <h1> {designer.username.toUpperCase()}</h1>
              </div>
              <div className="about-designer">
                <div className="about-img">
                  <img src={designer.photos.map((img) => img.aboutImg)} />
                </div>
                <div className="about-p">
                  <p>{designer.about}</p>
                </div>
              </div>

              <div className="concat-designer">
                <div>
                  <img src={designer.photos.map((img) => img.concatBg)} />
                  <div className="concatBtns">
                    <ul>
                      <li>
                        <button onClick={getAllCollections}> My Collections</button>
                      </li>

                      <li>
                        <button> My Shows </button>
                      </li>
                      <button onClick={()=> navigate("/directmessage")}>
                       
                        Message Me
                      </button>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="designer-overview">
                <div>
                  {designer.photos.map((ele) => {
                    return (
                      <div className="designerImgs">
                        {ele.imgArr.map((img) => {
                          return (
                            <div className="designerImgs">
                              <img src={img.img1} />
                              <img src={img.img2} /> <img src={img.img3} />
                              <img src={img.img4} /> <img src={img.img5} />
                              <img src={img.img6} />
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  {/* {designer.photos.imgArr.map((img) => (
                    <img src={img} />
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Designer;
