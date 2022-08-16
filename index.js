var granimInstance = new Granim({

    element: '#canvas-basic',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states: {
        "default-state": {
            gradients: [
                ['#ff9966', '#ff5e62'],
                ['#54aef6', '#0575E6']
            ]
        }
    }
}

);

// variasveis

let music = document.querySelector('audio');
let musicIndex = Math.floor(Math.random() * musicsJson.length);

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

    // musicIndex < 0 ? musicIndex = musicsJson.length : musicIndex = musicIndex;
    musicRender(musicIndex);
    playMusic()
    console.log(musicIndex);
})

document.querySelector('.arrow-right').addEventListener('click', () => {
    musicIndex++;
    if (musicIndex > 2) {
        musicIndex = 0;
    }
    // musicIndex > musicsJson.length ? musicIndex = 0 : musicIndex = musicIndex;
    musicRender(musicIndex);
    playMusic()
    console.log(musicIndex);
})

function proximaMusica() {

    if (music.duration == music.currentTime) {
        console.log("proximo")
        musicIndex++;
        // if (musicIndex > 2) {
        //     musicIndex = 0;
        // }
        musicRender(musicIndex);

    }
}

//funçoes
function musicRender(index) {
    music.setAttribute('src', musicsJson[index].srcMusic);
    music.addEventListener('loadeddata', () => {
        musicName.textContent = musicsJson[index].title;
        artistName.textContent = musicsJson[index].artist;
        albumName.textContent = musicsJson[index].albumName;
        imgMusic.src = musicsJson[index].img;
        albumImg.src = musicsJson[index].albumImg;
        musicDuration.textContent = secondsForMinutes(Math.floor(music.duration));

        playingNow();

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
    proximaMusica()
}

function secondsForMinutes(s) {
    let boxMinutes = Math.floor(s / 60);
    let boxSeconds = s % 60;
    if (boxSeconds < 10) {
        boxSeconds = `0${boxSeconds}`;
    }

    return `${boxMinutes}:${boxSeconds}`
}

let btnRepeat = document.querySelector('#btn-repeat');
btnRepeat.addEventListener('click', () => {
    let getColors = btnRepeat.innerText;

    switch (getColors) {
        case "repeat":
            btnRepeat.innerText = "repeat_one";
            btnRepeat.classList.add('btn-repeat-on');
            music.loop = true;

            break;
        case "repeat_one":
            btnRepeat.innerText = "repeat";
            btnRepeat.classList.remove('btn-repeat-on');
            music.loop = false;
    }
})

let shuffle = document.querySelector('#shuffle');

shuffle.addEventListener('click', () => {
    musicIndex = Math.floor(Math.random() * musicsJson.length);
    musicRender(musicIndex);
    playMusic();
})


const modalOpen = document.querySelector('.modalPlayer');
const modalClose = document.querySelector('.modalPlayer');

document.querySelector('.openModal').addEventListener('click', () => {
    modalOpen.style.display = 'block';

})

document.querySelector('.closeModal').addEventListener('click', () => {
    modalClose.style.display = 'none';

})

const musicList = document.querySelector(".music-scroll");

for (let i = 0; i < musicsJson.length; i++) {
    let musicBox =
        `
            <li li-index="${i}">
                <div class="music-content">
                    <div class="music">
                        <span class="img-music">
                            <img src="${musicsJson[i].albumImg}" alt="">
                        
                        </span>
                        <span class="descriptionMusic">
                            <span>
                                <h3>${musicsJson[i].title}</h3>
                                <p>${musicsJson[i].artist}</p>
                                <p>${musicsJson[i].albumName}</p>
                            </span>
                            <span class="player">
                                <i class="fa-solid fa-circle-play"></i>
                            </span>
                        </span>
                    </div>
                </div>
            </li>
        `;
    musicList.insertAdjacentHTML('beforeend', musicBox);

    const allMusicBox = musicList.querySelectorAll("li");
    function playingNow() {
        for (let j = 0; j < allMusicBox.length; j++) {
            if (allMusicBox[j].classList.contains("playing")) {
                allMusicBox[j].classList.remove("playing");
            }

            if (allMusicBox[j].getAttribute("li-index") == musicIndex) {
                allMusicBox[j].classList.add("playing");
            }

            allMusicBox[j].setAttribute("onclick", "clicked(this)");
        }
    }

    function clicked(element) {
        let getLiIndex = element.getAttribute("li-index");
        musicIndex = getLiIndex;
        musicRender(musicIndex);
        playMusic();
    }

}


// document.querySelector('.aumentarVolume').addEventListener('click', aumentar_volume);
// document.querySelector('.diminuirVolume').addEventListener('click', diminuir_volume);


// function aumentar_volume() {
//     if (music.volume < 1) music.volume += 0.1;
// }

// function diminuir_volume() {
//     if (music.volume > 0) music.volume -= 0.1;
// }





