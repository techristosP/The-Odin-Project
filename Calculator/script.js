add = (x, y) => x + y
subtract = (x, y) => x - y
multiply = (x, y) => x * y
divide = (x, y) => x / y

function operate(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x, y)
        case '-':
            return subtract(x, y)
        case '*':
            return multiply(x, y)
        case '/':
            return divide(x, y)
    }
}

function calculate(expression) {
    let operands = expression.split(/[\+\-\*\/\=]/);
    let operators = expression.split(/[\d\=]+/);
    operands = Array.from(operands.filter(element => element != ''));
    operators = Array.from(operators.filter(element => element != ''));

    let expressionArray = [];
    expressionArray.push(operands.shift());
    while (operands.length > 0) {
        expressionArray.push(operands.shift());
        expressionArray.push(operators.shift());
    }

    console.log(expressionArray);
    while (expressionArray.length > 1) {
        let x = Number(expressionArray.shift());
        let y = Number(expressionArray.shift());
        let operator = expressionArray.shift();
        let intermediateResult = operate(operator, x, y);
        expressionArray.unshift(intermediateResult);

    }

    let result = expressionArray.shift();
    console.log(result);
    return Math.round(result * 10**5) / 10**5;
}

function init() {
    let expression = document.querySelector('.expression');
    let operands = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');
    let equals = document.querySelector('.equals');
    let result = document.querySelector('.result');
    let clear = document.querySelector('.clear');

    operands.forEach(element => {
        element.addEventListener('click', () => {
            if (result.textContent == '')
                expression.textContent += element.textContent;
            else {
                expression.textContent = element.textContent;
                result.textContent = '';
            }
        });
    });

    operators.forEach(element => {
        element.addEventListener('click', () => {
            if (expression.textContent != '' && !isNaN(expression.textContent.charAt(expression.textContent.length-1)) && result.textContent == '')
                expression.textContent += element.textContent;
            else if (result.textContent != '') {
                expression.textContent = result.textContent;
                result.textContent = '';
                expression.textContent += element.textContent;
            }
        });
    });

    equals.addEventListener('click', () => {
        if (expression.textContent != '' && result.textContent == '') {
            expression.textContent += equals.textContent;
            let arithmeticExp = expression.textContent;
            // display.textContent += calculate(expression);
            result.textContent = calculate(arithmeticExp);
        }
    });

    clear.addEventListener('click', () => {
        expression.textContent = '';
        result.textContent = '';
    })
}

