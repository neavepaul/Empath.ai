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
                        <img
                            className="logo-placer"
                            src="https://camo.githubusercontent.com/256384c2b9fe6118cb4287d4423c10c0d92e218e298335e7a7ab3540f8d1c6b1/68747470733a2f2f626c6f676765722e676f6f676c6575736572636f6e74656e742e636f6d2f696d672f622f523239765a32786c2f415676587345694e303450594a6f6e794a3769784c436166795136614d6e4661566f372d51306c696330537a756f65756c4953443542566b33567471794e55344d37797232774b6e794e7532676c67776d36465644686c6d4d4f59747956625074695736504d54653536353150565155706b445256697764384c546f31524d5f5568326377553351582d566b304a5547504146435f5f774846736a725130376b3157577a326656583636683062684f6133453533513632587a4c327a7870674f2f733332302f642532302831292e706e67"
                            alt="empath.ai logo"
                            height="36px"
                            onClick={() => navigate("/")}
                        ></img>
                        {/* Empath.<span className="blue-text">AI</span> */}
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
                        <li className="nav-list-item">
                            <a href="/chat">
                                Empath <span className="blue-text">Chat</span>
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
                        Empath AI is an emotionally intelligent virtual
                        assistant. What we wish to bring to users with this
                        project is a virtual assistant that can not only
                        complete tasks and follow instructions, but also act as
                        a virtual companion who can understand and percieve
                        emotions and act accordingly.
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
                            <a
                                href="https://www.linkedin.com/in/neavepaul/"
                                target="_blank"
                            >
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
                            <a
                                href="https://www.linkedin.com/in/afieif/"
                                target="_blank"
                            >
                                <img
                                    src={require("../assets/afif.jpeg")}
                                    class="cardImg"
                                />
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
                                <img
                                    src={require("../assets/chinmay.jpeg")}
                                    class="cardImg"
                                />
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
