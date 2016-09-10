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

For solver.evaluate(expression), all variables A to Z (except T) are assumed to have a value of zero (0) unless otherwise specified. The variable T is given a default value of one (1) and the variable F is given a default value of zero (0).

The solver.auto(expression) will evalute the experession provided (if it is valid) and print it, unless a variable besides T or F is provided, in which case it will print a truth table for the expression.

Currently, the order of operations must be specified for all logical expressions by using parenthesis: e.g. use 1 | (~0) instead of 1 | ~0.

Node.js example:
node solver.js "1+1"

TODO: Add public function descriptions, inputs, and outputs.

TODO: Add more examples

Examples:
solver.printTruthTable("(B&~1)|A");
solver.printTruthTable("A | (B & C) | H|E|L|L|O");