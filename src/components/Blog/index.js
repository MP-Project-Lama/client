import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar";
import "./style.css";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
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
        <img src="https://en.vogue.me/wp-content/uploads/2016/12/Fashion.jpg" />
        <h2>Blog</h2>
      </div>

      {state.role.role === "Designer" && (
        <button>
          <Link to="/post"> Add Post </Link>
        </button>
      )}

      {posts.map((post) => {
        return (
          <div className="post" key={post._id}>
            <Link to={`/post/${post._id}`}>
              <ul>
                <li key={post._id}>
                  <img src={post.media[0]} />
                  <h3> {post.title} </h3>
                </li>
                <hr />
              </ul>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
