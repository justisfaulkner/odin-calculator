const operators = ["÷", "x", "-", "+"];
let operandClicked = false;
let firstOperand = "";
let secondOperand = "";
let operator = "";
let result = "";
let operated = false;

function operate(firstOperand, operator, secondOperand) {
    const first = Number(firstOperand)
    const second = Number(secondOperand)
    if (second === 0 && operator === "÷") {
        return "don't divide by zero";
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
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

const inputsContainer = document.querySelector(".inputs-container");
const screenInput = document.querySelector(".screen-input");
const screenResult = document.querySelector(".screen-result");

inputsContainer.addEventListener("click", handleCalculatorBtnClick);

export function handleCalculatorBtnClick(e) {
    const buttonClicked = e.target.id;
    const innerText = e.target.innerText;

    if (operators.includes(innerText)) {
        operandClicked = true;
        operator = innerText;
    }

    switch (buttonClicked) {
        case "":
            break;
        case "divide":
            break;
        case "multiply":
            break;
        case "subtract":
            break;
        case "add":
            break;
        case "decimal":
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
            firstOperand = "";
            secondOperand = "";
            operator = "";
            operandClicked = false;
            screenInput.innerHTML = "";
            screenResult.innerHTML = "";
            break;
        // case "delete"
        case "equals":
            screenResult.innerHTML = operate(firstOperand, operator, secondOperand);
            break;
        default:
            !operandClicked
                ? (firstOperand += innerText)
                : (secondOperand += innerText);
    }
    screenInput.innerHTML =
        `${firstOperand} ${operator} ${secondOperand}`.trim();
}
