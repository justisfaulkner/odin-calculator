const operators = ["÷", "x", "-", "+"];
let operandClicked = false;
let firstOperand = "";
let secondOperand = "";
let operator = "";
let result = "";
let operated = false;

function operate(firstOperand, operator, secondOperand) {
    const first = Number(firstOperand);
    const second = Number(secondOperand);
    if (second === 0 && operator === "÷") {
        return "pls don't ÷ by 0, thx";
    }
    switch (operator) {
        case "÷":
            result = first / second;
            break;
        case "x":
            result = first * second;
            break;
        case "-":
            result = first - second;
            break;
        case "+":
            result = first + second;
            break;
        default:
            result = "something went wrong";
            break;
    }
    return round(result);
}

function round(num) {
    return Math.round((num + Number.EPSILON) * 10000000) / 10000000;
}

const inputsContainer = document.querySelector(".inputs-container");
const screenInput = document.querySelector(".screen-input");
const screenResult = document.querySelector(".screen-result");

// to do: add keyboard support
inputsContainer.addEventListener("click", handleCalculatorBtnClick);

export function handleCalculatorBtnClick(e) {
    console.log(e)
    const buttonClicked = e.target.id;
    const innerText = e.target.innerText;

    if (operators.includes(innerText)) {
        operandClicked = true;
        operator = innerText;
    }

    switch (buttonClicked) {
        case "":
            break;
        // to do: if any operand is clicked twice, have the calculator operate
        case "divide":
            if (operated) continueOperation();
            break;
        case "multiply":
            if (operated) continueOperation();
            break;
        case "subtract":
            if (operated) continueOperation();
            break;
        case "add":
            if (operated) continueOperation();
            break;
        case "decimal":
            if (operated) {
                break;
            }
            if (!operandClicked) {
                if (!firstOperand.includes(".") && firstOperand !== "") {
                    firstOperand += innerText;
                    break;
                }
            } else {
                if (!secondOperand.includes(".") && secondOperand !== "") {
                    secondOperand += innerText;
                    break;
                }
            }
            break;
        case "clear":
            clear();
            break;
        // to do: add delete functionality
        case "delete":
            break;
        case "equals":
            if (firstOperand === "" || secondOperand === "") break;
            screenResult.innerText = operate(
                firstOperand,
                operator,
                secondOperand
            );
            operated = true;
            break;
        default:
            if (operated) clear();
            !operandClicked
                ? (firstOperand += innerText)
                : (secondOperand += innerText);
    }
    screenInput.innerText =
        `${firstOperand} ${operator} ${secondOperand}`.trim();

    let displayLength =
        firstOperand.toString().length + secondOperand.toString().length;
    if (displayLength >= 14 && displayLength < 19) {
        screenInput.style.fontSize = "36px";
        screenResult.style.fontSize = "36px";
    } else if (displayLength >= 19 && displayLength < 27) {
        screenInput.style.fontSize = "26px";
        screenResult.style.fontSize = "26px";
    } else if (displayLength >= 27 && displayLength < 45) {
        screenInput.style.fontSize = "16px";
        screenResult.style.fontSize = "16px";
    } else if (displayLength >= 45) {
        screenInput.style.fontSize = "8px";
        screenResult.style.fontSize = "8px";
    } else {
        screenInput.style.fontSize = "46px";
        screenResult.style.fontSize = "46px";
    }
}

function clear() {
    firstOperand = "";
    secondOperand = "";
    operator = "";
    operandClicked = false;
    screenInput.innerText = "";
    screenResult.innerText = "";
    operated = false;
}

function continueOperation() {
    firstOperand = result;
    secondOperand = "";
    result = "";
    screenResult.innerText = "";
    operated = false;
    operandClicked = true;
}
