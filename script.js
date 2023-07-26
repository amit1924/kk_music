// Fetch songs data from JSON file and update the song list
fetch('songs.json')
  .then(response => response.json())
  .then(data => {
    songs = data;
    generateSongList(); // Call the function to generate the song list after fetching data
  })
  .catch(error => console.error('Error fetching song data:', error));

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');

function generateSongList(searchQuery = '') {
  const songsList = document.getElementById('songs-list');
  songsList.innerHTML = ''; // Clear the previous song list

  songs.forEach((song, index) => {
    // Filter songs based on the search query
    if (
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      const listItem = document.createElement('li');
      listItem.classList.add('song');

      const songImage = document.createElement('img');
      songImage.src = song.image;
      songImage.alt = `${song.title} - ${song.artist}`;
      listItem.appendChild(songImage);

      listItem.innerHTML += `<b>${song.title}</b> - ${song.artist}`;

      const playButton = document.createElement('button');
      playButton.innerText = 'Play';
      playButton.addEventListener('click', () => {
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

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (event) => {
  const searchQuery = event.target.value;
  generateSongList(searchQuery);
});

// Add an event listener for the "keyup" event on the search input
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const searchQuery = event.target.value;
    generateSongList(searchQuery);
  }
});

// Rest of the code...

// Rest of the code...


// Rest of the code remains the same


  
  function playSong(songIndex) {
    const selectedSong = songs[songIndex];
    audioPlayer.src = selectedSong.url;
    audioPlayer.play();
    currentSongIndex = songIndex;
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
  const nextButton = document.getElementById('next-button');
  const previousButton = document.getElementById('previous-button');
  nextButton.addEventListener('click', nextSong);
  previousButton.addEventListener('click', previousSong);
  
  // Add event listener to the stop button
  const stopButton = document.getElementById('stop-button');
  stopButton.addEventListener('click', pauseSong);
  
  // The rest of your code for the raindrop animation and music bar flashing should
  
  
  function generateRaindrops() {
    const numberOfRaindrops = 50;
    const body = document.querySelector('body');
  
    for (let i = 0; i < numberOfRaindrops; i++) {
      const raindrop = document.createElement('div');
      raindrop.classList.add('raindrop');
      raindrop.style.left = `${Math.random() * 100}%`;
      raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
      body.appendChild(raindrop);
    }
  }
  
  // Call the functions to generate the raindrops and the song list when the page loads
  window.addEventListener('load', () => {
    generateRaindrops();
    
  });

  // script.js
// ... (Existing code)

// Function to handle music bar flashing on the beat
function flashMusicBar() {
    const musicBar = document.querySelector('.music-bar');
    musicBar.style.animation = 'none'; // Remove the existing animation
    musicBar.offsetHeight; // Trigger reflow to restart the animation
    musicBar.style.animation = null; // Reset the animation to its original value
  }
  
  // Add a Web Audio API listener to detect beats and call the flashMusicBar() function
  function detectBeats() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioPlayer = document.getElementById('audio-player');
    const analyser = audioContext.createAnalyser();
  
    const source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
  
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    function update() {
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      dataArray.forEach((value) => (sum += value));
      const average = sum / bufferLength;
      
      // You can adjust the threshold value to make the music bar flash more or less frequently
      if (average > 150) {
        flashMusicBar();
      }
  
      requestAnimationFrame(update);
    }
  
    update();
  }
  
  // Call the functions to generate the raindrops, the song list, and detect beats when the page loads

  