// Sidebar
const  menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close')

const sidebar = document.querySelector('.container .sidebar');

menuOpen.addEventListener('click', () => sidebar.style.left = '0');

menuClose.addEventListener('click', () => sidebar.style.left = '-100%');


//Music-Player

const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
playBtn = document.getElementById('start'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next');




const music = new Audio();

const songs = [
  {
    title: 'Speed of light',
    artist: 'Dj Okawari',
    path: 'Src/Music/Speed.mp3',
    cover: 'Src/Card-img/Speed.jpg'
  },
  {
    title: 'Target for Love',
    artist: 'Lee Jin-ah',
    path: 'Src/Music/Target.mp3',
    cover: 'Src/Card-img/Target.jpg'
  },
  {
    title: 'Talk About Luv',
    artist: 'Cosmograph',
    path: 'Src/Music/Luv.mp3',
    cover: 'Src/Card-img/Luv.jpg'
  },
  {
    title: 'Dream With You!',
    artist: 'RabbitJ',
    path: 'Src/Music/Dream.mp3',
    cover: 'Src/Card-img/Dream.jpg'
  },
  {
    title: 'After the Wind',
    artist: 'Dj Okawari',
    path: 'Src/Music/After.mp3',
    cover: 'Src/Card-img/After.jpg'
  },
  {
    title: 'Guitarmass',
    artist: 'Infected Mushroom',
    path: 'Src/Music/Guitar.mp3',
    cover: 'Src/Card-img/Guitar.jpg'
  },
  {
    title: 'Lost Desire',
    artist: 'Powerless feat. Sennzai',
    path: 'Src/Music/Lost-Desire.mp3',
    cover: 'Src/Card-img/Lost.jpg'
  },
  {
    title: 'Renegade',
    artist: 'Substantia/X.Ari',
    path: 'Src/Music/W-Theme.mp3',
    cover: 'Src/Card-img/W.jpg',
  },
  {
    title: 'Curse',
    artist: 'Noct',
    path: 'Src/Music/Curse.mp3',
    cover: 'Src/Card-img/Curse.jpg',
  }
];

let musicIndex = 7;
let isPlaying = false;


function togglePlay() {
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic () {
    isPlaying = true;

    playBtn.classList.replace('fa-play', 'fa-pause');

    playBtn.setAttribute('title', 'Pause');

    music.play();
}

function pauseMusic () {
    isPlaying = false;

    playBtn.classList.replace('fa-pause', 'fa-play');
    
    playBtn.setAttribute('title', 'Play');
    
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.title;
    artist.textContent = song.artist;
    image.src = song.cover;


    
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
  }


function updateProgressBar(){
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration ) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2,'0');
    durationEl.textContent = `${formatTime( duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime( currentTime / 60)}:${formatTime(currentTime % 60)}`;
    
}


function setProgressBar (e) {
const width = playerProgress.clientWidth;
const clickX = e.offsetX;
music.currentTime = ( clickX / width) * music.duration;

} 

function loadSong(index) {
  const song = songs[index];

  document.getElementById('song-title').textContent = song.title;
  document.getElementById('song-artist').textContent = song.artist;
  document.getElementById('song-cover').src = song.cover;

  const music= new Audio(song.path);
  music.autoplay = true;
  music.play();

}

function randomizeMusic() {
  const randomIndex = Math.floor(Math.random() * songs.length);
  const selectedSong = songs[randomIndex];

  music.src = selectedSong.path;
  title.textContent = selectedSong.title;
  artist.textContent = selectedSong.artist;
  music.onloadedmetadata = () => {
    music.play();
    console.log(`Now Playing: ${selectedSong.title} by ${selectedSong.artist}`)
  };

  const coverImage = document.getElementById('cover');
  coverImage.src = selectedSong.cover;
}



function toggleVolumeSlider() {
  var volumeSlider = document.getElementById("volume-slider");
  if (volumeSlider.style.display === "none") {
      volumeSlider.style.display = "block";
  } else {
      volumeSlider.style.display = "none";
  }
}

function setVolume() {
  const volumeSlider = document.getElementById('volume-slider');
  music.volume = volumeSlider.value;
}

const showAllSongsButton = document.getElementById('show-all-songs');
const hiddenItemsContainer = document.querySelector('.hidden-items');

showAllSongsButton.addEventListener('click', () => {
  hiddenItemsContainer.style.display = 'block';
});





playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
document.getElementById('volume-slider').addEventListener('input', setVolume);

loadMusic(songs[musicIndex]);

































  



