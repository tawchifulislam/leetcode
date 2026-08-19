/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {
    const reservedRows = new Map();

    for (const [row, col] of reservedSeats) {
        if (col >= 2 && col <= 9) {
            const currentMask = reservedRows.get(row) || 0;
            reservedRows.set(row, currentMask | (1 << (col - 1)));
        }
    }

    let totalFamilies = (n - reservedRows.size) * 2;

    // Bit positions for col - 1:
    // Left:   cols 2, 3, 4, 5 -> bits 1, 2, 3, 4 -> 0b00011110 = 30
    // Right:  cols 6, 7, 8, 9 -> bits 5, 6, 7, 8 -> 0b000111100000... wait,
    // Right:  cols 6,7,8,9   -> bits 5, 6, 7, 8 -> 0b111100000 = 480
    // Middle: cols 4, 5, 6, 7 -> bits 3, 4, 5, 6 -> 0b01111000 = 120
    const LEFT_MASK = 30;
    const RIGHT_MASK = 480;
    const MID_MASK = 120;

    for (const mask of reservedRows.values()) {
        const leftAvailable = (mask & LEFT_MASK) === 0;
        const rightAvailable = (mask & RIGHT_MASK) === 0;

        if (leftAvailable && rightAvailable) {
            totalFamilies += 2;
        } else if (leftAvailable || rightAvailable || (mask & MID_MASK) === 0) {
            totalFamilies += 1;
        }
    }

    return totalFamilies;
};