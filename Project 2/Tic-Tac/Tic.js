const statusText = document.querySelector("#statusText")
const box = document.querySelectorAll(".box")
const resetBtn = document.querySelector("#restBtn")
const xscore = document.querySelector ("#xscore")
const oscore = document.querySelector ("#oscore")

let turn = 'X'
let x = 0
let o = 0

box.forEach(e => {
    e.onclick = () => {
        if(e.innerText == ''){
            e.innerText = turn
            turn == 'X' ? turn = "O" : turn = "X"
            statusText.innerText =`${turn}'S turn `
            Winner()
        }
    }
})

function Winner() {
    const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  winConditions.forEach(e =>{
    if(box[e[0]].innerText === box[e[1]].innerText && box[e[1]].innerText === box[e[2]].innerText && box[e[0]].innerText)
    {
        console.log(box[e[0]].innerText + ' Won')
        box[e[0]].innerHTML == 'X' ? x++ : o++;
        reset()        
    }
    xscore.innerText = x
    oscore.innerText = o
  })
}

resetBtn.onclick =() => reset()
function reset() {
    box.forEach(e => e.innerText = '')
}
