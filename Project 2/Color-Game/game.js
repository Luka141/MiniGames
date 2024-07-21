const displayScore = document.querySelector("#displayScore");
const displayColor = document.querySelector("#displayColor");
const easyBtn = document.querySelector("#easyBtn");
const mediumBtn = document.querySelector("#mediumBtn");
const hardBtn = document.querySelector("#hardBtn");
const boxes = document.querySelectorAll(".box");


const gameConfig = {
    score : 0,
    mode : "",
    answer : -1
}

easyBtn.addEventListener("click", () => {
    initGame("easy");
  });
  
  mediumBtn.addEventListener("click", () => {
    initGame("medium");
  });
  
  hardBtn.addEventListener("click", () => {
    initGame("hard");
  });


  boxes.forEach((box, index) =>{
    box.addEventListener('click', () => {
      if(gameConfig.mode === "" || gameConfig.answer === -1){
        displayAlert("No mode found", "error", "Pick gamemode first")
      }
      if(gameConfig.count > index){
        const hasWon = gameConfig.answer === index
        const score = gameConfig.mode === "easy" ? hasWon ? 10 : -5 : gameConfig.mode === "medium" ? hasWon ? 25 : -15 : hasWon ? 50 : -25;
       if (gameConfig.score + score > 0){
        gameConfig.score += score
       } else {
        gameConfig.score = 0
       }
       displayScore.innerText = gameConfig.score;
       
       if(hasWon){
        initGame(gameConfig.mode)
       }
       
       displayAlert(
        hasWon ? "Congrats" : "Oops",
        hasWon ? "success" : "error",
        hasWon ? "Congrats you gussed color" : "You missed correct box"
       )
      }
      else {
        displayAlert("Wrong box", "error", "Choose from colored")
      }
    })
  })
  
  
  function initGame(mode) {
    initStyle()
    if (mode === "easy" || mode === "medium" || mode === "hard") {
      const count = mode === "easy" ? 3 : mode === "medium" ? 6 : 9;
      const randomColorsArray = getRandomColorsArray(count);
      const answer = randomIndex(count);
      displayColor.innerText = randomColorsArray[answer]
      gameConfig.answer = answer;
      gameConfig.mode = mode;
      gameConfig.count = count
      for (const [index, box] of boxes.entries()) {
        if (index === count) {
          break;
        }
        box.style.backgroundColor = randomColorsArray[index];
        box.style.cursor = "pointer"
      }
    }
  }
 
  function initStyle(){
    clearStyles()
  }

  function randomIndex(count) {
    return Math.floor(Math.random() * count);
  }

  function getRandomRGBColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  function getRandomColorsArray(count) {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push(getRandomRGBColor());
    }
    return array;
  }

  function clearStyles(){
    boxes.forEach(box => {
        box.style.backgroundColor = "transparent"
        box.style.cursor = "not-allowed"
    })
  }

  function displayAlert (title, icon, text = ""){
    swal.fire({title, icon, text})
  }