let currentSong = null

function convertSecondsToMinutesSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60); // Use Math.floor to ensure seconds are integers
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
}

async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text()
    // console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for(let i=0;i<as.length;i++){
        let element = as[i]
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

async function songName(){
    let songs = await getSongs()
    for (const song of songs) {
        musicCards(song)
    }
    playSong()
}

function musicCards(Name){
    document.querySelector(".musiclist").innerHTML += `<div class="card">
                <div class="logo">
                    <img src="Images/play-circle.svg" alt="" class="play-img">
                </div>
                <div class="info">
                    <h2>${Name.replaceAll("%20", " ").replaceAll("%2C", ",").split("-")[0]}</h2>
                    <h5>${Name.replaceAll("%20", " ").replaceAll("%2C", ",").split("-")[1].replace(".mp3", "")}</h5>
                    <div class="ruler"></div>
                    <p>Time</p>
                </div>
            </div>`
}



async function playSong(){
    let cards = document.querySelectorAll(".card")
    cards.forEach(card => {
        card.addEventListener("click", () => {
            let songname = card.querySelector("h2").innerText
            let artistName = card.querySelector("h5").innerText
            let songPath = "Songs/" + songname + " - " + artistName + ".mp3"
            console.log(songPath) //displaying the currently playing song in the console

            //on clicking new song pause the previous one and play the new one
            if(currentSong){
                currentSong.pause()
                currentSong.currentTime = 0
            }
            currentSong = new Audio(songPath)
            play.src = "Images/pause2.svg"
            currentSong.play()
            

            //displaying the current song
            document.querySelector(".song-info").innerHTML = `<div class="playbar-songinfo">
                ${songname}
            </div>
            <div class="playbar-artist">
                ${artistName}
            </div>`

            //updating the time bar
        currentSong.addEventListener("timeupdate", ()=>{

            setTimeout(() => {
                document.querySelector(".current-time").innerHTML = convertSecondsToMinutesSeconds(currentSong.currentTime)
                document.querySelector(".full-time").innerHTML = convertSecondsToMinutesSeconds(currentSong.duration)
            }, 700);

        //make the seekbar dynamic
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%"
    })
        })

        
    })

    //play button
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "Images/pause2.svg"
        }
        else{
            currentSong.pause()
            play.src = "Images/play_bar.svg"
        }
    })
}

songName()
