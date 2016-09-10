/*

This file is still under devlopment!

*/

describe("Solver", function() {

    beforeEach(function() {
        
    });

    describe("evaluate()", function() {
        var ev = evaluate;
        
        it("should be a function", function() {
            expect(typeof ev).toEqual("function");
        });
        
        it("should solve simple addtion", function() {
            expect(ev("1 + 1")).toEqual(2);
            expect(ev("0 + 1")).toEqual(1);
        });
        
        it("should solve basic & expressions", function() {
            expect(ev("1 & 1")).toEqual(1);
            expect(ev("0 & 1")).toEqual(0);
            expect(ev("1 & 0")).toEqual(0);
            expect(ev("0 & 0")).toEqual(0);
        });
        
        it("should evaluate all digits but 0 as true in & expressions", function(){
            expect(ev("5 & 5")).toEqual(1);
            expect(ev("0 & 5")).toEqual(0);
            expect(ev("5 & 0")).toEqual(0);
        });
        
        it("should solve basic | expressions", function() {
            expect(ev("1 | 1")).toEqual(1);
            expect(ev("0 | 1")).toEqual(1);
            expect(ev("1 | 0")).toEqual(1);
            expect(ev("0 | 0")).toEqual(0);
        });
        
        it("should evaluate all digits but 0 as true in | expressions", function() {
            expect(ev("5 | 5")).toEqual(1);
            expect(ev("0 | 5")).toEqual(1);
            expect(ev("5 | 0")).toEqual(1);
        });

        it("should solve basic > expressions", function() {
            expect(ev("1 > 1")).toEqual(1);
            expect(ev("0 > 1")).toEqual(1);
            expect(ev("1 > 0")).toEqual(0);
            expect(ev("0 > 0")).toEqual(1);
        });
        
        it("should evaluate all digits but 0 as true in > expressions", function() {
            expect(ev("5 > 5")).toEqual(1);
            expect(ev("0 > 5")).toEqual(1);
            expect(ev("5 > 0")).toEqual(0);
        });
        
        it("should solve basic = expressions", function() {
            expect(ev("1 = 1")).toEqual(1);
            expect(ev("0 = 1")).toEqual(0);
            expect(ev("1 = 0")).toEqual(0);
            expect(ev("0 = 0")).toEqual(1);
        });

        it("should evaluate all digits but 0 as true in = expressions", function() {
            expect(ev("5 = 5")).toEqual(1);
            expect(ev("0 = 5")).toEqual(0);
            expect(ev("5 = 0")).toEqual(0);
        });
        
        it("should solve basic ~ or ! expressions", function() {
            expect(ev("~1")).toEqual(0);
            expect(ev("~0")).toEqual(1);
            expect(ev("!1")).toEqual(0);
            expect(ev("!0")).toEqual(1);
        });

        it("should evaluate all digits but 0 as true in ~ or ! expressions", function() {
            expect(ev("~5")).toEqual(0);
            expect(ev("!5")).toEqual(0);
        });
        
        it("should evaluate a ~ with other operations", function() {
            expect(ev("~(1)")).toEqual(0);
            expect(ev("~(1&1)")).toEqual(0);
            expect(ev("~0&1")).toEqual(1);
            expect(ev("1&~0")).toEqual(1);
        });


    });
    
    describe("incVarValues()", function() {
        var f = incVarValues;

        it("should be a function", function() {
            expect(typeof f).toEqual("function");
        });
        
        it("should increment test 1", function() {
            expect(f([0, 0, 1])).toEqual([0, 1, 0]);
        });
        
    });

});

