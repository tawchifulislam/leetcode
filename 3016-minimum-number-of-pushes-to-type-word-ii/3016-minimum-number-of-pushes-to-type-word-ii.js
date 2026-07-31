/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    const counts = new Array(26).fill(0);
    for (let i = 0; i < word.length; i++) {
        counts[word.charCodeAt(i) - 97]++;
    }

    counts.sort((a, b) => b - a);

    let totalPushes = 0;

    for (let i = 0; i < 26; i++) {
        if (counts[i] === 0) break;
        const pushesNeeded = Math.floor(i / 8) + 1;
        totalPushes += counts[i] * pushesNeeded;
    }

    return totalPushes;
};