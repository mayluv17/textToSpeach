// init the API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");
const gif = document.querySelector("#soundGif");
const submitBtn = document.querySelector("#btn-submit");
//voices array
let voicesArray = [];

const getVoices = () => {
  voicesArray = synth.getVoices();
  //insert voices option
  voicesArray.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

const speech = () => {
  if (synth.speaking) {
    console.error("I'm already speaking");
    return;
  }
  if (textInput.value !== "") {
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //when speak ends
    speakText.onend = (e) => {
      console.log("Done Speaking");
      submitBtn.style.display = "block";
      gif.style.display = "none";
    };
    // on error
    speakText.onerror = (e) => {
      console.error("We have a problem");
      submitBtn.style.display = "block";
      gif.style.display = "none";
    };

    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    voicesArray.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    //setting pitch and rate

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //speak now
    synth.speak(speakText);
  }
};

//event listenrs
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speech();
  textInput.blur();
  submitBtn.style.display = "none";
  gif.style.display = "block";
});

//set the rate
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

//set the pitch
pitch.addEventListener("change", (e) => (pitchValue.textContent = rate.value));

//on voice change

voiceSelect.addEventListener("change", (e) => speech());
