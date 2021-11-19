const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');

let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let currentOperandTextElement = document.querySelector('[data-current-operand]');
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function clearScreen() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function appendNumber(number) {
    if (number === "." && currentOperand.includes('.')) {
        return;
    }
    currentOperand = `${currentOperand.toString()}${number.toString()}`;
}

function chooseOperation(operation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    previousOperand = `${currentOperand} ${operation}`;
    currentOperand = '';
}

function calculate() {
    const a = parseFloat(previousOperand);
    const b = parseFloat(currentOperand);
    if (isNaN(a) || isNaN(b)) return;
    currentOperand = operate(operation, a, b).toString();
    previousOperand = '';
    operation = undefined;
}

function updateScreen() {
    previousOperandTextElement.innerText = previousOperand;
    currentOperandTextElement.innerText = currentOperand;
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateScreen();
    })  
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        operation = button.innerText;
        chooseOperation(operation);
        updateScreen();
    })
})

equalButton.addEventListener('click', button => {
    calculate();

    if (currentOperand.toString().split('.')[1].length > 4){
        currentOperand = parseFloat(currentOperand).toFixed(4);
    }
    currentOperand = currentOperand.toString();
    updateScreen();
})

clearButton.addEventListener('click', button => {
    clearScreen();
    updateScreen();
})

deleteButton.addEventListener('click', button => {
    deleteNumber();
    updateScreen();
})

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            if (b === 0) {
                alert("You can't divide by 0!");
            }
            else return divide(a, b);
        default:
            return;
    }
}

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
    if (b === 0) return;
    else return a / b;
}