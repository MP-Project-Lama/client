import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";
import NavBar from "../NavBar";

const Designer = () => {
  const [designer, setDesigner] = useState(null);
  const { id } = useParams();

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

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

      console.log("designer", res.data);
      setDesigner(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <NavBar />
        {designer && (
          <div>
            <h4> hello</h4>
            <div key={designer._id}>
              <div className="designer-header">
                <img src={designer.photos.map((img) => img.headerBg)} />
              </div>
              <div className="about-designer">
                <p>{designer.about}</p>
                <img src={designer.photos.aboutImg} />
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
