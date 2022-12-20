import React from "react";
import { useNavigate } from "react-router-dom";
import Halo from "./Halo";

export default function HomeScreen() {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-screen">
        <nav>
          <div className="logo">
            Empath.<span className="blue-text">AI</span>
          </div>
          <ul className="nav-list">
            <li className="nav-list-item">
              <a href="#home">Home</a>
            </li>
            <li className="nav-list-item">
              <a href="#about">
                About <span className="blue-text">Us</span>
              </a>
            </li>
            <li className="nav-list-item">
              <a href="#team">
                Our <span className="blue-text">Team</span>
              </a>
            </li>
          </ul>
          <button
            className="sign-in-btn blue-text"
            onClick={() => navigate("/face")}
          >
            Try it
          </button>
        </nav>
        <section className="main-banner">
          <div class="grid">
            <Halo />
            <div className="flex-stuff">
              <div className="main-header">
                Hi! My name <br />
                is <span className="blue-text">Empath</span>.
              </div>

              <div className="sub-header">
                A virtual assistant that <br />{" "}
                <span className="blue-text">cares</span>
              </div>
            </div>
            {/* <div className="sub-headerbr"></div> */}
          </div>
        </section>
        <div className="about-us" id="about">
          <div className="about-header">
            About <span className="blue-text">Us</span>
          </div>
          <div className="about-text">
            Empath AI is an emotionally intelligent virtual assistant. What we
            wish to bring to users with this project is a virtual assistant that
            can not only complete tasks and follow instructions, but also act as
            a virtual companion who can understand and percieve emotions and act
            accordingly.
          </div>
          <img
            src={require("../assets/siri_wave.png")}
            width="950"
            height="250"
            alt="graphic"
          />
        </div>
        <div className="about-us our-team" id="team">
          <div className="about-header">
            Our <span className="blue-text">Team</span>
          </div>
          <section class="cards">
            <article class="card">
              <a
                href="https://www.linkedin.com/in/KyleDsouza02/"
                target="_blank"
              >
                <img
                  src={require("../assets/kyle.jpeg")}
                  class="cardImg"
                  alt="Vice-Chairperson"
                />
              </a>
              <h5>
                Kyle <span className="blue-text">Dsouza</span>
              </h5>
            </article>
            <article class="card">
              <a href="https://www.linkedin.com/in/neavepaul/" target="_blank">
                <img
                  src={require("../assets/neave1.jpeg")}
                  class="cardImg"
                  alt="Supreme-Leader"
                />
              </a>
              <h5>
                Neave <span className="blue-text">Paul</span>
              </h5>
            </article>
            <article class="card">
              <a href="https://www.linkedin.com/in/afieif/" target="_blank">
                <img src={require("../assets/afif.jpeg")} class="cardImg" />
              </a>
              <h5>
                Afif <span className="blue-text">Deshmukh</span>
              </h5>
            </article>
            <article class="card">
              <a
                href="https://www.linkedin.com/in/chinmay-kadam-729990213"
                target="_blank"
              >
                <img src={require("../assets/chinmay.jpeg")} class="cardImg" />
              </a>
              <h5>
                Chinmay <span className="blue-text">Kadam</span>
              </h5>
            </article>
          </section>
        </div>
      </div>
    </>
  );
}
