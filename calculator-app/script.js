const display = document.querySelector('.display-calculator h1');
const buttons = document.querySelectorAll('.calculator-btn button');
const clearButton = document.getElementById('clear-btn');

const calculate ={
    '/': (firstNumber, secondNumber) => secondNumber > 0 ? firstNumber / secondNumber : 'Error',
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber
};

let firstValue = 0;
let operatorValue = '';
let waitingForSecondValue = false;

function setNumberValue(number) {
    if (waitingForSecondValue) {
        display.textContent = number;
        waitingForSecondValue = false;
    } else {
        const displayValue = display.textContent;
        display.textContent = displayValue === '0' ? number : displayValue+number;
    }
}

function callOperator(operator) {
    const currentValue = Number(display.textContent);
    if (operatorValue && waitingForSecondValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const result = calculate[operatorValue](firstValue, currentValue);
        display.textContent = result;
        firstValue = result;
        if (firstValue === 'Error') {
            resetAll();
            return;
        }
    }
    operatorValue = operator;
    waitingForSecondValue = true;

}
function addDecimal() {
    if (waitingForSecondValue) return;
    if (!display.textContent.includes('.')) {
        display.textContent = `${display.textContent}.`;
    }
}

buttons.forEach((input) => {
    if (input.classList.length === 0) {
        input.addEventListener('click', () => setNumberValue(input.value));
    } else if (input.classList.contains('operator')) {
        input.addEventListener('click', () => callOperator(input.value));
    } else if (input.classList.contains('decimal')) {
        input.addEventListener('click', () => addDecimal());
    }
});

function resetAll() {
    firstValue = 0;
    operatorValue = '';
    waitingForSecondValue = false;
    display.textContent = '0';
}

clearButton.addEventListener('click', resetAll);

