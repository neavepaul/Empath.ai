import React from "react";

export default function HomeScreen() {
  return (
    <div className="home-screen">
      <nav>
        <div className="logo">
          Empath.<span className="blue-text">AI</span>
        </div>
        <ul className="nav-list">
          <li className="nav-list-item">
            <a href="#">Home</a>
          </li>
          <li className="nav-list-item">
            <a href="#about">
              About <span className="blue-text">Us</span>
            </a>
          </li>
          <li className="nav-list-item">
            <a href="#">
              Our <span className="blue-text">Team</span>
            </a>
          </li>
        </ul>
        <button className="sign-in-btn blue-text">Sign In</button>
      </nav>
      <section className="main-banner">
        <div class="grid">
          <div className="main-header">Hi! My name <br/>is <span className="blue-text">Empath</span>.</div>
          <div>2</div>
          <div className="sub-header">A virtual assistant that <br/> <span className="blue-text">cares</span></div>
        </div>
      </section>
      <div className="about-us" id="about">
        <div className="about-header">About <span className="blue-text">Us</span></div>
        <div className="about-text">Empath AI is an emotionally intelligent virtual assistant. What we wish to bring to users with this project is a virtual assistant that can not only complete tasks and follow instructions, but also act as a virtual companion who can understand and percieve emotions and act accordingly.</div>
        <img src={require('../assets/siri_wave.png')} width="950" height="250" />
      </div>
    </div>
  );
}
