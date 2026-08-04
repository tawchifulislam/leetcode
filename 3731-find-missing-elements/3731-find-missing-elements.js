/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findMissingElements = function(nums) {
    const minVal = Math.min(...nums);
    const maxVal = Math.max(...nums);

    const present = new Set(nums);
    const missing = [];

    for (let i = minVal; i <= maxVal; i++) {
        if (!present.has(i)) {
            missing.push(i);
        }
    }

    return missing;
};