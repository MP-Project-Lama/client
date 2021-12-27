import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from '../NavBar'

const designerDashboard = () => {
    const 
    const state = useSelector((state) => {
      return {
        token: state.Login.token,
      };
    });




    return (
      <>
        {!state.token ? (
          <div>
            <h3>
              You have to <Link to="/registration"> Login </Link>
            </h3>
          </div>
        ) : (
          <div>
            <div>
              <form>
                <input />
              </form>
            </div>
          </div>
        )}
      </>
    );
}

export default designerDashboard
