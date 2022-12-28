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
                    <img
                        className="logo-placer"
                        src="https://camo.githubusercontent.com/256384c2b9fe6118cb4287d4423c10c0d92e218e298335e7a7ab3540f8d1c6b1/68747470733a2f2f626c6f676765722e676f6f676c6575736572636f6e74656e742e636f6d2f696d672f622f523239765a32786c2f415676587345694e303450594a6f6e794a3769784c436166795136614d6e4661566f372d51306c696330537a756f65756c4953443542566b33567471794e55344d37797232774b6e794e7532676c67776d36465644686c6d4d4f59747956625074695736504d54653536353150565155706b445256697764384c546f31524d5f5568326377553351582d566b304a5547504146435f5f774846736a725130376b3157577a326656583636683062684f6133453533513632587a4c327a7870674f2f733332302f642532302831292e706e67"
                        alt="empath.ai logo"
                        height="36px"
                        onClick={() => navigate("/")}
                    ></img>
                </div>
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
