let audio = document.getElementById("audio");

function play() {
    let audio = document.getElementById("audio");
    audio.play();
    audioContext.resume();
}

function pause() {
    let audio = document.getElementById("audio");
    audio.pause();
}

function setPlaySpeedSlow() { 
    audio.playbackRate = .7;
}

function setPlaySpeedNormal() { 
    audio.playbackRate = 1;
}

function setPlaySpeedFast() { 
    audio.playbackRate = 1.3
} 


const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector("audio");

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

const gainNode = audioContext.createGain();

track.connect(gainNode).connect(audioContext.destination);

const volumeControl = document.querySelector("#volume");

volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = volumeControl.value;
  },
  false
);

const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);

const pannerControl = document.querySelector("#panner");

pannerControl.addEventListener(
  "input",
  () => {
    panner.pan.value = pannerControl.value;
  },
  false
);

track.connect(gainNode).connect(panner).connect(audioContext.destination);