import regeneratorRuntime from "regenerator-runtime";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;

const handleStop = () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  startBtn.innerText = "Stop recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  const recorder = new MediaRecorder(stream);
  console.log(recorder);
  recorder.ondataavailable = (e) => {
    console.log("녹화가 중딘되었습니다.");
    console.log(e);
    console.log(e.data);
  };
  recorder.start();
  console.log(recorder);
  setTimeout(() => {
    recorder.stop();
  }, 10000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
