/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var smallestPalindrome = function(s, k) {
    const n = s.length;
    const freq = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        freq[s.charCodeAt(i) - 97]++;
    }

    const half = new Array(26).fill(0);
    let halfLen = 0;
    let midChar = '';

    for (let i = 0; i < 26; i++) {
        half[i] = Math.floor(freq[i] / 2);
        halfLen += half[i];
        if (freq[i] % 2 !== 0) {
            midChar = String.fromCharCode(97 + i);
        }
    }

    const MAX_K = 1000005;

    function countPermutations(cnt, total) {
        let res = 1;
        let rem = total;
        for (let i = 0; i < 26; i++) {
            const c = cnt[i];
            for (let j = 1; j <= c; j++) {
                res = Math.floor((res * (rem - c + j)) / j);
                if (res >= MAX_K) return MAX_K;
            }
            rem -= c;
        }
        return res;
    }

    if (countPermutations(half, halfLen) < k) {
        return "";
    }

    const leftHalf = [];
    
    for (let pos = 0; pos < halfLen; pos++) {
        for (let charIdx = 0; charIdx < 26; charIdx++) {
            if (half[charIdx] === 0) continue;

            half[charIdx]--;
            const count = countPermutations(half, halfLen - pos - 1);

            if (count >= k) {
                leftHalf.push(String.fromCharCode(97 + charIdx));
                break;
            } else {
                k -= count;
                half[charIdx]++;
            }
        }
    }

    const leftStr = leftHalf.join('');
    const rightStr = leftHalf.reverse().join('');

    return leftStr + midChar + rightStr;
};