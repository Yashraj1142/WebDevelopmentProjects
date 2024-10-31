console.log("Tic Tac Toe from Yashraj Gupta")
let clickaudio = new Audio("click.mp3")
let GameOver = new Audio("gameover.mp3")
let turn = "X"
let gameOver = false

//Function to change the turn
const change_turn = () => {
    return turn === "X"? "O": "X"
}

//Function to check win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext")
    let win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    win.forEach(e=>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== ''))
            {
                document.querySelector(".info").innerText = boxtext[e[0]].innerText + " won"
                GameOver.play()
                gameOver = true
                document.querySelector(".img-container").getElementsByTagName("img")[0].style.width = "200px"
            }
    })
}

//Game Logic
let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext")
    element.addEventListener("click", ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn
            turn = change_turn()
            clickaudio.play()
            checkWin()
            if(!gameOver)
                {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn
                }
            
        }
    })
})

//Reset Button
reset.addEventListener('click', ()=>{
    let boxtext = document.querySelectorAll(".boxtext")
    Array.from(boxtext).forEach(element =>{
        element.innerText = ''
    })
    turn = "X"
    gameOver = false
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn
    document.querySelector(".img-container").getElementsByTagName("img")[0].style.width = "0px"
})

