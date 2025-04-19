const container = document.getElementById("puzzle-container");
let tiles = [];
let shuffleCount = 0;

function createTiles() {
  tiles = [];
  for (let i = 1; i <= 8; i++) {
    tiles.push(i);
  }
  tiles.push(null); // empty space
}

function drawTiles() {
  container.innerHTML = '';
  tiles.forEach((tile, i) => {
    const div = document.createElement('div');
    div.className = 'tile';
    if (tile === null) {
      div.classList.add('empty');
    } else {
      div.textContent = tile;
      div.onclick = () => moveTile(i);
    }
    container.appendChild(div);
  });

  checkWin();
}

function moveTile(i) {
  const emptyIndex = tiles.indexOf(null);
  const validMoves = [i - 1, i + 1, i - 3, i + 3];

  if (validMoves.includes(emptyIndex)) {
    [tiles[i], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[i]];
    drawTiles();
  }
}

function shuffle() {
  for (let i = 0; i < 100; i++) {
    const possibleMoves = getPossibleMoves();
    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    moveTile(move);
  }

  // Remove win message if it exists
  const msg = document.getElementById("win-message");
  if (msg) msg.remove();

  // Reset tile colors if previously changed
  document.querySelectorAll(".tile").forEach(tile => {
    tile.style.backgroundColor = "";
    tile.style.color = "";
  });

  // Count shuffles and trigger secret at 6
  shuffleCount++;
  if (shuffleCount === 6) {
    showSecret();
    shuffleCount = 0; // reset to allow another secret trigger
  }
}

function getPossibleMoves() {
  const emptyIndex = tiles.indexOf(null);
  const moves = [];

  if (emptyIndex % 3 !== 0) moves.push(emptyIndex - 1); // left
  if (emptyIndex % 3 !== 2) moves.push(emptyIndex + 1); // right
  if (emptyIndex > 2) moves.push(emptyIndex - 3); // up
  if (emptyIndex < 6) moves.push(emptyIndex + 3); // down

  return moves;
}

function checkWin() {
  const winningOrder = [1, 2, 3, 4, 5, 6, 7, 8, null];
  const isWin = tiles.every((val, i) => val === winningOrder[i]);

  if (isWin && !document.getElementById("win-message")) {
    const msg = document.createElement('h2');
    msg.textContent = "🎉 Gooooood job! 🎉";
    msg.id = "win-message";
    msg.style.color = "green";
    msg.style.marginTop = "20px";
    document.body.appendChild(msg);
  }
}

function showSecret() {
  // Prevent duplicate secret
  if (document.getElementById("secret-message")) return;

  // Secret message
  const secret = document.createElement("div");
  secret.textContent = "🕵️‍♂️ En Mä Jaksa Pakko ottaa saikku.";
  secret.id = "secret-message";
  secret.style.position = "fixed";
  secret.style.top = "20px";
  secret.style.left = "50%";
  secret.style.transform = "translateX(-50%)";
  secret.style.padding = "15px";
  secret.style.backgroundColor = "#000";
  secret.style.color = "#ff0055";
  secret.style.fontSize = "24px";
  secret.style.border = "2px solid #ff0055";
  secret.style.borderRadius = "8px";
  secret.style.zIndex = "1000";
  document.body.appendChild(secret);

  // Change tile colors to blue/red checkerboard
  const tilesDivs = document.querySelectorAll(".tile");
  tilesDivs.forEach((tile, index) => {
    const isEven = index % 2 === 0;
    tile.style.backgroundColor = isEven ? "blue" : "red";
    tile.style.color = "white";
    tile.style.fontWeight = "bold";
  });
}

// Initialize the game
createTiles();
drawTiles();