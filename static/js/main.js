let cover = document.querySelector(".cover");
let name = document.querySelector(".name");
let artist = document.querySelector(".artist");

let playpause_btn = document.querySelector(".playpause");
let prev_btn = document.querySelector(".prev");
let next_btn = document.querySelector(".next");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let track_volume = 1;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

function loadTrack(index){
    track_index = index;
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = playlist[track_index].audio;
    curr_track.load();

    cover.style.backgroundImage =
        "url(" + playlist[track_index].cover + ")";
    name.textContent = playlist[track_index].name;
    artist.textContent = playlist[track_index].artist;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);

    random_bg_color();
}

function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

    document.querySelector(".main").style.background = bgColor;
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (track_index < playlist.length - 1)
        track_index+=1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -=1;
    else track_index = track_index - 1;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    curr_track.currentTime = curr_track.duration * (seek_slider.value / 100);
}

function toBeginning() {
    curr_track.currentTime = 0;
}

function toEnding() {
    curr_track.currentTime = curr_track.duration - 5;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function muteSound() {
    if (curr_track.volume > 0) {
        track_volume = curr_track.volume;
        curr_track.volume = 0;
        volume_slider.value = 0;
    }
    else {
        curr_track.volume = track_volume;
        volume_slider.value = curr_track.volume * 100;
    }
}

function maxVolume() {
    curr_track.volume = 1;
    volume_slider.value = curr_track.volume * 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) {currentSeconds = "0" + currentSeconds;}
        if (currentMinutes < 10) {currentMinutes = "0" + currentMinutes;}
        if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes;}
        if (durationSeconds < 10) {durationSeconds = "0" + durationSeconds;}

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(track_index);
