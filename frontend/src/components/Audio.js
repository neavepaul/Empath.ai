import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as speechCommands from "@tensorflow-models/speech-commands";

function Audio() {
    const [model, setModel] = useState(null);
    const [wordRecognizer, setWordRecognizer] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [emotionLabel, setEmotionLabel] = useState("");

    // Load the TensorFlow.js model and the speech commands recognizer
    useEffect(() => {
        async function loadModel() {
            const model = await tf.loadLayersModel(
                "frontend/public/models/audio_99p29.json"
            );
            const wordRecognizer = await speechCommands.create("BROWSER_FFT");
            await wordRecognizer.ensureModelLoaded();
            setModel(model);
            setWordRecognizer(wordRecognizer);
        }
        loadModel();
    }, []);

    // Start listening for audio and predicting emotions when the user clicks the "Start" button
    const startListening = () => {
        setIsListening(true);
        wordRecognizer.listen(
            (result) => {
                if (result.scores.length > 0 && result.scores[0] > 0.9) {
                    const mfccScaled = preprocessAudio(result.spectrogram);
                    const emotionProbs = model.predict(mfccScaled);
                    const emotionLabel = getEmotionLabel(emotionProbs);
                    setEmotionLabel(emotionLabel);
                }
            },
            { probabilityThreshold: 0.9 }
        );
    };

    // Stop listening for audio and reset the emotion label when the user clicks the "Stop" button
    const stopListening = () => {
        setIsListening(false);
        wordRecognizer.stopListening();
        setEmotionLabel("");
    };

    // Define a function to preprocess the audio data
    const preprocessAudio = (spectrogram) => {
        const melSpec = tf.tidy(() => {
            const inputTensor = tf.browser.fromPixels(spectrogram, 1);
            const floatTensor = inputTensor.toFloat();
            const melSpec = tf.signal.mfccsToMelSpectrogram(
                floatTensor,
                40,
                256,
                128,
                44100 / 2
            );
            return melSpec;
        });
        const melSpecDb = tf.tidy(() => tf.signal.powerToDb(melSpec));
        const mfcc = tf.tidy(() => tf.signal.mfccsForMelSpectrogram(melSpecDb));
        const mfccScaled = tf.tidy(() =>
            tf.div(tf.sub(mfcc, mfcc.mean()), mfcc.std())
        );
        const mfccScaledWithBatch = tf.expandDims(mfccScaled, 0);
        return mfccScaledWithBatch;
    };

    // Define a function to convert the predicted emotion probabilities to labels
    const getEmotionLabel = (emotionProbs) => {
        const labels = [
            "angry",
            "disgust",
            "fear",
            "happy",
            "neutral",
            "sad",
            "surprise",
        ];
        const emotionLabel = labels[tf.argMax(emotionProbs).dataSync()[0]];
        return emotionLabel;
    };

    return (
        <div>
            <button onClick={startListening} disabled={isListening}>
                Start
            </button>
            <button onClick={stopListening} disabled={!isListening}>
                Stop
            </button>
            {emotionLabel && <p>{emotionLabel}</p>}
        </div>
    );
}
export default Audio;
