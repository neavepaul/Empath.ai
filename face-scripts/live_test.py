import cv2
import numpy as np
import face_recognition
import tensorflow as tf

loaded_model = tf.keras.models.load_model('assets/model_67p06.h5')
print("model loaded")

emotion_map = {
    0 : "angry",
    1 : "disgust",
    2 : "fear",
    3 : "happy",
    4 : "neutral",
    5 : "sad",
    6 : "surprise"
}

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise IOError("Cannot open webcam")
while True:
    ret, frame = cap.read()
    cv2.imshow("Frame", frame)

    faces = face_recognition.face_locations(frame)
    if len(faces) == 1:
        x, y, w, h = faces[0]
        cv2.rectangle(frame, (h, x), (y, w), (0, 0, 255))
        cropped = frame[x:w, h:y]

        final_image = cv2.resize(cropped, (224,224))
        final_image = np.expand_dims(final_image,axis=0)
        final_image = final_image/255.0

        Predictions = loaded_model.predict(final_image)
        print(emotion_map[np.argmax(Predictions)])
    elif len(faces) > 1:
        print('no faces bruv')
    else:
        print('dont think you\'re alone brdr')


    if cv2.waitKey(2) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()