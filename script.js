const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");
const newGameBtn = document.getElementById("newGame");
const popupNewGameBtn = document.getElementById("popupNewGame");
const popup = document.getElementById("popup");
const message = document.getElementById("message");
const toggleBtn = document.getElementById("toggle-mode");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

let xTurn = true;
let count = 0;
let scoreX = 0, scoreO = 0;

const winningPattern = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const getNames = () => ({
  x: playerXInput.value.trim() || "Player X",
  o: playerOInput.value.trim() || "Player O"
});

const updateScoreboard = () => {
  const {x,o} = getNames();
  scoreXText.textContent = `${x} (X): ${scoreX}`;
  scoreOText.textContent = `${o} (O): ${scoreO}`;
};

playerXInput.addEventListener("input", updateScoreboard);
playerOInput.addEventListener("input", updateScoreboard);

const startGame = () => {
  cells.forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("X", "O");
    cell.disabled = false;
  });
  popup.classList.add("hide");
  count = 0;
  xTurn = true;
};

const endGame = (winner) => {
  const {x,o} = getNames();
  if (winner === "X") scoreX++;
  else if (winner === "O") scoreO++;

  message.textContent = winner === "draw" ? "😎 It's a Draw!" :
                        `🎉 ${winner === "X" ? x : o} (${winner}) Wins!`;

  updateScoreboard();
  popup.classList.remove("hide");
  cells.forEach(c => c.disabled = true);
};

const checkWin = () => {
  for (let pattern of winningPattern) {
    let [a,b,c] = pattern;
    let val1 = cells[a].innerText;
    let val2 = cells[b].innerText;
    let val3 = cells[c].innerText;
    if (val1 && val1 === val2 && val2 === val3) {
      endGame(val1);
      return true;
    }
  }
  if (count === 9) endGame("draw");
  return false;
};

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!cell.innerText && popup.classList.contains("hide")) {
      cell.innerText = xTurn ? "X" : "O";
      cell.classList.add(xTurn ? "X" : "O");
      count++;
      if (!checkWin()) xTurn = !xTurn; // toggle turn only if no winner
    }
  });
});

newGameBtn.addEventListener("click", () => {
  playerXInput.disabled = false;
  playerOInput.disabled = false;
  playerXInput.value = "";
  playerOInput.value = "";
  scoreX = 0;
  scoreO = 0;
  startGame();
});

popupNewGameBtn.addEventListener("click", () => {
  playerXInput.disabled = false;
  playerOInput.disabled = false;
  playerXInput.value = "";
  playerOInput.value = "";
  scoreX = 0;
  scoreO = 0;
  startGame();
});

restartBtn.addEventListener("click", () => {
  scoreX = 0;
  scoreO = 0;
  playerXInput.disabled = false;
  playerOInput.disabled = false;
  startGame();
  updateScoreboard();
});


// Initial setup
updateScoreboard();
startGame();
