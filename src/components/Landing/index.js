import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import "./style.css";

const Home = () => {
  return (
    <div>
      <NavBar />

      <div className="home-bg">
        <img
          src="https://www.dior.com/couture/var/dior/storage/images/25778945/17-eng-GB/cdc-femme-gift-for-her6_1440_1200.jpg"
          alt="background"
        />
      </div>

      <div className="about">
        <div className="about-section">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
        </div>
        <div className="about-pic">
          <img
            src="https://www.dior.com/couture/var/dior/storage/images/pushs-editos/folder-cruise-22-women/217c09a2975x1998/28006280-1-eng-GB/217c09a2975x1998_1440_1200.jpg"
            alt="home-img"
          />
        </div>
      </div>

      <div className="concat">
        <hr />
        <h3> Client services</h3>

        <p>
          <Link to="/"> FAQ </Link>
        </p>
        <form className="concat-form">
          <input
            type="text"
            placeholder="Subscribe to our newsletter"
            required
            className="concat-input"
          />
          <input
            type="submit"
            name="subscribe"
            value="SUBSCRIBE"
            className="concat-submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
