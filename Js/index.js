// Sidebar
const  menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close')

const sidebar = document.querySelector('.container .sidebar');

menuOpen.addEventListener('click', () => sidebar.style.left = '0');

menuClose.addEventListener('click', () => sidebar.style.left = '-100%');


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
  }
];

let musicIndex = 3;
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


playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);


function loadSong(index) {
  const song = songs[index];

  document.getElementById('song-title').textContent = song.title;
  document.getElementById('song-artist').textContent = song.artist;
  document.getElementById('song-cover').src = song.cover;

  const music= new Audio(song.path);
  music.autoplay = true;
  music.play();

  
  
}























