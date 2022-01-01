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
          alt="background img"
        />
      </div>

      <div className="about">
        <div className="about-section">
          <p className="fashiondary">
            <span>FASHIONDARY</span> is an Arabian platform , that gather
            fashion designers in one place , one site and one click ... discover
            the latest fashion trends , and stay tuned for the shows , Our
            mission is to be the global platform for luxury fashion, connecting
            creators, curators and consumers.
          </p>
        </div>
        <div className="about-pic">
          <img
            src="https://www.dior.com/couture/var/dior/storage/images/pushs-editos/folder-cruise-22-women/217c09a2975x1998/28006280-1-eng-GB/217c09a2975x1998_1440_1200.jpg"
            alt="home-img"
          />
        </div>
      </div>
      <div className="about">
        <div className="blogPic">
          <img
            src="https://www.dior.com/couture/var/dior/storage/images/horizon/news-savoir-faire/folder-news-and-events/cruise-2022-womens-campaign/slider-2/6/28406730-3-int-EN/6_1440_1200.jpg"
            alt="home-img"
          />
        </div>
        <div className="about-blog">
          <p className="about-p">
            <span>Our Blog</span> is our magazine , that covers many topics
            including fashion , beauty , cultures , runway , and many fashion
            advices introduction by Our designers for your elegance
          </p>
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
