let box = document.querySelectorAll(".btn");
let reset = document.querySelector("#reset");
let xButton = document.querySelector("#x");
let oButton = document.querySelector("#o");
let result = document.getElementById("result");
let NewGame = document.getElementById("NewGame");
let choice = document.querySelector(".choice");
let xScoreDisplay = document.getElementById("xScore");
let oScoreDisplay = document.getElementById("oScore");
let resetScores = document.getElementById("resetScores");
let xScore = 0;
let oScore = 0;
let turn = false;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const btnDisabled = (nature) => {
   xButton.disabled = nature;
  oButton.disabled = nature;
  if (nature===false) {
     oButton.style.backgroundColor = "white";
    oButton.style.color = "black";
    xButton.style.backgroundColor = "white";
    xButton.style.color = "black";
  }
};
const resetScoresFunc = () => {
resetScores.addEventListener("click", () => {
  xScore = 0;
  oScore = 0;
   xScoreDisplay.textContent = xScore;
   oScoreDisplay.textContent = oScore;
});
}
 
 
if (xButton) {
  xButton.addEventListener("click", () => {
    turn = true;
    xButton.style.backgroundColor = "green";
    xButton.style.color = "white";
    btnDisabled(true);
  });
}

if (oButton) {
  oButton.addEventListener("click", () => {
    turn = false;
    oButton.style.backgroundColor = "green";
    oButton.style.color = "white";
    btnDisabled(true);
  });
}
box.forEach((boxes) => {
  boxes.addEventListener("click", () => {
    if (turn) {
      boxes.value = "X";
      boxes.style = "color:red;font-size:40px";
      turn = false;
      btnDisabled(true);
    } else {
      boxes.value = "O";
      boxes.style = "color:yellow;font-size:40px";
      turn = true;
      btnDisabled(true);
    }
    boxes.disabled = true;
    winner();
  });
  reset.addEventListener("click", () => {
    boxes.value = "";
    boxes.disabled = false;
    btnDisabled(false);
  });
  NewGame.addEventListener("click", () => {
    boxes.value = "";
    boxes.disabled = false;
    NewGame.style.display = "none";
    result.textContent = "";
    choice.style.display = "flex";
    btnDisabled(false);
    oButton.style.backgroundColor = "white";
    oButton.style.color = "black";
    xButton.style.backgroundColor = "white";
    xButton.style.color = "black";

  });

  let winner = () => {
    for (let pattern of winningConditions) {
      console.log(box[pattern[0]].value, pattern[1], pattern[2]);

      let pos1val = box[pattern[0]].value;
      let pos2val = box[pattern[1]].value;
      let pos3val = box[pattern[2]].value;

      if (pos1val != "" && pos2val != "" && pos3val != "") {
        if (pos1val === pos2val && pos2val === pos3val) {
          result.textContent = `Congratulations! Player ${pos1val} win this round!`;
          boxes.disabled = false;
          if (pos1val === "X") {
            xScore++;
            oScore--;
            xScoreDisplay.textContent = xScore;
          } else {
            oScore++;
            xScore--;
            oScoreDisplay.textContent = oScore;
          }
          resetScoresFunc();
          if (xScore === 5) {
            result.textContent = "Congratulations! Player X wins the game!";
            xScore = 0;
            oScore = 0;
             btnDisabled(false);
          xButton.style.backgroundColor = "white";
          oButton.style.backgroundColor = "white";
          }
          if (oScore === 5) {
            result.textContent = "Congratulations! Player O wins the game!";
            oScore = 0;
            xScore = 0;
             btnDisabled(false);
          xButton.style.backgroundColor = "white";
          oButton.style.backgroundColor = "white";
          }
          NewGame.style.display = "flex";
          choice.style.display = "none";
        
        }
      }
    }
  };
});
