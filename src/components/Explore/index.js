import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar';
import axios from 'axios';
const Explore = () => {
  const [users , setUsers] = useState([]);
  const [collections, setCollections] = useState([]);



useEffect(()=> {
getAllUsers();
getAllCollections();
},[])


   const getAllUsers = async () => {
     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
     setUsers(res.data);
   };

   ///
   const getAllCollections = async () => {
     const res = await axios.get(
       `${process.env.REACT_APP_BASE_URL}/collections`
     );
     setCollections(res.data);
   };


    return (
      <div>
        <NavBar />
        hi i'm the Explore
        {users.map((designer)=> {
          return (
            <>
              <div className="collection-section">
                <div key={designer._id}></div>
              </div>
              <div className="designers-section">
                <img src={designer.photos.map((pic) => pic.headerBg)} />
              </div>
              <div className="category-section">
                {collections.map((coll)=> {
                  return (
                    <>
                      <img src={designer} />
                    </>
                  );
                })}
              
              </div>
              <div className="runway-section"></div>
              <div className="material-section"></div>
            </>
          );
        })}
       
        
          
        
        
      </div>
    );
}

export default Explore;
