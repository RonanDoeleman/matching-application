const audio = document.getElementById("audio");

// Buttons functioneel maken zodat de gebruiker de audio kan manipuleren

function play() {
    audio.play();
    audioContext.resume();
}

audio.autoplay = false;

function pause() {
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

// Creëer nieuwe instantie van Audio context uit de Web Audio API
const audioContext = new AudioContext();

// Pak het audio element uit de profile.ejs
const audioElement = document.querySelector("audio");

// Voer de audio in de context in
const track = audioContext.createMediaElementSource(audioElement);

// Met gainNode kan je de volume van de Node veranderen
const gainNode = audioContext.createGain();

track.connect(gainNode).connect(audioContext.destination);

// Pak de volume regelaar uit de EJS
const volumeControl = document.querySelector("#volume");

// Pas het volume aan als je de volumeControl gebruikt
volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = volumeControl.value;
  },
  false
);

// Met een panner kan je aangeven welke speaker je wil aanspreken (links of rechts)
// pan: 0 is gebalanceerd (links en rechts)
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

