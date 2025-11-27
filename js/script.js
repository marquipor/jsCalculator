 // ===== Global Variables =====
  var currentInput="";                                        // The number currently being typed
  var total="";                                               // The accumulated result
  var currentOperator="";                                     // The operator selected 
  var display = document.getElementById("display");           // Screen
  display.value=0;

  
  // ===== Functions =====


  // Append a number or '.' (decimal) to the current input
  function appendNumber(digit){
    if(digit=='.' && currentInput.includes('.')) return; // prevent multiples '.'
    currentInput+=digit;
    display.value=currentInput;
  }


  // Set and operator and calculate previos operation if necessary.
  function setOperator(operator){
    if(currentInput!== "" && currentOperator !== ""){
        computeOperation()
    } else { 
      total = parseFloat(display.value);
    }
    currentOperator=operator;
    currentInput="";
  }


   // Compute the result of the current operation
  function computeOperation(){

    let number = parseFloat(currentInput);

    if(isNaN(number))return;

    switch (currentOperator) {
      case '+':
        total += number;
        break;
      case '-':
        total -= number;
        break;
      case '*':
        total *= number;
        break;
      case '/':
        if (number === 0) {
            document.getElementById("display").value="Error";
            total=0;
            currentOperator="";
            currentInput="";
            return;
        } else {
            total /= number;
        }
        break;
    }
      display.value = total;
  }    
  
 
  // Show result when '=' is pressed
 function calculateResult(){
      if (currentInput !== "" && currentOperator !== "") {
        computeOperation();
        currentOperator = ""; 
        currentInput = "";     
      }
  }

 // Clear everything ('AC' button)
  function clearAll(){
    currentInput="";
    total="";
    currentOperator="";
    document.getElementById("display").value=0;
  }

// Delete last digit of the current input
  function deleteLastDigit(){
    if(currentInput.length > 0) {
        // Remove last character
        currentInput = currentInput.slice(0, -1);;
        display.value = currentInput;
    }
  }

// ===== Manage events =====

// Mouse events 
let btNumber = document.getElementsByClassName("number");
for(let btn of btNumber){
    btn.addEventListener("click", function(){appendNumber(this.value)});
}

let btOperation = document.getElementsByClassName("operation");
for(let btn of btOperation){
    btn.addEventListener("click", function(){setOperator(this.value)});
}

document.getElementById("equals").addEventListener("click", calculateResult);

document.getElementById("clear").addEventListener("click", clearAll);

document.getElementById("delete").addEventListener("click", deleteLastDigit);

// Keyboard events
document.addEventListener('keydown', function(event){
    const key=event.key;

    if ("0123456789.".includes(key)){
        appendNumber(key);
    } else if("+-*/".includes(key)){
        setOperator(key);
    } else if (key == "Enter"){
        calculateResult();
    } else if (key =="Escape"){
        clearAll();
    } else if (key == "Backspace"){
        deleteLastDigit();
    }
  });
