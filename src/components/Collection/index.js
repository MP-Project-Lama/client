import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar";
import ImageUploader from "react-images-upload";
import { storage } from "../firebase";
import { Link, useParams , useNavigate} from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";

const Collection = () => {
  const [collection, setCollection] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  ///
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

  ////
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

  ///

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
    }else if (result.dismiss === Swal.DismissReason.cancel) {
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
  }
  
 
  ////

  return (
    <div>
      {!state.token ? (
        <div>
          <h2> you have to Registr</h2>
        </div>
      ) : (
        <div>
          <NavBar />
          {collection.map((ele)=> {
            return (
              <div>
                <div>
                  <h2> {ele.title}</h2>
                  <p> {ele.desc}</p>
                </div>
                {/* {console.log(ele.createdBy._id)}
                {console.log(state.user._id)} */}

                <div className="slideshow">
                  {ele.media.map((looks) => {
                    // {console.log(looks);}
                    return (
                      <div>
                        <img src={looks.look} />
                        {console.log(looks.look)}
                        <img src={looks.look[1]} />
                        <img src={looks.look[2]} />
                      </div>
                    );
                  })}
                </div>
                {state.user._id === ele.createdBy._id && (
                  <div className="coll-control">
                    <button className="editBtn">Edit</button>
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
  );}

export default Collection;
