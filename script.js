const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');

let board = Array(9).fill(null);
let current = "X";
let gameOver = false;

const WIN_PATTERNS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function startGame() {
  board.fill(null);
  current = "X";
  gameOver = false;
  statusEl.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x","o");
    cell.disabled = false;
  });
  popup.style.display = "none";
}

function checkWinner() {
  for (let [a,b,c] of WIN_PATTERNS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every(Boolean) ? "draw" : null;
}

function handleClick(e) {
  const idx = e.target.dataset.index;
  if (gameOver || board[idx]) return;

  board[idx] = current;
  e.target.textContent = current;
  e.target.classList.add(current.toLowerCase());

  let result = checkWinner();
  if (result) {
    gameOver = true;
    if (result === "draw") {
      showPopup("It's a Draw!");
    } else {
      showPopup(`🎉 Player ${result} Wins!`);
    }
  } else {
    current = current === "X" ? "O" : "X";
    statusEl.textContent = `Player ${current}'s turn`;
  }
}

function showPopup(message) {
  popupMessage.textContent = message;
  popup.style.display = "flex";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", startGame);
popupClose.addEventListener("click", startGame);

startGame();