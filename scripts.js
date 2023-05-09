import { chessBoard, chessPieces,captureArea } from "./board.js";

const moveTitle = document.querySelector(".player-move");
const moveImage = document.querySelector(".player-icon");
const rotateButton = document.querySelector(".rotate");
const autoRotate = document.querySelector(".auto-rotate");
const reset = document.querySelector(".reset-button");
const overlay = document.querySelector(".overlay");
const form = document.querySelector('.overlay-form')

const textWhite = "White to move";
const textBlack = "Black to move";

const getRook = (inputCell) => {
  const rookCell = document.querySelector(`[data-cell="${inputCell}"]`);
  const rook = rookCell.querySelector("#rook");
  return rook;
};
//----------------------------------------------------------------Event handlers and listeners below---------------------------------------------------------------
let dragged;
let countA = 1;
let countB = 1;
let whiteToMove = true;
let rotateDegrees = 0;
let notValid
let auto = false;
let appendBlock;
const blocks = document.querySelectorAll(".block");
blocks.forEach((block) => {
  let img = block.querySelector("img");
  if (block.querySelector("img")) {
    //---------------------Drag start even listener
    img.addEventListener("dragstart", (e) => {
      dragged = img;
    });
  }
  //--------------------------Drop in event listener
  block.addEventListener("drop", (e) => {
    const blockPiece = block.querySelector("img");
    const cell = block.dataset.cell;
    const sameSide = blockPiece
      ? blockPiece.className === dragged.className
      : null;
    const castleSquaresArr = ["c1", "g1", "c8", "g8"];
    const castleSquare = castleSquaresArr.includes(cell);
    const castling = dragged.id === "king" && castleSquare;
    if (dragged.className === "black-piece" && whiteToMove) {
      return;
    } else if (dragged.className === "white-piece" && !whiteToMove) {
      return;
    }
    if (castling) {
      switch (cell) {
        case "c1":
          document.querySelector('[data-cell="d1"]').appendChild(getRook("a1"));
          break;
        case "g1":
          document.querySelector('[data-cell="f1"]').appendChild(getRook("h1"));
          break;
        case "c8":
          document.querySelector('[data-cell="d8"]').appendChild(getRook("a8"));
          break;
        case "g8":
          document.querySelector('[data-cell="f8"]').appendChild(getRook("h8"));
      }
    }
    if (sameSide) {
      notValid = true
      return;
    } else notValid = false
    if (blockPiece) {
      blockPiece.draggable = false;
      let area = blockPiece.className.substring(
        0,
        blockPiece.className.indexOf("-")
      );
      let areaCells = captureArea[area];
      let cells = areaCells.querySelectorAll(".cell");
      if (area === "white") {
        blockPiece.className = "captured";
        for (let i = countA - 1; i < countA; i++) {
          cells[i].appendChild(blockPiece);
          if (i === cells.length) {
            return;
          }
        }
        countA++;
      } else if (area === "black") {
        blockPiece.className = "captured";
        for (let i = countB - 1; i < countB; i++) {
          cells[i].appendChild(blockPiece);
          if (i === cells.length) {
            return;
          }
        }
        countB++;
      }
    }
    block.appendChild(dragged);
  });
  //---------------------------Dragging over event listener
  block.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  //--------------------------Entering event listener
  block.addEventListener("dragenter", (e) => {
    e.preventDefault();
    const blockPiece = block.querySelector("img");
    const sameSide = blockPiece
      ? blockPiece.className === dragged.className
      : null;
    const enemySide = blockPiece
      ? blockPiece.className !== dragged.className
      : null;
    if (sameSide) block.style.backgroundColor = "";
    else if (enemySide) block.style.backgroundColor = "red";
    else {
      block.style.backgroundColor = "lightgreen";
    }
    if (dragged.className === "black-piece" && whiteToMove) {
      block.style.backgroundColor = "";
    } else if (dragged.className === "white-piece" && !whiteToMove) {
      block.style.backgroundColor = "";
    }
  });
  //--------------------------Leaving event listener
  block.addEventListener("dragleave", (e) => {
    block.style.backgroundColor = "";
  });
  //----------------------------End event listener
  block.addEventListener("dragend", (e) => {
    e.preventDefault();
    block.style.backgroundColor = "";
    if(notValid){
      return
    }
    const cell = block.dataset.cell
    const rank = parseInt(cell.substring(1))
    if (dragged.className === "black-piece" && whiteToMove) {
      return;
    } else if (dragged.className === "white-piece" && !whiteToMove) {
      return;
    }
    if(dragged.id === "pawn" && rank===1 || rank===8){
      overlay.classList.remove('overlay-hidden')
      appendBlock = block
    }
    whiteToMove
      ? (moveImage.src = chessPieces.black.pawn)
      : (moveImage.src = chessPieces.white.pawn);
    whiteToMove
      ? (moveTitle.textContent = textBlack)
      : (moveTitle.textContent = textWhite);
    whiteToMove ? (whiteToMove = false) : (whiteToMove = true);

    if (auto) {
      rotateDegrees === 0 ? (rotateDegrees = 180) : (rotateDegrees = 0);
      chessBoard.style.transform = `rotate(${rotateDegrees}deg)`;
      for (block of blocks) {
        block.style.transform = `rotate(${rotateDegrees}deg)`;
      }
    }
  });
});

const rotateHandler = (e) => {
  rotateDegrees === 0 ? (rotateDegrees = 180) : (rotateDegrees = 0);
  chessBoard.style.transform = `rotate(${rotateDegrees}deg)`;
  for (const block of blocks) {
    block.style.transform = `rotate(${rotateDegrees}deg)`;
  }
};

const autoRotateHandler = (e) => {
  if (autoRotate.textContent === "OFF") {
    rotateButton.disabled = true;
    autoRotate.textContent = "ON";
    auto = true;
  } else {
    rotateButton.disabled = false;
    autoRotate.textContent = "OFF";
    auto = false;
  }
};

const promotePieceHandler = (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const pieceData = Object.fromEntries(formData)
    const newPiece = document.createElement('img')
    let color = dragged.className.substring(0, dragged.className.indexOf("-"))
    newPiece.className = dragged.className
    newPiece.id = pieceData.pieceData
    newPiece.src = chessPieces[color][pieceData.piece]
    dragged.remove()
    appendBlock.appendChild(newPiece)
    overlay.classList.add('overlay-hidden')
}


rotateButton.addEventListener("click", rotateHandler);
autoRotate.addEventListener("click", autoRotateHandler);
reset.addEventListener("click", () => {
  location.reload();
});
form.addEventListener('submit', promotePieceHandler)