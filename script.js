const songs = [
    {
        title: "Descansa",
        author: "Stella Laura",
        source: "./assets/stellalaura-descansa-6fe6de8f.mp3",
        cover: "./assets/descansa.jpg"
    },
    {
        title: "Festa de Crente",
        author: "Banda Som & Louvor",
        source: "./assets/bandasomelouvor-festa-de-crente-ft-dj-pv-remix-51108246.mp3",
        cover: "./assets/festa de crente.jpg"
    },
    {
        title: "Fica Tranquilo",
        author: "Kemilly Santos",
        source: "./assets/KSOFC-fica-tranquilo-76ac0854.mp3",
        cover: "./assets/fica tranquilo.jpg"
    },
    {
        title: "Por Causa Dele",
        author: "Kellen Byanca",
        source: "./assets/kellenbyanca-por-causa-dele-ao-vivo-597da0cc.mp3",
        cover: "./assets/por causa dele.jpg"
    }
];

let currentSongIndex = 0;
let audio = new Audio();
//const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const author = document.getElementById('author');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

function loadSong(song) {
    audio.src = song.source;
    cover.src = song.cover;
    title.textContent = song.title;
    author.textContent = song.author;
    audio.load();
    audio.addEventListener('loadedmetadata', () => {
        durationElement.textContent = formatTime(audio.duration);
    });
}


function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeElement.textContent = formatTime(audio.currentTime);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener('timeupdate', updateProgress);

function playPause() {
    if (audio.paused || audio.ended) {
        audio.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause fa-3x"></i>';
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playPause();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playPause();
}

audio.addEventListener('ended', nextSong);

playPauseButton.addEventListener('click', playPause);
previousButton.addEventListener('click', previousSong);
nextButton.addEventListener('click', nextSong);

// Carregar a primeira música
loadSong(songs[currentSongIndex]);