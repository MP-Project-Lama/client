import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import NavBar from "../NavBar";

let socket;
const CONNECTION_PORT = process.env.REACT_APP_BASE_URL;

function DirectMessage() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  
  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });



  useEffect(() => {
   
    
  }, [])

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessagesList([...messagesList, data]);
    });
  }, [messagesList]);


  const send = () => {
    const messageContent = {
      username: state.user.username,
      content: message,
      room,
    };

    socket.emit("send_message", messageContent);
    setMessagesList([...messagesList, messageContent]);
  };

  const connectRoom = () => {
    if (state.user.username && room) {
      socket.emit("join_room", { username: state.user.username, room });
      setLoggedIn(true);
      setRoom("");
    }
  };

  return (
    <>
      {!loggedIn ? (
        <>
          <NavBar />
          <h3>you have to register to message the designer </h3>
          <button onClick={connectRoom}>click</button>
        </>
      ) : (
        <>
          {messagesList.map((msg) => (
            <div>
              <h3>{msg.username}</h3>
              <p>{msg.content}</p>
            </div>
          ))}

          <input
            type="text"
            placeholder="write your message here..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={send}>Send</button>
        </>
      )}
    </>
  );
}

export default DirectMessage;
