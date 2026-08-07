/**
 * @param {string} num
 * @param {number} t
 * @return {string}
 */
var smallestNumber = function(num, t) {
    let tempT = BigInt(t);
    const required = [0, 0, 0, 0]; // count of factors [2, 3, 5, 7]
    const primes = [2n, 3n, 5n, 7n];

    for (let i = 0; i < 4; i++) {
        while (tempT % primes[i] === 0n) {
            required[i]++;
            tempT /= primes[i];
        }
    }

    if (tempT > 1n) return "-1";

    const digitFactors = [
        [0, 0, 0, 0], // 0
        [0, 0, 0, 0], // 1
        [1, 0, 0, 0], // 2
        [0, 1, 0, 0], // 3
        [2, 0, 0, 0], // 4
        [0, 0, 1, 0], // 5
        [1, 1, 0, 0], // 6
        [0, 0, 0, 1], // 7
        [3, 0, 0, 0], // 8
        [0, 2, 0, 0]  // 9
    ];

    function minDigitsNeeded(f2, f3, f5, f7) {
        f2 = Math.max(0, f2);
        f3 = Math.max(0, f3);
        f5 = Math.max(0, f5);
        f7 = Math.max(0, f7);

        let count = f5 + f7;
        let c8 = Math.floor(f2 / 3);
        f2 %= 3;
        let c9 = Math.floor(f3 / 2);
        f3 %= 2;

        if (f2 === 2) {
            count += 1;
            f2 = 0;
        } else if (f2 === 1 && f3 === 1) {
            count += 1;
            f2 = 0;
            f3 = 0;
        } else if (f2 === 1) {
            count += 1;
            f2 = 0;
        }

        if (f3 === 1) {
            count += 1;
            f3 = 0;
        }

        return count + c8 + c9;
    }

    function getSmallestSuffix(len, f2, f3, f5, f7) {
        const res = [];
        let remLen = len;

        for (let i = 0; i < len; i++) {
            for (let d = 1; d <= 9; d++) {
                const df = digitFactors[d];
                const nf2 = f2 - df[0];
                const nf3 = f3 - df[1];
                const nf5 = f5 - df[2];
                const nf7 = f7 - df[3];

                if (minDigitsNeeded(nf2, nf3, nf5, nf7) <= remLen - 1) {
                    res.push(d);
                    f2 = nf2;
                    f3 = nf3;
                    f5 = nf5;
                    f7 = nf7;
                    remLen--;
                    break;
                }
            }
        }
        return res.join('');
    }

    const n = num.length;
    const prefF = Array.from({ length: n + 1 }, () => [0, 0, 0, 0]);
    let zeroIdx = -1;

    for (let i = 0; i < n; i++) {
        const d = num.charCodeAt(i) - 48;
        if (d === 0) {
            zeroIdx = i;
            break;
        }
        for (let k = 0; k < 4; k++) {
            prefF[i + 1][k] = prefF[i][k] + digitFactors[d][k];
        }
    }

    // Check if the original num itself is valid (no zeros and product divisible by t)
    if (zeroIdx === -1) {
        const rem2 = required[0] - prefF[n][0];
        const rem3 = required[1] - prefF[n][1];
        const rem5 = required[2] - prefF[n][2];
        const rem7 = required[3] - prefF[n][3];
        if (minDigitsNeeded(rem2, rem3, rem5, rem7) <= 0) {
            return num;
        }
    }

    const maxI = zeroIdx !== -1 ? zeroIdx : n - 1;

    for (let i = maxI; i >= 0; i--) {
        const startD = (i === zeroIdx) ? 1 : (num.charCodeAt(i) - 48 + 1);

        for (let d = startD; d <= 9; d++) {
            const rem2 = required[0] - prefF[i][0] - digitFactors[d][0];
            const rem3 = required[1] - prefF[i][1] - digitFactors[d][1];
            const rem5 = required[2] - prefF[i][2] - digitFactors[d][2];
            const rem7 = required[3] - prefF[i][3] - digitFactors[d][3];

            const remLen = n - 1 - i;
            if (minDigitsNeeded(rem2, rem3, rem5, rem7) <= remLen) {
                const prefix = num.slice(0, i) + d;
                const suffix = getSmallestSuffix(remLen, rem2, rem3, rem5, rem7);
                return prefix + suffix;
            }
        }
    }

    const minNeeded = minDigitsNeeded(required[0], required[1], required[2], required[3]);
    const targetLen = Math.max(n + 1, minNeeded);
    return getSmallestSuffix(targetLen, required[0], required[1], required[2], required[3]);
};