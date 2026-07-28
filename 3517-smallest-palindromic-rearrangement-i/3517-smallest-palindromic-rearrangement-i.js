/**
 * @param {string} s
 * @return {string}
 */
var smallestPalindrome = function(s) {
    const n = s.length;
    const halfLen = Math.floor(n / 2);

    const half = s.slice(0, halfLen).split('');

    half.sort();
    
    const sortedHalf = half.join('');
    const reversedHalf = half.reverse().join('');
    
    if (n % 2 !== 0) {
        const midChar = s[halfLen];
        return sortedHalf + midChar + reversedHalf;
    }
    
    return sortedHalf + reversedHalf;
};