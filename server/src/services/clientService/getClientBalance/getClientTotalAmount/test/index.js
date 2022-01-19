const assert = require("assert");
const consola = require("consola");
const calcClientTotalAmount = require("./../calcClientTotalAmount");
const tests = require("./tests");

const runTests = (tests) => {
  tests.forEach(
    ({ expectedResult, childsLeftRightCountsGroupedByTreeHeight }, i) => {
      console.log("---------------------------------------");
      consola.info("Example n°", i + 1);
      try {
        assert.equal(
          calcClientTotalAmount(childsLeftRightCountsGroupedByTreeHeight),
          expectedResult
        );
        consola.success("Test successfuly passed");
      } catch (err) {
        consola.error("Test failed");
        console.log("Result:", err.actual, "!= Expected:", err.expected);
      }
    }
  );
};

runTests(tests);
