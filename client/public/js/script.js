const video = document.getElementById('video')
const emotions = ['neutral','happy','sad','angry','fearful']

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video).withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    console.log(resizedDetections[0].expressions['neutral'])
    emotions.map((emote)=>{
      document.getElementById(emote).innerText = resizedDetections[0].expressions[`${emote}`];
    })
  }, 2500)
})