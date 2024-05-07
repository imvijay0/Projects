class Calculator {
  constructor(previousOperandTextContent, currentOperandTextContent) {
    this.previousOperandTextContent = previousOperandTextContent;
    this.currentOperandTextContent = currentOperandTextContent;
    this.clear(); // clear for every new calculaltor
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    // don't append number after computation
    if (this.readyToReset) {
      this.currentOperand = number.toString(); // replace it with new entered number
      this.readyToReset = false; // indicates whether computation is done or not
      return;
    }
    // don't allow more than single dot
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOpertion(operation) {
    if (this.currentOperand === "") return;

    // if there is a previous value, then compute that result and then take this operation
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    // if use didn't enter any number or there is no prev,don't execute anything.
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      // we have to exact symbol(here i have added + from google) so if i
      // put + from keyboard it is not working.
      case "﹢":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  
  /*
    This function takes a number and format integer part with commans separated,and returns along
    with it's decimal part (if there is any).
    it divides integer part and decimal part in to two separate arrays.
  */
  
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]); // extract integer part
    const decimalDigits = stringNumber.split('.')[1]; // extract decimal part
    let integerDisplay;


    if (isNaN(integerDigits)) {
      integerDisplay = ''; // if there is no number,we can't format it
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      // return formatted number with decimal part
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay; // return only integer part
    }
  }

  updateDisplay() {
    this.currentOperandTextContent.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextContent.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )}${this.operation}`;
    } else {
      this.previousOperandTextContent.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");

const previousOperandTextContent = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextContent = document.querySelector(
  "[data-current-operand]"
);

const calculaltor = new Calculator(
  previousOperandTextContent,
  currentOperandTextContent
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculaltor.appendNumber(button.innerText);
    calculaltor.updateDisplay();
  });
});
1;
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculaltor.chooseOpertion(button.innerText);
    calculaltor.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculaltor.compute();
  calculaltor.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculaltor.clear();
  calculaltor.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculaltor.delete();
  calculaltor.updateDisplay();
});
