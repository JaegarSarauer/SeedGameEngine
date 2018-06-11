/**
 * Converts degrees to radians.
 * 
 * @param {number} deg A number in degrees.
 */
export const degToRad = (deg) => {
    return (deg / 180) * Math.PI;
}

/**
 * Converts radians to degress.
 * 
 * @param {number} rad A number in radians.
 */
export const radToDeg = (rad) => {
    return (deg / Math.PI) * 180;
}