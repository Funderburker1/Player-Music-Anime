var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states: {
        "default-state": {
            gradients: [
                ['#ff9966', '#ff5e62'],
                ['#00F260', '#0575E6'],
                ['#e1eec3', '#f05053']
            ]
        }
    }
});

// variasveis

let music = document.querySelector('audio');
let musicIndex = 0;

let btnPlay = document.querySelector('#btn-play');
let btnPause = document.querySelector('#btn-pause');
let musicDuration = document.querySelector('#time-end');
let imgMusic = document.querySelector('img');
let musicName = document.querySelector('.description h3');
let artistName = document.querySelector('.description p');
let albumName = document.querySelector('.description .album p');
let albumImg = document.querySelector('.img-album img');


musicRender(musicIndex);


document.querySelector('#btn-play').addEventListener('click', playMusic);
document.querySelector('#btn-pause').addEventListener('click', pauseMusic);

music.addEventListener('timeupdate', attBarra);

document.querySelector('.arrow-left').addEventListener('click', () => {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = 2;
    }
    musicRender(musicIndex);
})

document.querySelector('.arrow-right').addEventListener('click', () => {
    musicIndex++;
    if (musicIndex > 2) {
        musicIndex = 0;
    }
    musicRender(musicIndex);
})

//funçoes
function musicRender(index) {
    music.setAttribute('src', musics[index].file);
    music.addEventListener('loadeddata', () => {
        musicName.textContent = musics[index].title;
        artistName.textContent = musics[index].artist;
        albumName.textContent = musics[index].albumName;
        imgMusic.src = musics[index].img;
        albumImg.src = musics[index].albumImg;
        musicDuration.textContent = secondsForMinutes(Math.floor(music.duration));
        attBarra()
        pauseMusic()
    })
}

function playMusic() {
    music.play();
    document.querySelector('#btn-play').style.display = 'none';
    document.querySelector('#btn-pause').style.display = 'block';
}
function pauseMusic() {
    music.pause();
    document.querySelector('#btn-play').style.display = 'block';
    document.querySelector('#btn-pause').style.display = 'none';
}

function attBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
    let decurrentTime = document.querySelector('#time-initial');
    decurrentTime.textContent = secondsForMinutes(Math.floor(music.currentTime));
}

function secondsForMinutes(s) {
    let boxMinutes = Math.floor(s / 60);
    let boxSeconds = s % 60;
    if (boxSeconds < 10) {
        boxSeconds = `0${boxSeconds}`;
    }

    return `${boxMinutes}:${boxSeconds}`
}

const modalOpen = document.querySelector('.modalPlayer');
const modalClose = document.querySelector('.modalPlayer');

document.querySelector('.openModal').addEventListener('click', () => {
    modalOpen.style.display = 'block';

})

document.querySelector('.closeModal').addEventListener('click', () => {
    modalClose.style.display = 'none';

})

document.querySelector('.btn-repeat-on').addEventListener('click', repetirMusicaON);
document.querySelector('.btn-repeat-off').addEventListener('click', repetirMusicaOFF);

function repetirMusicaON() {
    music.loop = true;
    document.querySelector('.btn-repeat-on').style.display = 'none';
    document.querySelector('.btn-repeat-off').style.display = 'block';

}

function repetirMusicaOFF() {
    music.loop = false;
    document.querySelector('.btn-repeat-on').style.display = 'block';
    document.querySelector('.btn-repeat-off').style.display = 'none';
}



// let musicModal = document.querySelector('.music img');
// let ModalMusicName = document.querySelector('.descriptionMusic h3');
// let ModalAlbum = document.querySelector('.descriptionMusic p');

// function modalMusica(index) {
//     music.addEventListener('loadeddata', () => {
//         musicModal.src = musics[index].albumImg;
//         ModalAlbum = musics[index].albumName;
//         ModalMusicName = musics[index].title;
//     })

// }