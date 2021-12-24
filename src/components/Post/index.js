import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import NavBar from "../NavBar";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  useEffect(() => {
    getThePost();
  }, []);

  const getThePost = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!state.token ? (
        <div>
          <h2>you have to Registr to be able to go there</h2>
        </div>
      ) : (
        <>
          <NavBar />
          <div className="post-page">
            {post.map((element, i) => {
              return (
                <>
                  <div className="post-container">
                    <h2 key={i}>{element.title}</h2>
                    <h4>{element.createdBy}</h4>
                    <img key={i} src={element.media.map((img) => img.img1)} />
                    <p>{element.desc.map((part) => part.part1)}</p>
                    <img key={i} src={element.media.map((img) => img.img2)} />
                    <p>{element.desc.map((part) => part.part2)}</p>
                    <img key={i} src={element.media.map((img) => img.img3)} />
                    <p>{element.desc.map((part) => part.part3)}</p>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Post;
