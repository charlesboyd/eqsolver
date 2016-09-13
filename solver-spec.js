/*global describe, beforeEach, afterEach, it, xit, require*/
/*jslint nomen: true*/

/*

This file is still under devlopment!

*/

//Simulate the node.js process global
var process = {};
/*var solver = { 
    evaluate: function(){return 0;},
    incVarValues: function(){return 0;}
};
*/
//var solver = require('./solver.js'); 

/*global solver*/
describe("Solver", function() {

    beforeEach(function() {
        
    });
    
    it("solver should be an object", function() {
        expect(typeof solver).toEqual("object");
    });

    describe("evaluate()", function() {
        
        it("should be a function", function() {
            expect(typeof solver.evaluate).toEqual("function");
        });
        
        it("should solve simple addtion", function() {
            expect(solver.evaluate("1 + 1")).toEqual(2);
            expect(solver.evaluate("0 + 1")).toEqual(1);
        });
        
        it("should solve basic & expressions", function() {
            expect(solver.evaluate("1 & 1")).toEqual(1);
            expect(solver.evaluate("0 & 1")).toEqual(0);
            expect(solver.evaluate("1 & 0")).toEqual(0);
            expect(solver.evaluate("0 & 0")).toEqual(0);
        });
        
        it("should evaluate all digits but 0 as true in & expressions", function(){
            expect(solver.evaluate("5 & 5")).toEqual(1);
            expect(solver.evaluate("0 & 5")).toEqual(0);
            expect(solver.evaluate("5 & 0")).toEqual(0);
        });
        
        it("should solve basic | expressions", function() {
            expect(solver.evaluate("1 | 1")).toEqual(1);
            expect(solver.evaluate("0 | 1")).toEqual(1);
            expect(solver.evaluate("1 | 0")).toEqual(1);
            expect(solver.evaluate("0 | 0")).toEqual(0);
        });
        
        it("should evaluate all digits but 0 as true in | expressions", function() {
            expect(solver.evaluate("5 | 5")).toEqual(1);
            expect(solver.evaluate("0 | 5")).toEqual(1);
            expect(solver.evaluate("5 | 0")).toEqual(1);
        });

        it("should solve basic > expressions", function() {
            expect(solver.evaluate("1 > 1")).toEqual(1);
            expect(solver.evaluate("0 > 1")).toEqual(1);
            expect(solver.evaluate("1 > 0")).toEqual(0);
            expect(solver.evaluate("0 > 0")).toEqual(1);
        });
        
        it("should evaluate all digits but 0 as true in > expressions", function() {
            expect(solver.evaluate("5 > 5")).toEqual(1);
            expect(solver.evaluate("0 > 5")).toEqual(1);
            expect(solver.evaluate("5 > 0")).toEqual(0);
        });
        
        it("should solve basic = expressions", function() {
            expect(solver.evaluate("1 = 1")).toEqual(1);
            expect(solver.evaluate("0 = 1")).toEqual(0);
            expect(solver.evaluate("1 = 0")).toEqual(0);
            expect(solver.evaluate("0 = 0")).toEqual(1);
        });

        it("should evaluate all digits but 0 as true in = expressions", function() {
            expect(solver.evaluate("5 = 5")).toEqual(1);
            expect(solver.evaluate("0 = 5")).toEqual(0);
            expect(solver.evaluate("5 = 0")).toEqual(0);
        });
        
        it("should solve basic ~ or ! expressions", function() {
            expect(solver.evaluate("~1")).toEqual(0);
            expect(solver.evaluate("~0")).toEqual(1);
            expect(solver.evaluate("!1")).toEqual(0);
            expect(solver.evaluate("!0")).toEqual(1);
        });

        it("should evaluate all digits but 0 as true in ~ or ! expressions", function() {
            expect(solver.evaluate("~5")).toEqual(0);
            expect(solver.evaluate("!5")).toEqual(0);
        });
        
        it("should evaluate a ~ with other operations", function() {
            expect(solver.evaluate("~(1)")).toEqual(0);
            expect(solver.evaluate("~(1&1)")).toEqual(0);
            expect(solver.evaluate("~0&1")).toEqual(1);
            expect(solver.evaluate("1&~0")).toEqual(1);
        });

    });
    
    describe("incVarValues()", function() {

        it("should be a function", function() {
            expect(typeof solver._private.incVarValues).toEqual("function");
        });
        
        it("should increment test 1", function() {
            expect(solver._private.incVarValues([0, 0, 1])).toEqual([0, 1, 0]);
        });
        
    });

});

