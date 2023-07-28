// Fetch songs data from JSON file and update the song list
fetch("songs.json")
  .then((response) => response.json())
  .then((data) => {
    songs = data;
    generateSongList(); // Call the function to generate the song list after fetching data
  })
  .catch((error) => console.error("Error fetching song data:", error));

let currentSongIndex = 0;
const audioPlayer = document.getElementById("audio-player");

function generateSongList(searchQuery = "") {
  const songsList = document.getElementById("songs-list");
  songsList.innerHTML = ""; // Clear the previous song list

  songs.forEach((song, index) => {
    // Filter songs based on the search query
    if (
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      const listItem = document.createElement("li");
      listItem.classList.add("song");

      const songImage = document.createElement("img");
      songImage.src = song.image;
      songImage.alt = `${song.title} - ${song.artist}`;
      listItem.appendChild(songImage);

      listItem.innerHTML += `<b>${song.title}</b> - ${song.artist}`;

      const playButton = document.createElement("button");
      playButton.innerText = "Play";
      playButton.addEventListener("click", () => {
        playSong(index);
      });
      listItem.appendChild(playButton);

      songsList.appendChild(listItem);
    }
  });
}

// Rest of the code...

// Rest of the code...

// Rest of the code...

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (event) => {
  const searchQuery = event.target.value;
  generateSongList(searchQuery);
});

// Add an event listener for the "keyup" event on the search input
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const searchQuery = event.target.value;
    generateSongList(searchQuery);
  }
});



// For Equalizer

function applyEqualizerSettings() {
  const equalizerSelect = document.getElementById("equalizer-select");
  const selectedPreset = equalizerSelect.value;

  // Create the Web Audio API equalizer nodes
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioPlayer = document.getElementById("audio-player");
  const source = audioContext.createMediaElementSource(audioPlayer);
  const gainNode = audioContext.createGain();
  const equalizer = audioContext.createBiquadFilter();

  // Connect the nodes
  source.connect(equalizer); // Connect source to equalizer
  equalizer.connect(gainNode); // Connect equalizer to gain node
  gainNode.connect(audioContext.destination); // Connect gain node to audio destination

  // Set the equalizer preset based on the selected option
  if (selectedPreset === "normal") {
    // Reset equalizer settings to default (no changes)
    equalizer.type = "allpass";
    equalizer.frequency.setValueAtTime(350, audioContext.currentTime);
    equalizer.gain.setValueAtTime(0, audioContext.currentTime);
  } else if (selectedPreset === "rock") {
    // Apply Rock equalizer settings
    equalizer.type = "peaking";
    equalizer.frequency.setValueAtTime(100, audioContext.currentTime);
    equalizer.gain.setValueAtTime(5, audioContext.currentTime);
    equalizer.Q.setValueAtTime(1, audioContext.currentTime);
  } else if (selectedPreset === "bass") {
    // Apply Bass equalizer settings
    equalizer.type = "lowshelf";
    equalizer.frequency.setValueAtTime(100, audioContext.currentTime);
    equalizer.gain.setValueAtTime(10, audioContext.currentTime);
  }

  // Set the audioPlayer's src to the audioContext's destination
  audioPlayer.srcObject = audioContext;
}

const equalizerSelect = document.getElementById("equalizer-select");
equalizerSelect.addEventListener("change", applyEqualizerSettings);

// Rest of your code remains unchanged.


// Rest of your code remains unchanged.





 

function playSong(songIndex) {
  const selectedSong = songs[songIndex];
  audioPlayer.src = selectedSong.url;
  audioPlayer.currentTime = 0; // Reset the audio player's current time to 0
  audioPlayer.play();
  currentSongIndex = songIndex;

  // Apply the selected equalizer settings
  applyEqualizerSettings();

  // Scroll to the currently playing song
  const songElements = document.querySelectorAll(".song");
  const currentSongElement = songElements[currentSongIndex];
  currentSongElement.scrollIntoView({ behavior: "smooth" });
}

function pauseSong() {
  audioPlayer.pause();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
}

function previousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
}

// Add event listeners to the next and previous buttons
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");
nextButton.addEventListener("click", nextSong);
previousButton.addEventListener("click", previousSong);

// Add event listener to the stop button
const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", pauseSong);
