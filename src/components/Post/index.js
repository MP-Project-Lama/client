import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./style.css";
import NavBar from "../NavBar";
import Swal from "sweetalert2";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
      role: state.Login.role,
    };
  });
  useEffect(() => {
    getThePost();
    getTheComments();
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
  const getTheComments = async () => {
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
  };
  //// to add comment
  const addComment = async () => {
    try {
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

  /// soft delete to the post by creator
  const deleteThePost = async () => {
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
            `${process.env.REACT_APP_BASE_URL}/delete/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
          );
          navigate("/blog");
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

  const deleteComment = async (comID) => {
    try {
      Swal.fire({
        title: " Are You Sure?",
        text: "you'll couldn't reveise your comment again!!",
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
            `${process.env.REACT_APP_BASE_URL}/comment/${comID}`,
            {
              postID: id,
            },
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
          );
          Swal.fire({
            title: "comment Has Been Deleted!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#E07A5F",
          });
          getTheComments();
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
            // console.log(element.media[0]);
            return (
              <>
                <div className="post-page">
                  <div key={i} className="post-container">
                    <h2>{element.title}</h2>
                    <h4 className="byCreator">
                      By:
                      <Link to={`/designer/${element.createdBy._id}`}>
                        {element.createdBy.username.toUpperCase()}
                      </Link>
                    </h4>

                    <img src={element.media[0]} alt="post-img" />
                    <p>{element.desc.map((part) => part.part1)}</p>
                    <img src={element.media[1]} alt="post-img" />
                    <p>{element.desc.map((part) => part.part2)}</p>
                    <img src={element.media[2]} alt="post-img" />
                    <p>{element.desc.map((part) => part.part3)}</p>
                    <h4 className="byCreator">
                      By:
                      <Link to={`/designer/${element.createdBy._id}`}>
                        {element.createdBy.username.toUpperCase()}
                      </Link>
                    </h4>

                    {state.user._id === element.createdBy._id && (
                      <div>
                        <button onClick={deleteThePost} className="delPost">
                          Delete Post
                        </button>
                        <button
                          className="editBtn"
                          onClick={() => {
                            navigate(`/edit/${id}`);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                    <div className="comment-section">
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

                    {comments.map((comment) => {
                      return (
                        <div className="comSec">
                          <ul>
                            <li key={comment._id}>
                              <div className="comment">
                                <img src={comment.createdBy.avatar} />
                                <h4>{comment.createdBy.username} </h4>

                                <p>{comment.comment}</p>
                                {state.user._id === comment.createdBy._id && (
                                  <button
                                    onClick={() => deleteComment(comment._id)}
                                  >
                                    Delete comment
                                  </button>
                                )}
                              </div>
                            </li>
                          </ul>
                        </div>
                      );
                    })}
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
