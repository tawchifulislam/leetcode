/**
 * @param {number[]} stoneValue
 * @return {number}
 */
var stoneGameV = function(stoneValue) {
    const n = stoneValue.length;

    const prefixSum = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
    }

    function getSum(i, j) {
        return prefixSum[j + 1] - prefixSum[i];
    }

    const memo = Array.from({ length: n }, () => new Array(n).fill(-1));

    function solve(i, j) {
        if (i === j) return 0;

        if (memo[i][j] !== -1) return memo[i][j];

        let maxScore = 0;

        for (let k = i; k < j; k++) {
            const leftSum = getSum(i, k);
            const rightSum = getSum(k + 1, j);

            if (leftSum < rightSum) {
                maxScore = Math.max(maxScore, leftSum + solve(i, k));
            } else if (rightSum < leftSum) {
                maxScore = Math.max(maxScore, rightSum + solve(k + 1, j));
            } else {
                const keepLeft = leftSum + solve(i, k);
                const keepRight = rightSum + solve(k + 1, j);
                maxScore = Math.max(maxScore, keepLeft, keepRight);
            }
        }

        return memo[i][j] = maxScore;
    }

    return solve(0, n - 1);
};