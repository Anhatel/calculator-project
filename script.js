function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let tempArray = [];
let calcState = "fresh";
let total = 0;
let a, b;

function getElement(element) {
  if (element.charAt(0) === "#") {
    return document.querySelector(element);
  }
  return document.querySelectorAll(element);
}

let viewer = getElement("#viewer");
let buttons = getElement("button");

buttons.forEach(button => {
  button.addEventListener("click", event => {
    if (button.innerHTML === "C") {
      calcState = "fresh";
      tempArray = [];
      viewer.innerHTML = "0";
      total = 0;
      a = 0;
      b = 0;
    }
    if (button.getAttribute("data-num")) {
      if (button.getAttribute("data-num") === "0") {
        if (
          tempArray.length > 1 ||
          tempArray.length === 0 ||
          (tempArray.length === 1 && tempArray[0] !== "0")
        ) {
          tempArray.push(button.getAttribute("data-num"));
        }
      }
      if (button.getAttribute("data-num") !== "." && button.getAttribute("data-num") !== "0") {
        tempArray.push(button.getAttribute("data-num"));
      }
      if (button.getAttribute("data-num") === ".") {
        if (!tempArray.includes(".")) {
          tempArray.push(button.getAttribute("data-num"));
        }
      }
      if (tempArray.length <= 10) {
        viewer.innerHTML = tempArray.join("");
      } else {
        viewer.innerHTML = "max digits C";
      }
    } else if (button.getAttribute("data-ops")) {
      if (button.getAttribute("data-ops") === "plus") {
        if (tempArray.length !== 0) {
          operate();
          viewer.innerHTML = total;
        }
        calcState = "plus";
      } else if (button.getAttribute("data-ops") === "minus") {
        if (tempArray.length !== 0) {
          operate();
          viewer.innerHTML = total;
        }
        calcState = "minus";
      } else if (button.getAttribute("data-ops") === "times") {
        if (tempArray.length !== 0) {
          operate();
          viewer.innerHTML = total;
        }
        calcState = "times";
      } else if (button.getAttribute("data-ops") === "divided by") {
        if (tempArray.length !== 0) {
          operate();
          viewer.innerHTML = total;
        }
        calcState = "divided by";
      }
    } else if (button.innerHTML === "=") {
      operate();
      viewer.innerHTML = total;
      calcState = "fresh";
      tempArray = [];
    }
  });
});

function operate() {
  b = Number(tempArray.join(""));
  if (calcState === "fresh") {
    if (tempArray.length === 0 && total === 0) {
      a = 0;
    } else if (tempArray.length === 0) {
      a = total;
    } else {
      a = Number(tempArray.join(""));
      total = a;
    }
  } else if (calcState === "plus") {
    total = add(a, b);
  } else if (calcState === "minus") {
    total = subtract(a, b);
  } else if (calcState === "times") {
    total = multiply(a, b);
  } else if (calcState === "divided by") {
    total = divide(a, b);
  }
  tempArray = [];
  a = total;
}
