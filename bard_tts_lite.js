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

function toggleSpeaking() {
  if (!speaking) {
    start();
  } else {
    stop();
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

// Handle keydown events: 'Escape' for start/stop, '`' for pause/resume
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    toggleSpeaking();
  } else if (event.key === '`') {
    if (paused) {
      resume();
    } else {
      pause();
    }
  }
});

// Run checkMarkdown every animation frame
window.requestAnimationFrame(checkMarkdown);
