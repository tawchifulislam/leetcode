/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function(coins, k) {
    function gcd(a, b) {
        while (b !== 0n) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);
    }

    const n = coins.length;
    const bigCoins = coins.map(c => BigInt(c));

    const subsets = [];
    const totalSubsets = 1 << n;

    for (let mask = 1; mask < totalSubsets; mask++) {
        let currentLcm = 1n;
        let setSize = 0;

        for (let i = 0; i < n; i++) {
            if ((mask & (1 << i)) !== 0) {
                currentLcm = lcm(currentLcm, bigCoins[i]);
                setSize++;
            }
        }

        const sign = (setSize % 2 === 1) ? 1n : -1n;
        subsets.push([currentLcm, sign]);
    }

    function countValid(x) {
        const bigX = BigInt(x);
        let count = 0n;

        for (const [lcmVal, sign] of subsets) {
            count += (bigX / lcmVal) * sign;
        }

        return count;
    }

    let low = 1n;
    let minCoin = BigInt(Math.min(...coins));
    let high = minCoin * BigInt(k);
    let ans = high;

    while (low <= high) {
        const mid = low + (high - low) / 2n;

        if (countValid(mid) >= BigInt(k)) {
            ans = mid;
            high = mid - 1n;
        } else {
            low = mid + 1n;
        }
    }

    return Number(ans);
};