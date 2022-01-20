const {
  AMOUNT_TO_PAY_BY_CHILD,
  PAY_FOR_MAX_LEFT_RIGHT_COUNT,
} = require("../configs");

const countsIsNotEmpty = ({ left, right }) => {
  return left > 0 || right > 0;
};
const minimizeCount = (count) =>
  count > PAY_FOR_MAX_LEFT_RIGHT_COUNT ? PAY_FOR_MAX_LEFT_RIGHT_COUNT : count;

const fixLeftRightCountsAndGetCountsToRemove = (
  leftRightCountsGroupedByTreeHeight
) => {
  const countsToRemove = { left: 0, right: 0 };
  for (let i = 0; i < leftRightCountsGroupedByTreeHeight.length; i++) {
    let { left, right } = leftRightCountsGroupedByTreeHeight[i];
    left -= countsToRemove.left;
    right -= countsToRemove.right;
    countsToRemove.left = 0;
    countsToRemove.right = 0;
    if (
      left <= PAY_FOR_MAX_LEFT_RIGHT_COUNT ||
      right <= PAY_FOR_MAX_LEFT_RIGHT_COUNT
    ) {
      if (left < right) {
        const minimizedRight = minimizeCount(right);
        const toAdd = minimizedRight - left;
        countsToRemove.left = toAdd;
        left = minimizedRight;
      } else if (right < left) {
        const minimizedLeft = minimizeCount(left);
        const toAdd = minimizedLeft - right;
        countsToRemove.right = toAdd;
        right = minimizedLeft;
      }
    }
    leftRightCountsGroupedByTreeHeight[i] = { left, right };
  }
  return countsToRemove;
};

const removeAddedCountsFromBottomToTop = (
  leftRightCountsGroupedByTreeHeight,
  countsToRemove
) => {
  let calc;
  for (
    let i = leftRightCountsGroupedByTreeHeight.length - 1;
    i >= 0 && countsIsNotEmpty(countsToRemove);
    i--
  ) {
    let { left, right } = leftRightCountsGroupedByTreeHeight[i];
    calc = left - countsToRemove.left;
    if (calc >= 0) {
      leftRightCountsGroupedByTreeHeight[i].left = calc;
      countsToRemove.left = 0;
    } else {
      leftRightCountsGroupedByTreeHeight[i].left = 0;
      countsToRemove.left = -calc;
    }

    calc = right - countsToRemove.right;
    if (calc >= 0) {
      leftRightCountsGroupedByTreeHeight[i].right = calc;
      countsToRemove.right = 0;
    } else {
      leftRightCountsGroupedByTreeHeight[i].right = 0;
      countsToRemove.right = -calc;
    }
  }
};

/*
  leftRightCountsGroupedByTreeHeight: [{left: countNumber, right: countNumber}]
*/
const calcClientTotalAmount = (leftRightCountsGroupedByTreeHeight) => {
  const countsToRemove = fixLeftRightCountsAndGetCountsToRemove(
    leftRightCountsGroupedByTreeHeight
  );
  removeAddedCountsFromBottomToTop(
    leftRightCountsGroupedByTreeHeight,
    countsToRemove
  );
  // Then calc total amount (+=MIN(LEFT,RIGHT) * 2 * 7.5) with max 666
  return (
    leftRightCountsGroupedByTreeHeight.reduce((total, { left, right }) => {
      let min = Math.min(left, right);
      min = minimizeCount(min);
      return total + min;
    }, 0) *
    AMOUNT_TO_PAY_BY_CHILD *
    2
  );
};

module.exports = calcClientTotalAmount;
