import * as faceapi from "face-api.js";
import React, { useState, useEffect } from "react";

export default function Face() {
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

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  useEffect(() => {
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
        const obj = resizedDetections[0]?.expressions;
        if (obj?.neutral) {
          setEmotions({ ...obj });
          setError(false);
        } else {
          setError(true);
        }
      }
    }, 2000);
  };

  return (
    <div>
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
        <AlertState />
      ) : (
        <div className="emotion-header"> 
          <div className="emotion">Welcome to <span className="blue-text">Empath</span>  
        <br/>I can see you are: <br /><span className="blue-text">
            {
              Object.keys(emotions)[
                Object.values(emotions).indexOf(
                  Math.max(...Object.values(emotions))
                )
              ]
            }
            </span> 
          </div>
          <img src={require("../assets/happy-bot.jpg")}></img>
        </div>
      )}
    </div>
  );
}

function AlertState() {
  return (
    <>
      <div className="alert">
        Face not detected, ensure you are within range of the camera and not
        wearing glasses
      </div>
    </>
  );
}
