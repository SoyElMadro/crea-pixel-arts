let gridButton = document.getElementById("enviar-cuadricula");
let clearGridButton = document.getElementById("limpiar-cuadricula");
let gridWidth = document.getElementById("rango-anchura");
let widthValue = document.getElementById("valor-anchura");
let gridHeight = document.getElementById("rango-altura");
let heightValue = document.getElementById("valor-altura");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("borrar-btn");
let paintBtn = document.getElementById("pintar-btn");
let container = document.querySelector(".contenedor");
let yo = document.getElementById("yo")

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup"
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let draw = false;
let erase = false;
let deviceType = isTouchDevice() ? "touch" : "mouse";

function isTouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

gridButton.addEventListener("click", createGrid);
clearGridButton.addEventListener("click", clearGrid);
eraseBtn.addEventListener("click", setEraseMode);
paintBtn.addEventListener("click", setPaintMode);
gridWidth.addEventListener("input", updateWidthValue);
gridHeight.addEventListener("input", updateHeightValue);
window.onload = initialize;

function createGrid() {
  container.innerHTML = "";
  let count = 0;
  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    let div = document.createElement("div");
    div.classList.add("gridRow");

    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = createGridCol(count);
      div.appendChild(col);
    }

    container.appendChild(div);
  }
}

function createGridCol(count) {
  let col = document.createElement("div");
  col.classList.add("gridCol");
  col.setAttribute("id", `gridCol${count}`);
  col.addEventListener(events[deviceType].down, () => {
    draw = true;
    col.style.backgroundColor = erase ? "transparent" : colorButton.value;
  });

  col.addEventListener(events[deviceType].move, (e) => {
    let elementId = document.elementFromPoint(
      !isTouchDevice() ? e.clientX : e.touches[0].clientX,
      !isTouchDevice() ? e.clientY : e.touches[0].clientY
    ).id;
    checker(elementId);
  });

  col.addEventListener(events[deviceType].up, () => {
    draw = false;
  });

  return col;
}

function checker(elementId) {
  let gridColumns = container.querySelectorAll(".gridCol");
  gridColumns.forEach((element) => {
    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
}

function clearGrid() {
  container.innerHTML = "";
}

function setEraseMode() {
  erase = true;
}

function setPaintMode() {
  erase = false;
}

function updateWidthValue() {
  widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
}

function updateHeightValue() {
  heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
}

function initialize() {
  gridHeight.value = 0;
  gridWidth.value = 0;
  updateWidthValue();
  updateHeightValue();
}