/* 
    solver.js
    
    By Charles Boyd <charlesboyd.me>
    
    Portions adapted from geeksforgeeks.org/expression-evaluation
    
    Can be used as a node.js script or included in a webpage.
    
    For equations, use the following:
    +   add
    -   subtract
    *   multiply
    /   divide
    ^   raise to a power
    
    For logcial expressions, use the following:
    &   and
    |   or
    >   conditional
    =   biconditional/equivalent
    ~   not
    !   not
    
    Parenthesis such as () may be used for grouping.
    
    A value of zero (0) is assumed to be false. All others are assumed to be true. Truthy output from this script will be represented by a value of one (1).
    
    Variables A to Z may be included for truth table printing.
    
    For solver.valuate(), all variables A to Z (except T) are assumed to have a value of zero (0) unless otherwise specified. The variable T is given a default value of one (1) and the variable F is given a default value of zero (0).
    
    The solver.auto() will evalute the experession provided (if it is valid), unless a variable besides T or F is provided, in which case it will print a truth table for the expression.
    
    Currently, the order of operations must be specified for all logical expressions by using parenthesis: e.g. use 1 | (~0) instead of 1 | ~0.
    
*/


console.log("INIT");

/*


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

var solver = (function(){
    function isNumericString(str){
        return !isNaN(str) && str.length > 0;
    }

    function isLetterChar(str) {
        return str.match(/[a-z]/i)!==null;
    }

    function isOpToken(str){
        var opTokens = ['+', '-', '*', '/', '&', '|', '=', '~', '!', '^', '>'];
        return opTokens.indexOf(str)!==-1;
    }
    
    function isValidEx(ex){
        //TODO
        return true;
    }
    
    function checkValidEx(ex){
        if(isValidEx(ex)){
            return true;
        }else{
            throw new TypeError("The expression provided is not valid.");
        }
    }
    
    var echo = function(str){
        console.log(str);
    };
    
    var overrideEchoFunction = function(f){
        if(typeof(f)!=='function'){
            throw new TypeError('Funcion override must be a function.');
        }
        echo = f;
    };
    
    var varStore;

    function resetVarStore(){
        varStore = {
            T: 1,
            F: 0
        };
    }

    resetVarStore();

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
        echo(varStore);
    }

    function getVarStore(){
        return varStore;
    }

    function getListOfVars(ex){
        var arr=[];
        var i;
        for(i=0; i<ex.length; i++){
            var cchar = ex.charAt(i);
            if(isLetterChar(cchar)){
                if(arr.indexOf(cchar)===-1){
                    arr.push(cchar);
                }
            }
        }
        return arr;
    }
    
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
            case '^':
                return Math.pow(a, b);
            case '&':
                return boolToInt(a!==0 && b!==0);
            case '|': 
                return boolToInt(a!==0 || b!==0);
            case '>':
                return boolToInt(a===0 || (a!==0 && b!==0));
            case '=':
                //return boolToInt((a===0 && b===0) || (a!==0 && b!==0));
                return boolToInt(a===b);
            case '~':
            case '!':
                return boolToInt(b===0);
        }
        return 0;
    }
    
    function evaluate(expression){
        checkValidEx(expression);
        
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

            //echo(tokens.charAt(i));

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
        echo("------------------");
        echo("Expression: " + ex);
        var result = evaluate(ex);
        echo("Result: " + result);
    }

    var ttdiv='  ';//Divider for the table

    function ttPrintRow(varList, varValues, ex){
        var i, varOutString="";
        for(i=0; i<varList.length; i++){
            setVar(varList[i], varValues[i]);
            varOutString += varValues[i] + ttdiv;

        }
        var result = evaluate(ex);
        echo(varOutString + '| ' + result);
    }

    function incVarValues(vv){
        var i;
        for(i=vv.length-1; i>=0; i--){
            if(vv[i]===0){
                vv[i]=1;
                break;
            }else{
                vv[i]=0;
            }
        }
        return vv;
    }

    function printTruthTable(ex){
        checkValidEx(ex);
        
        var varList = getListOfVars(ex);
        var numVars = varList.length;
        var numttRows = Math.pow(2, numVars);
        var varValues = [];
        var headerRowOut = "";
        var divRowOut = "";

        var i;
        for(i=0; i<numVars; i++){
            varValues.push(0);
            headerRowOut += varList[i] + ttdiv;
            divRowOut += '-' + ttdiv;
        }

        echo('');
        echo('Expression: ' + ex);
        echo('');
        echo(headerRowOut + '| Result');
        echo(divRowOut + '| -');

        for(i=0; i<numttRows; i++){
            ttPrintRow(varList, varValues, ex);
            varValues=incVarValues(varValues);
        }

        echo('');
        resetVarStore();
    }
    
    function auto(ex){
        checkValidEx(ex);
        //TODO
        evaluate(ex);
    }
    
    return {
        evaluate: evaluate,
        printTruthTable: printTruthTable,
        auto: auto,
        isValidEx: isValidEx,
        overrideEchoFunction: overrideEchoFunction,
        vars: {
            set: setVar,
            get: varLookup,
            getAll: getVarStore,
            echoAll: printVarStore,
            reset: resetVarStore
        }
    };
}());



//setVar('A', 3);
//printEval("(1&~1)|A");

//printTruthTable("(B&~1)|A");
//printTruthTable("A | (B & C) | H|E|L|L|O");

//printVarStore();

console.log("COMPLETE");