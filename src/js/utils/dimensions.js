/**
 * Utility functions for dimensions
 * 
 * @author Carlos Domínguez García
 */

/** 
 * Video and images maximum dimensions. If we were to allow
 * arbitrary large video or images the app would be much slower
 */
export const MAX_DIMENSIONS = { width: 300, height: 300 };

/**
 * Returns whether the given dimensions are in the right bounds or not
 * 
 * @param {Object} dimensions {width, height} Dimensions to check
 * @returns Whether the given dimensions are in the right bounds or not
 */
export function areCorrectDimensions(dimensions) {
  return (
    dimensions.width > 0 &&
    dimensions.width <= MAX_DIMENSIONS.width &&
    dimensions.height > 0 &&
    dimensions.height <= MAX_DIMENSIONS.height
  );
}