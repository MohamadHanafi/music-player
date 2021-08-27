const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');

// available songs' titles
const songs = ['hey', 'summer', 'ukulele'];

// keep track of song
let songIndex = 2;

// initially load song details into the DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./src/assets/sounds/${song}.mp3`;
  cover.src = `./src/assets/covers/${song}.jpg`;
}

// play song
function playSong() {
  musicContainer.classList.add('play');
  audio.play();
  playBtn.innerHTML = `<i class='fas fa-pause'></i>`;
}

//pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  audio.pause();
  playBtn.innerHTML = `<i class='fas fa-play'></i>`;
}

// playPause function
function playPause() {
  const isPlaying = musicContainer.classList.contains('play');

  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
}

//move to next song
function nextSong() {
  if (songIndex < songs.length - 1) {
    songIndex++;
  } else {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// move to the last song
function lastSong() {
  if (songIndex > 0) {
    songIndex--;
  } else {
    songIndex = songs.length - 1;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

//update Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

//set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//event listeners
playBtn.addEventListener('click', playPause);

prevBtn.addEventListener('click', lastSong);

nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgress);
