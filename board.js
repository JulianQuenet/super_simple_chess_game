export const chessBoard = document.querySelector(".chess-board");
const select = document.querySelector('.input-select')


export const board = [
  [
    "rook-black",
    "knight-black",
    "bishop-black",
    "queen-black",
    "king-black",
    "bishop-black",
    "knight-black",
    "rook-black",
  ],
  [
    "pawn-black",
    "pawn-black",
    "pawn-black",
    "pawn-black",
    "pawn-black",
    "pawn-black",
    "pawn-black",
    "pawn-black",
  ],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  [
    "pawn-white",
    "pawn-white",
    "pawn-white",
    "pawn-white",
    "pawn-white",
    "pawn-white",
    "pawn-white",
    "pawn-white",
  ],
  [
    "rook-white",
    "knight-white",
    "bishop-white",
    "queen-white",
    "king-white",
    "bishop-white",
    "knight-white",
    "rook-white",
  ],
];

export const chessPieces = {
  black: {
    pawn: "./images/pawn-black.png",
    knight: "./images/knight-black.png",
    bishop: "./images/bishop-black.png",
    rook: "./images/rook-black.png",
    queen: "./images/queen-black.png",
    king: "./images/king-black.png",
  },
  white: {
    pawn: "./images/pawn-white.png",
    knight: "./images/knight-white.png",
    bishop: "./images/bishop-white.png",
    rook: "./images/rook-white.png",
    queen: "./images/queen-white.png",
    king: "./images/king-white.png",
  },
};

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const block = document.createElement("div");
    block.classList.add("block");
    if ((i + j) % 2 === 0) {
      block.classList.add("white");
    } else {
      block.classList.add("black");
    }
    const cell = letters[j] + numbers[7 - i];
    block.setAttribute("data-cell", cell);
    chessBoard.appendChild(block);
  }
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const cell = letters[j] + numbers[7 - i];
    const block = document.querySelector(`[data-cell="${cell}"]`);
    const piece = board[i][j];
    if (piece) {
      const img = document.createElement("img");
      img.className = piece.substring(piece.indexOf("-") + 1) + `-piece`;
      img.id = piece.substring(0, piece.indexOf("-"));
      img.src =
        chessPieces[piece.substring(piece.indexOf("-") + 1)][
          piece.substring(0, piece.indexOf("-"))
        ];
      block.appendChild(img);
    }
  }
}

export const captureArea = {
  black: document.querySelector(".capture-area-white"),
  white: document.querySelector(".capture-area-black"),
};

const createCaptureCells = (input) => {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 8; j++) {
      const cell = document.createElement("div");
      cell.className = `cell`;
      input.appendChild(cell);
    }
  }
};

createCaptureCells(captureArea.black);
createCaptureCells(captureArea.white);



const promotionPieces = ["queen","rook","bishop","knight"]

const createPiecesOption = () => {
    const fragment = document.createDocumentFragment();
  
    for (const piece of promotionPieces) {
      const option = document.createElement("option");
      option.value = piece;
      option.innerText = piece.toUpperCase();
      fragment.appendChild(option);
    }
  
    return fragment;
  };


  select.appendChild(createPiecesOption())