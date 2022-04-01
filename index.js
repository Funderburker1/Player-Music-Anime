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
    // if (musicIndex < 0) {
    //     musicIndex = 2;
    // }

    musicIndex < 0 ? musicIndex = musics.length : musicIndex = musicIndex;
    musicRender(musicIndex);
    playMusic()
    console.log(musicIndex);
})

document.querySelector('.arrow-right').addEventListener('click', () => {
    musicIndex++;
    // if (musicIndex > 2) {
    //     musicIndex = 0;
    // }
    musicIndex > musics.length ? musicIndex = 0 : musicIndex = musicIndex;
    musicRender(musicIndex);
    playMusic()
    console.log(musicIndex);
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
        attBarra();
        // playMusic();
        // pauseMusic();
        platingNow();
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
    musicIndex = Math.floor(Math.random() * musics.length);
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

for (let i = 0; i < musics.length; i++) {
    let musicBox =
        `
            <li li-index="${i}">
                <div class="music-content">
                    <div class="music">
                        <span class="img-music">
                            <img src="${musics[i].albumImg}" alt="">
                        
                        </span>
                        <span class="descriptionMusic">
                            <span>
                                <h3>${musics[i].title}</h3>
                                <p>${musics[i].artist}</p>
                                <p>${musics[i].albumName}</p>
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

    // let musicBoxTag = musicList.querySelector(".player i");

    const allMusicBox = musicList.querySelectorAll("li");
    function platingNow() {
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

// <audio class="${musics[i].file}" src="music/${musics[i].src}.mp3"> 
