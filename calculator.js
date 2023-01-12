const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        if(calculator.displayValue === '0'){
        calculator.displayValue = digit;
        } else{
        calculator.displayValue += digit;
        }
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecondOperand = false;
        return
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(calculator.displayValue);

    if (calculator.operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }


    if (calculator.firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
        const result = calculate(calculator.firstOperand, inputValue, calculator.operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}
function clearOneNumber(){
    calculator.displayValue = '';
}

function changeSign() {
    if ( calculator.operator === null || calculator.waitingForSecondOperand === false || calculator.firstOperand !== null)
    {
    var currentNumber = parseFloat(calculator.displayValue);
        currentNumber *= -1;
        if(calculator.waitingForSecondOperand == true ){
            calculator.firstOperand = currentNumber;
        }
        calculator.displayValue = `${parseFloat(currentNumber.toFixed(7))}`;
    }
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
        handleOperator(value);
        break;
    case '.':
        inputDecimal(value);
        break;
    case '+/-':
        changeSign();
        break;
    case 'all-clear':
        resetCalculator();
        break;
    case 'clear':
        clearOneNumber();
    break;
    default:
        if (Number.isInteger(parseFloat(value))) {
            inputDigit(value);
        }
    }
    updateDisplay();
});