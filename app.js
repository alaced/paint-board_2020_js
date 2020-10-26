const canvas = document.querySelector("#jsCanvas"),
  ctx = canvas.getContext("2d"),
  colors = document.getElementsByClassName("jsColor"),
  range = document.getElementById("jsRange"),
  modeBtn = document.querySelector("#jsMode"),
  saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 5.0;

ctx.strokeStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const bgColor = event.target.style.backgroundColor;
  ctx.strokeStyle = bgColor;
  ctx.fillStyle = bgColor;
}

function handleRangeChange(event) {
  const strokeSize = event.target.value;
  ctx.lineWidth = strokeSize;
}

function handleMode() {
  if (filling === true) {
    filling = false;
    modeBtn.innerText = "Fill";
    canvas.addEventListener("mousemove", onMouseMove);
  } else {
    filling = true;
    modeBtn.innerText = "Paint";
  }
}

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.removeEventListener("mousemove", onMouseMove);
  }
}

function handleRightClick(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Artwork[EXPORT]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (modeBtn) {
  modeBtn.addEventListener("click", handleMode);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
