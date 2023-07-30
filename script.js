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

function playSong(songIndex) {
  const selectedSong = songs[songIndex];
  audioPlayer.src = selectedSong.url;
  audioPlayer.currentTime = 0; // Reset the audio player's current time to 0
  audioPlayer
    .play()
    .then(() => {
      // Autoplay successful, set the current song index and scroll to the song
      currentSongIndex = songIndex;
      const songElements = document.querySelectorAll(".song");
      const currentSongElement = songElements[currentSongIndex];
      currentSongElement.scrollIntoView({ behavior: "smooth" });
    })
    .catch((error) => {
      // Autoplay failed, handle the error (e.g., autoplay blocked by the browser)
      console.error("Autoplay failed:", error);
    });

  // Listen for the "ended" event of the audio player to play the next song
  audioPlayer.addEventListener("ended", () => {
    // Calculate the index of the next song
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex); // Auto play the next song
  });

  // Apply the equalizer settings for the current song
  setTimeout(() => {
    applyEqualizerSettings();
  }, 500); // You can adjust the delay time as needed
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
