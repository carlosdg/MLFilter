// Video and images maximum dimensions. If we were to allow
// arbitrary large video or images the app would be much slower
export const MAX_DIMENSIONS = { width: 500, height: 500 };

function areCorrectDimensions(dimensions) {
  return (
    dimensions.width > 0 &&
    dimensions.width <= MAX_DIMENSIONS.width &&
    dimensions.height > 0 &&
    dimensions.height <= MAX_DIMENSIONS.height
  );
}

export default {
  MAX_DIMENSIONS,
  areCorrectDimensions
}