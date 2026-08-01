/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function(nums) {
    const n = nums.length;
    const memo = new Map();

    function maxScoreDiff(left, right) {
        if (left === right) {
            return nums[left];
        }

        const key = `${left},${right}`;
        if (memo.has(key)) return memo.get(key);

        const pickLeft = nums[left] - maxScoreDiff(left + 1, right);
        const pickRight = nums[right] - maxScoreDiff(left, right - 1);

        const result = Math.max(pickLeft, pickRight);
        memo.set(key, result);
        return result;
    }

    return maxScoreDiff(0, n - 1) >= 0;
};