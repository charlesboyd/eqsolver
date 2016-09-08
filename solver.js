console.log("INIT");

/*
For logcial expressions, use the following:
& - and
| - or
> - conditional
= - biconditional
~ - not
! - not

Note that only 0 evaluates to false, all other values (including 1) evaluate to true (output as the value 1).
*/

Array.prototype.peek = function(){
    if(this.length<1){
        return false;
    }
    return this[this.length-1];
};

Array.prototype.empty = function(){
    return this.length===0;
};

function isNumericString(str){
    return !isNaN(str) && str.length > 0;
}

function isLetterChar(str) {
    return str.match(/[a-z]/i)!==null;
}

function isOpToken(str){
    var opTokens = ['+', '-', '*', '/', '&', '|', '=', '~', '!'];
    return opTokens.indexOf(str)!==-1;
}

///----- start ----

//Adapted from http://www.geeksforgeeks.org/expression-evaluation/

// Returns true if 'op2' has higher or same precedence as 'op1',
// otherwise returns false.
function hasPrecedence(/*char*/ op1, /*char*/ op2){
    if (op2 === '(' || op2 === ')'){
        return false;
    }
    if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-')){
        return false;
    }else{
        return true;
    }
}

function boolToInt(boolVal){
    if(boolVal){
        return 1;
    }else{
        return 0;
    }
}

// A utility method to apply an operator 'op' on operands 'a' 
// and 'b'. Return the result.
function applyOp(/* char */ op, /*int*/ b, /*int*/ a){
    switch (op){
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0){
                throw new Error("Cannot divide by zero");
            }else{
                return a / b;
            }
        case '&':
            return boolToInt(a!==0 && b!==0);
        case '|': 
            return boolToInt(a!==0 || b!==0);
        case '>': 
            return boolToInt(a===0 || (a!==0 && b!==0));
        case '=': 
            return boolToInt((a===0 && b===0) || (a!==0 && b!==0));
        case '~':
        case '!':
            return boolToInt(b===0);
    }
    return 0;
}

function evaluate(expression){
    var tokens = expression;

    // Stack for numbers: 'values'
    var values = [];

    // Stack for Operators: 'ops'
    var ops = [];

    var i;
    for (i = 0; i < tokens.length; i++){
        // Current token is a whitespace, skip it
        /*jslint continue:true*/
        if (tokens.charAt(i) === ' '){
            continue;
        }

        //console.log(tokens.charAt(i));
        
        // Current token is a number, push it to stack for numbers
        if(isNumericString(tokens.charAt(i))){
            var tempstring = '';
            // There may be more than one digits in number
            while(isNumericString(tokens.charAt(i))){
                tempstring += tokens.charAt(i);
                i++;
            }
            
            i--;
                
            values.push(parseInt(tempstring, 10));
        }

        // Current token is an opening brace, push it to 'ops'
        else if (tokens.charAt(i) === '('){
            ops.push(tokens.charAt(i));
        }

        // Closing brace encountered, solve entire brace
        else if (tokens.charAt(i) === ')'){
            while (ops.peek() !== '('){
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            }
            ops.pop();
        }

        // Current token is an operator.
        else if (isOpToken(tokens.charAt(i))){
            if(tokens.charAt(i)==='~' || tokens.charAt(i)==='!'){
                //Push a dummy value onto the value stack so that it can be popped when the op is applied
                values.push(0);
            }
            
            // While top of 'ops' has same or greater precedence to current
            // token, which is an operator. Apply operator on top of 'ops'
            // to top two elements in values stack
            while (!ops.empty() && hasPrecedence(tokens.charAt(i), ops.peek())){
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            }

            // Push current token to 'ops'.
            ops.push(tokens.charAt(i));
        }else if(isLetterChar(tokens.charAt(i))){
            values.push(varLookup(tokens.charAt(i)));
        }
        
    }

    // Entire expression has been parsed at this point, apply remaining
    // ops to remaining values
    while (!ops.empty()){
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
    }

    // Top of 'values' contains result, return it
    return values.pop();
}

function printEval(ex){
    console.log("------------------");
    console.log("Expression: " + ex);
    var result = evaluate(ex);
    console.log("Result: " + result);
}

var varStore = {
    T: 1,
    F: 0
};

function varLookup(varLetter){
    if(typeof(varLetter)!=='string' || varLetter.length!==1){
        return false;
    }
    varLetter = varLetter.toUpperCase();
    if(varStore[varLetter]!==undefined){
        return varStore[varLetter];
    }else{
        return 0;
    }
}

function setVar(varLetter, value){
    if(typeof(varLetter)!=='string' || varLetter.length!==1){
        throw new TypeError("varLetter must be a single letter A-Z");
    }
    if(value==='T' || value==='t'){
        value = 1;
    }
    if(value==='F' || value==='f'){
        value = 0;
    }
    if(typeof(value)!=='number'){
        throw new TypeError("Value must be a number or either T or F");
    }
    varLetter = varLetter.toUpperCase();
    varStore[varLetter] = value;
    return true;
}

function printVarStore(){
    console.log(varStore);
}

setVar('A', 3);
printEval("(1&~1)|A");

//printVarStore();

console.log("------------------");
console.log("END");