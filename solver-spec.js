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
        
        it("should solve basic | expressions", function() {
            expect(ev("1 | 1")).toEqual(1);
            expect(ev("0 | 1")).toEqual(1);
            expect(ev("1 | 0")).toEqual(1);
            expect(ev("0 | 0")).toEqual(0);
        });

    });

});

