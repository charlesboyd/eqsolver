console.log("Init");

var expression = "(5+1)*3";

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

function isOpToken(str){
    return str==='+' || str==='-' || str==='*' || str==='/';
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
            // While top of 'ops' has same or greater precedence to current
            // token, which is an operator. Apply operator on top of 'ops'
            // to top two elements in values stack
            while (!ops.empty() && hasPrecedence(tokens.charAt(i), ops.peek())){
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            }

            // Push current token to 'ops'.
            ops.push(tokens.charAt(i));
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


console.log("Expression: " + expression);
var result = evaluate(expression);
console.log("Result: " + result);
console.log("End");