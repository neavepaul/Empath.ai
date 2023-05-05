import base64
from flask import Flask, request, jsonify
import numpy as np
import librosa
from keras.models import load_model
import io

app = Flask(__name__)

# Define mapping from string labels to integer labels
int_to_label = {
    0: 'anger',
    1: 'disgust',
    2: 'fear',
    3: 'happy',
    4: 'neutral',
    5: 'sad',
    6: 'surprise'
}

# Load Keras model
model = load_model("audio_99p29.h5")

# Define constants
NUM_MFCCS = 40
NUM_MELS = 128
SAMPLE_RATE = 22050
DURATION = 2


def classify_wav(wav_data):
    data = base64.b64decode(wav_data)
    print("AUDIO DECODED")
    # Convert base64-encoded WAV data to numpy array
    with io.BytesIO(data) as wav_file:
        print("io Bytes file open")
        signal, _ = librosa.load(wav_file, sr=SAMPLE_RATE, duration=DURATION)
        print("AUDIO LOADED")
    # Pad or truncate audio signal to fixed length
    signal_fixed_length = librosa.util.fix_length(data=signal, size=SAMPLE_RATE * DURATION)
    print("LENGTH FIXED")

    # Extract MFCCs and Mel spectrogram images
    mfccs = librosa.feature.mfcc(y=signal_fixed_length, sr=SAMPLE_RATE, n_mfcc=NUM_MFCCS)
    print("MFCCS CALCULATED")
    mel_spectrogram = librosa.feature.melspectrogram(y=signal_fixed_length, sr=SAMPLE_RATE, n_mels=NUM_MELS)
    print("SPECTOGRAMS MADE")

    # Concatenate MFCCs and Mel spectrogram into a single array
    features = np.concatenate((mfccs, mel_spectrogram), axis=0)
    print("CONCAT COMPLETE")

    # Reshape features array to have a batch size of 1
    features = np.reshape(features, (1, features.shape[0], features.shape[1], 1))
    print("RESHAPE DONE")

    # Make prediction using Keras model
    prediction = model.predict(features)
    print("PREDICTION: ", end=' ')
    print(prediction)

    # Print predicted class
    return prediction


@app.route('/classify', methods=['POST'])
def classify():
    print("AUDIO RECIEVED")
    wav_data = request.json['wav_data']
    predicted_dist = classify_wav(wav_data)
    print("MAIN FUNCTION GOT THE PREDS AND IS SENDING")
    return jsonify(predicted_dist.tolist())


if __name__ == '__main__':
    app.run(port=5000, debug=True)