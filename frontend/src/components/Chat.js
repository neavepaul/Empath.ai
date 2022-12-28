import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactScrollableFeed from "react-scrollable-feed";

export default function Chat() {
    const navigate = useNavigate();
    const [history, setHistory] = useState([
        { type: "bot", content: "Hi , my name is Empath" },
    ]);

    function sendMessage(content) {
        fetchData(content);
    }

    async function fetchData(content) {
        axios
            .post("http://127.0.0.1:5000/api", { request: content })
            .then((response) => {
                console.log(response.data);
                setHistory(
                    history.concat([
                        { type: "user", content: response.data.input },
                        { type: "bot", content: response.data.response },
                    ])
                );
            });
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage(event.target.value);
            event.target.value = "";
        }
    };

    return (
        <div className="body">
            <nav>
                <div className="logo">
                    Empath.<span className="blue-text">AI</span>
                </div>
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <a href="#home">Home</a>
                    </li>
                </ul>
            </nav>
            <div className="chat-area">
                <ReactScrollableFeed className="scroll-space">
                    {history.map((msg) => {
                        return msg?.type === "user" ? (
                            <div className="user-message message">
                                {msg?.content}
                            </div>
                        ) : (
                            <div className="bot-message message">
                                {msg?.content}
                            </div>
                        );
                    })}
                </ReactScrollableFeed>
            </div>
            <div className="center">
                <input
                    className="chat-box"
                    placeholder="Enter your message"
                    onKeyDown={(e) => handleKeyDown(e)}
                ></input>
            </div>
        </div>
    );
}

// you may have to run this first because the library
// i used for scroll works with a older react
// -> npm config set legacy-peer-deps true
// then npm i as usual
