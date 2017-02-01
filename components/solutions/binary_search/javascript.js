
function binarySearch(array, target, low, high) {
  if (high < low) { return null; }

  var midpoint = Math.floor((low + high) / 2);

  if (array[midpoint] > target) {
    return binarySearch(array, target, low, midpoint - 1);
  }
  if (array[midpoint] < target) {
    return binarySearch(array, target, midpoint + 1, high);
  }

  return midpoint;
}
