(() => {
  // Constants
  const display = document.querySelector("#output");
  const operations = {
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    percentage: (a, b) => (a * b) / 100,
  };
  function handleDarkMode() {
    const toggleSwitch = document.querySelector(
      '.dark-mode-switch input[type="checkbox"]'
    );

    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    }

    toggleSwitch.addEventListener("change", switchTheme, false);
  }

  function calculatorOperations() {
    let previousValue = 0;
    let calculatorCurrentValue = 0;
    let currentOperation = null;
    let shouldReset = false;

    function setUpEventHandlers() {
      const buttonsArea = document.querySelector(".buttons-area");
      buttonsArea.addEventListener("click", handleButtonPress);
    }

    function updateDisplay() {
      if (calculatorCurrentValue.length > 10) {
        display.style.fontSize = "1rem";
      } else if (calculatorCurrentValue.length > 5) {
        display.style.fontSize = "2rem";
      }
      display.innerText = calculatorCurrentValue;
    }

    function handleButtonPress(e) {
      const classes = [...e.target.classList];
      if (
        classes.includes("action") ||
        classes.includes("fn") ||
        e.target.id === "undo"
      ) {
        handleActionPress(e.target);
      } else if (typeof parseInt(e.target.id) === "number") {
        handleNumberPress(e.target.id);
      }
    }

    function removeActive() {
      const active = document.querySelector(".active");
      if (active) {
        active.classList.remove("active");
      }
    }

    function handleActionPress(el) {
      if (el.id !== "equals") {
        if (el.id === "ac") {
          calculatorCurrentValue = 0;
          previousValue = 0;
          shouldReset = false;
          removeActive();
          updateDisplay();
          return;
        }
        if (el.id === "plus-minus") {
          calculatorCurrentValue = -calculatorCurrentValue;
          updateDisplay();
          return;
        }
        if (el.id === "undo") {
          calculatorCurrentValue = previousValue;
          updateDisplay();
          return;
        }
        if (currentOperation) {
          calculatorCurrentValue = currentOperation(
            parseFloat(previousValue),
            parseFloat(calculatorCurrentValue)
          );
          updateDisplay();
          currentOperation = operations[el.id];
        } else {
          currentOperation = operations[el.id];
        }
        removeActive();
        el.classList.add("active");
        previousValue = calculatorCurrentValue;
        shouldReset = true;
      } else {
        removeActive();
        calculatorCurrentValue = currentOperation(
          parseFloat(previousValue),
          parseFloat(calculatorCurrentValue)
        );
        currentOperation = null;

        updateDisplay();
      }
    }

    function handleNumberPress(number) {
      if (calculatorCurrentValue === 0 || shouldReset) {
        calculatorCurrentValue = number;
        shouldReset = false;
      } else if (number === "." && calculatorCurrentValue.includes(".")) {
        return;
      } else {
        calculatorCurrentValue = calculatorCurrentValue + number;
      }
      updateDisplay();
    }
    // else calculatorCurrentValue = calculatorCurrentValue + number;
    // updateDisplay();
    setUpEventHandlers();
    updateDisplay();
  }

  function main() {
    handleDarkMode();
    calculatorOperations();
  }

  main();
})();
