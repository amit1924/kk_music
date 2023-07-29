// Add a typewriter effect to the title element
function typewriterEffect() {
    const titleText = document.title;
    const titleElement = document.querySelector('title');
    const speed = 100; // Adjust the typing speed (lower value for faster typing)
  
    let i = 0;
    function type() {
      if (i < titleText.length) {
        titleElement.innerText += titleText.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
  
    type();
  }
  
  // Call the typewriterEffect function when the page loads
  window.addEventListener('load', typewriterEffect);

  let isClicked = true;

  function toggle() {
    if (isClicked) {
      document.body.style.background = "black";
      document.body.style.color = "red";
    } else {
      document.body.style.background = 'white';
      document.body.style.color = 'black';
    }
  
    isClicked = !isClicked;
    document.body.classList.toggle('dark');
  
    // Toggle the icons for dark mode and light mode
    const darkIcon = document.querySelector('#btn i.fa-moon');
    const lightIcon = document.querySelector('#btn i.fa-sun');
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');
  }
  
  let btn = document.querySelector('.dark-mode');
  btn.addEventListener('click', toggle);
  
// Helper function to fetch the reverb impulse response audio file
// Helper function to fetch the reverb impulse response audio file
async function fetchAudioBuffer(url) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
  } catch (error) {
    console.error("Error fetching audio buffer:", error);
    return null;
  }
}

// Helper function to get the reverb impulse response buffer
async function getReverbBuffer() {
  // Replace 'reverb-impulse-response.wav' with the URL of your reverb impulse response audio file
  return await fetchAudioBuffer("reverb-impulse-response.wav");
}

// Function to apply equalizer settings based on the selected preset
function applyEqualizerSettings() {
  const equalizerSelect = document.getElementById("equalizer-select");
  const selectedPreset = equalizerSelect.value;

  // Reset previous effect settings
  equalizer.disconnect();
  gainNode.gain.setValueAtTime(1, audioContext.currentTime);

  if (selectedPreset === "normal") {
    // Do nothing for normal preset (already set to default values)
  } else if (selectedPreset === "rock") {
    applyRockEffect();
  } else if (selectedPreset === "bass") {
    applyBassEffect();
  } else if (selectedPreset === "treble") {
    applyTrebleEffect();
  } else if (selectedPreset === "dolby") {
    applyDolbyEffect();
  } else if (selectedPreset === "cinematic") {
    applyCinematicEffect();
  }
}

// Functions to apply different effects

function applyRockEffect() {
  equalizer.type = "peaking";
  equalizer.frequency.setValueAtTime(100, audioContext.currentTime);
  equalizer.gain.setValueAtTime(5, audioContext.currentTime);
  equalizer.Q.setValueAtTime(1, audioContext.currentTime);
}

function applyBassEffect() {
  equalizer.type = "lowshelf";
  equalizer.frequency.setValueAtTime(100, audioContext.currentTime);
  equalizer.gain.setValueAtTime(25, audioContext.currentTime); // Increased bass gain
}

function applyTrebleEffect() {
  equalizer.type = "highshelf";
  equalizer.frequency.setValueAtTime(5000, audioContext.currentTime); // Treble frequency
  equalizer.gain.setValueAtTime(15, audioContext.currentTime); // Increased treble gain
}

function applyDolbyEffect() {
  applyBassEffect();

  const trebleFilter = audioContext.createBiquadFilter();
  trebleFilter.type = "highshelf";
  trebleFilter.frequency.setValueAtTime(8000, audioContext.currentTime);
  trebleFilter.gain.setValueAtTime(10, audioContext.currentTime);

  equalizer.connect(trebleFilter);
  trebleFilter.connect(gainNode);
}

async function applyCinematicEffect() {
  applyBassEffect();

  const reverb = audioContext.createConvolver();
  const reverbBuffer = await getReverbBuffer();
  if (reverbBuffer) {
    reverb.buffer = reverbBuffer;
    equalizer.connect(reverb);
    reverb.connect(gainNode);
  }
}

// Rest of your code...

// Apply the initial equalizer settings
applyEqualizerSettings();

// Listen for changes in the equalizer selection and update the settings accordingly
const equalizerSelect = document.getElementById("equalizer-select");
equalizerSelect.addEventListener("change", applyEqualizerSettings);

// The rest of your code remains unchanged.

