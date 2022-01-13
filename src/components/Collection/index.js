import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar";
import {  useParams, useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "./style.css";
import Swal from "sweetalert2";

const Collection = () => {
  const [collection, setCollection] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();


  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
      role: state.Login.role,
    };
  });

  ////
  useEffect(() => {
    getTheCollection();
  }, []);

 
  //// get the collection
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

/// remove collection
  const moveCollectionToTrash = async () => {
    try {
      Swal.fire({
        title: " Are You Sure?",
        text: "you'll couldn't reveise your post again!!",
        icon: "warning",
        iconColor: "#D11A2A",
        showCancelButton: true,
        confirmButtonText: "Delete!",
        confirmButtonColor: "#D11A2A",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.put(
            `${process.env.REACT_APP_BASE_URL}/del/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
          );
          navigate("/explore");
          Swal.fire({
            title: "Post Has Been Deleted!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#E07A5F",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#E07A5F",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!state.token ? (
        <div>
          <h2> you have to Registr</h2>
        </div>
      ) : (
        <div>
          <NavBar />
          {collection.map((ele) => {
            return (
              <div>
                <div className="collection-header">
                  <h2> {ele.title}</h2>
                  <p> {ele.desc}</p>
                </div>

                <div className="slideshow">
                  <Splide
                    options={{
                      rewind: true,
                      width: "100vw",
                      height: "50vh",
                      perPage: 3,
                      autoplay: true,
                    }}
                  >
                    {ele.media.map((looks) => {
                      return (
                        <div classNam="slides">
                          <SplideSlide>
                            <img src={looks.look} alt="models" />
                            <img src={looks.look[1]} alt="models" />
                            <img src={looks.look[2]} alt="models" />
                          </SplideSlide>
                          {/* <img src={looks.look} alt="models" />
                        <img src={looks.look[1]} alt="models" />
                        <img src={looks.look[2]} alt="models" /> */}
                        </div>
                      );
                    })}
                  </Splide>
                </div>
                <div className="msg">
                  <button
                    className="msgBtn"
                    onClick={() => {
                      navigate(`/coll/edit/${id}`);
                    }}
                  >
                    Message the Designer
                  </button>
                </div>
                {state.user._id === ele.createdBy._id && (
                  <div className="coll-control">
                    <button
                      className="editBtn"
                      onClick={() => {
                        navigate(`/coll/edit/${id}`);
                      }}
                    >
                      Edit
                    </button>

                    <button onClick={moveCollectionToTrash} className="delPost">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      ;
    </div>
  );
};

export default Collection;
