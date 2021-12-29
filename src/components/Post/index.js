import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import NavBar from "../NavBar";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
   const [comment, setComment] = useState([]);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
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
  
/// to display all post's comments
  const getTheComments = async ()=> {
    try {
      const comments = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setComments(comments.data);
     
    } catch (error) {
      console.log(error);
    }
  }
//// to add comment 
 const addComment = async () => {
   try{
await axios.post(
     `${process.env.REACT_APP_BASE_URL}/comment`,
     {
       comment,
       postID: id,
     },
     {
       headers: {
         Authorization: `Bearer ${state.token}`,
       },
     }
   );
   getTheComments();
   } catch (error) {
     console.log(error);
   }
   
 };
  return (
    <>
      {!state.token ? (
        <div>
          <h2>
            <Link to="/registration">
              you have to Registr to be able to go there
            </Link>
          </h2>
        </div>
      ) : (
        <>
          <NavBar />

          {post.map((element, i) => {
            return (
              <>
                <div className="post-page">
                  <div key={element._id} className="post-container">
                    <h2>{element.title}</h2>

                    
                    <img src={element.media.map((img) => img)} alt="post-img" />
                    <p>{element.desc.map((part) => part.part1)}</p>
                    <img src={element.media.map((img) => img)} alt="post-img" />
                    <p>{element.desc.map((part) => part.part2)}</p>
                    <img
                      src={element.media.map((img) => img.img3)}
                      alt="post-img"
                    />
                    <p>{element.desc.map((part) => part.part3)}</p>
                    {/* {state.user._id === post.createdBy._id && (
                      <div> 
                        <button>Delete post </button>
                      </div>
                    )} */}

                    <textArea
                      onChange={(e) => setComment(e.target.value)}
                      className="comment-area"
                    >
                      Share us your comment ...
                    </textArea>
                   
                    <button id="add" onClick={() => addComment()}>
                      Add
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default Post;
