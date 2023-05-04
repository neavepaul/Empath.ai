import * as faceapi from "face-api.js";
import React, { useState, useEffect } from "react";

export default function Face() {
    const [currentEmotion, setCurrentEmotion] = useState("here");
    const [emotions, setEmotions] = useState({
        angry: 0,
        disgusted: 0,
        fearful: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        surprised: 0,
    });
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [captureVideo, setCaptureVideo] = useState(false);
    const [error, setError] = useState(false);

    const videoRef = React.useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = React.useRef();

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + "/models";

            Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(setModelsLoaded(true));
        };
        loadModels();
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error("error:", err);
            });
    }, []);

    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
                    videoRef.current
                );
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight,
                };

                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi
                    .detectAllFaces(videoRef.current)
                    .withFaceExpressions();

                const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize
                );
                console.log(resizedDetections);
                const obj = resizedDetections[0]?.expressions;
                if (obj?.neutral) {
                    setEmotions({ ...obj });
                    setCurrentEmotion(
                        Object.keys(obj)[
                            Object.values(obj).indexOf(
                                Math.max(...Object.values(obj))
                            )
                        ]
                    );
                    console.log(obj);
                    setError(false);
                } else {
                    setError(true);
                }
            }
        }, 2000);
    };

    return (
        <>
            <div></div>
            {/* <div>
      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div style={{ display: "none" }}>
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
      {error ? (
        <div className="emotion emotion-header alert">
          <div style={{ "max-width": "40%" }}>
            {true
              ? "Face not detected, ensure you are within range of the camera and not wearing glasses 👓"
              : "Loading..."}
          </div>
        </div>
      ) : (
        <div className="emotion-header">
          <div className="emotion">
            Welcome to <span className="blue-texts">Empath</span>
            {currentEmotion != "here" && (
              <>
                <br />I can see you are
              </>
            )}
            <br />
            <EmotionGraphic currentEmotion={currentEmotion} />
            <p className="blue-text small">
              {currentEmotion === "here"
                ? " Kindly wait, loading the model..."
                : `${currentEmotion} `}
            </p>
          </div>
        </div>
      )}
    </div> */}
        </>
    );
}

function EmotionGraphic({ currentEmotion }) {
    /* return(<><img src={require('../assets/NeutralFace.png')} className="face-img"></img> </>) */
    if (currentEmotion === "neutral") {
        return (
            <>
                <img
                    src={require("../assets/NeutralFace.png")}
                    className="face-img"
                ></img>{" "}
            </>
        );
    } else if (currentEmotion === "angry") {
        return (
            <>
                <img
                    src={require("../assets/AngryFace.png")}
                    className="face-img"
                ></img>{" "}
            </>
        );
    } else if (currentEmotion === "happy") {
        return (
            <>
                <img
                    src={require("../assets/HappyFace.png")}
                    className="face-img"
                ></img>{" "}
            </>
        );
    } else if (currentEmotion === "sad") {
        return (
            <>
                <img
                    src={require("../assets/SadFace.png")}
                    className="face-img"
                ></img>{" "}
            </>
        );
    } else if (currentEmotion === "disgusted") {
        return (
            <>
                <img
                    src={require("../assets/DisgustedFace.png")}
                    className="face-img"
                ></img>{" "}
            </>
        );
    } else if (currentEmotion === "fearful") {
        return (
            <>
                <img
                    src={require("../assets/FearfulFace.png")}
                    className="face-img"
                ></img>{" "}
            </>
        );
    } else if (currentEmotion === "suprised") {
        return (
            <>
                <img
                    src={require("../assets/SurprisedFace.png")}
                    className="face-img"
                ></img>{" "}
            </>
        );
    }
}
