const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();
let lastText = '';
let paused = false;
let speaking = false;

function checkMarkdown() {
  const markdownElements = document.querySelectorAll('.markdown');
  const lastMarkdownElement = markdownElements[markdownElements.length - 1];

  if (lastMarkdownElement) {
    const text = lastMarkdownElement.innerText.trim();

    if (text !== '' && text !== lastText) {
      speak(text);
      lastText = text;
    }
  }
  
  window.requestAnimationFrame(checkMarkdown);
}

function speak(text) {
  utterance.text = text;
  utterance.voice = getFirstAvailableVoice();
  utterance.lang = utterance.voice.lang;
  utterance.rate = 0.91; // adjust the rate to control the speed
  synth.speak(utterance);
  speaking = true;
}

function getFirstAvailableVoice() {
  const voices = synth.getVoices();
  if (voices.length > 0) {
    return voices[0];
  } else {
    return null;
  }
}

function pause() {
  if (!synth.speaking || paused) {
    return;
  }
  
  synth.pause();
  paused = true;
}

function resume() {
  if (!paused) {
    return;
  }
  
  synth.resume();
  paused = false;
}

function stop() {
  synth.cancel();
  paused = false;
  speaking = false;
}

function toggleSpeaking() {
  if (paused) {
    resume();
  } else if (!speaking) {
    start();
  } else {
    pause();
  }
}

function start() {
  const lastMarkdownElement = document.querySelectorAll('.markdown')[document.querySelectorAll('.markdown').length - 1];
  
  if (lastMarkdownElement) {
    const text = lastMarkdownElement.innerText.trim();

    if (text !== '') {
      speak(text);
      lastText = text;
    }
  }
}

// Cache the list of voices
synth.onvoiceschanged = () => {
  getFirstAvailableVoice();
};

// Handle keypress events: 'p'/Pause, 'r'/Resume and 's'/Stop
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 's':
      toggleSpeaking();
      break;
    case 'p':
      pause();
      break;
    case 'r':
      resume();
      break;
    case 'Escape':
      stop();
      break;
    default:
      break;
  }
});

// Run checkMarkdown every animation frame
window.requestAnimationFrame(checkMarkdown);
