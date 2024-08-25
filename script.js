const colorPallete = document.getElementById("color-palette");

function createColorBox(color) {
  const newBox = document.createElement("li");
  newBox.style.backgroundColor = color;
  newBox.classList.add("color");
  newBox.addEventListener("click", selectColor);
  colorPallete.appendChild(newBox);
}

// Populate li with boxes and add on click listeners to it
const colorAmount = 5;
createColorBox("black");
for (let index = 0; index < colorAmount; index += 1) {
  createColorBox(makeRandomColor());
}

function makeRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  if (randomColor != "#000000") {
    return `#${randomColor.padStart(6, "0")}`;
  }
}

// for (let index = 0; index < colorBoxes.length; index += 1) {
//   colorBoxes[index].addEventListener("click", selectColor);
// }

// Change classname to selected to clicked colorbox

function selectColor(event) {
  const colorBoxes = document.getElementsByClassName("color");
  const boxToPaint = event.target;

  for (let index = 0; index < colorBoxes.length; index += 1) {
    if (colorBoxes[index] != boxToPaint) {
      colorBoxes[index].classList.remove("selected");
    } else {
      boxToPaint.classList.add("selected");
    }
  }
}

// Create pixels of pixel-board and add listeners to it

let isBoardInitialized = false;
function getInput() {
  const getItem = sessionStorage.getItem("size");
  if (getItem) {
    return JSON.parse(getItem);
  } else {
    return 0;
  }
}
function createBoard(event) {
  const boardSizeElement = document.querySelector("input");
  let boardSize = getInput();

  // Initialize board size based on event type
  if (!isBoardInitialized) {
    boardSize = 5;
    isBoardInitialized = true;
  } else {
    if (event.type == "click") {
      if (
        !boardSizeElement ||
        isNaN(boardSize) ||
        boardSizeElement.value === "" ||
        boardSize <= 0
      ) {
        window.alert("Board inválido!");
        return;
      }
    }
  }
  // Ensure board size is within limits
  boardSize = Math.max(5, Math.min(boardSize, 50));

  // Clear the existing board
  const pixelBoard = document.getElementById("pixel-board");
  pixelBoard.innerHTML = "";

  // Generate the new board
  generatePixels(pixelBoard, boardSize);
  console.log(document.getElementsByClassName("pixel").length);

  // Set grid layout based on board size
  pixelBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
}

if (!isBoardInitialized) {
  createBoard();
}

function generatePixels(container, size) {
  const totalPixels = size * size;
  for (let index = 0; index < totalPixels; index += 1) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.backgroundColor = "white";
    pixel.addEventListener("click", paintPixels);
    container.appendChild(pixel);
  }
}

function paintPixels(event) {
  const selectedColor =
    document.getElementsByClassName("selected")[0].style.backgroundColor;
  event.target.style.backgroundColor = selectedColor;
}

// Buttons

function clearBoard() {
  const pixels = document.getElementsByClassName("pixel");
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = "white";
  }
}
const clearButton = document.getElementById("clear-board");
clearButton.addEventListener("click", clearBoard);

const sendSize = document.getElementById("generate-board");
sendSize.addEventListener("click", (event) => {
  event.preventDefault();
  saveInputToSessionStorage();
  createBoard(event);
  console.log(event.type);
});

const saveInputToSessionStorage = () => {
  sessionStorage.setItem("size", document.getElementById("board-size").value);
};

// reset-button
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetBoxes);

function resetBoxes() {
  const colorBoxes = document.querySelectorAll("li");
  for (let index = 1; index < colorBoxes.length; index += 1) {
    let colorBox = colorBoxes[index];
    if (colorBox.className.includes("color")) {
      colorBox.remove();
      createColorBox(makeRandomColor());
    }
  }
}

window.onload = () => {
  document.querySelector("li").classList.add("selected");
};
