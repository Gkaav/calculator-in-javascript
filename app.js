const result = document.getElementById("result")
const numberButtons = document.querySelectorAll(".number-buttons")
const operationButtons = document.querySelectorAll(".operation-buttons")
const resetButton = document.getElementById("reset")
const equalButton = document.getElementById("equal")

let operand1 = null
let operand2 = null
let operator = null
let isDecimal = false
let hasResult = false

function handleNumberButtonClick(event) {
  const number = event.target.textContent
  if (hasResult) {
    clear()
  }
  if (isDecimal) {
    operand2 = parseFloat(`${operand2}.${number}`)
    result.value = operand2
  } else {
    if (operand2 === null) {
      operand2 = number
    } else {
      operand2 = operand2 * 10 + parseFloat(number)
    }
    result.value = operand2
  }
}

function handleOperationButtonClick(event) {
  const operation = event.target.textContent
  if (operator !== null) {
    handleEqualButtonClick()
  }
  operand1 = operand2
  operand2 = null
  operator = operation
  isDecimal = false
}

function handleEqualButtonClick() {
  if (operator === null || operand2 === null) {
    return
  }
  let resultValue = null
  switch (operator) {
    case "+":
      resultValue = eval(operand1) + eval(operand2)
      break
    case "-":
      resultValue = eval(operand1) - eval(operand2)
      break
    case "x":
      resultValue = eval(operand1) * eval(operand2)
      break
    case "/":
      resultValue = eval(operand1) / eval(operand2)
      break
    default:
      return
  }
  result.value = resultValue
  operand1 = resultValue
  operand2 = null
  operator = null
  isDecimal = false
  hasResult = true
}

function clear() {
  operand1 = null
  operand2 = null
  operator = null
  isDecimal = false
  hasResult = false
  result.value = ""
}

numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumberButtonClick)
})

operationButtons.forEach((button) => {
  button.addEventListener("click", handleOperationButtonClick)
})

resetButton.addEventListener("click", clear)
equalButton.addEventListener("click", handleEqualButtonClick)
