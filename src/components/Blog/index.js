import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar";
import "./style.css";
import { Link , useNavigate } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const navigate =  useNavigate();
  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      role: state.Login.role,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getThePosts();
  }, []);

  /// get the posts
  const getThePosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/blog`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="blog-container">
      <NavBar />
      <div className="blog-header">
        <div className="header-img">
          <img src="https://en.vogue.me/wp-content/uploads/2016/12/Fashion.jpg" />
        </div>
        <div className="heaer-blog">
          <h2>- Blog - </h2>
        </div>
      </div>
      {state.role.role === "Designer" && (
        <button onClick={()=> navigate("/post")} className="addPost">
          Add Post 
        </button>
      )}

      {posts.map((post) => {
        return (
          <div className="post" key={post._id}>
            <ul>
              <Link to={`/post/${post._id}`}>
                <li key={post._id}>
                  <img src={post.media[0]} />
                  <h3> {post.title} </h3>
                  <div>
                    <h4 className="creator">
                      <span> By:</span>
                      <Link to={`/designer/${post.createdBy._id}`}>
                        {post.createdBy.username}
                      </Link>
                    </h4>
                  </div>
                </li>
              </Link>
              <hr />
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
