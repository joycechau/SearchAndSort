
function binarySearch(numbers, target) {
  if (numbers.length === 0) {
    return -1;
  }

  const midpoint = Math.floor(numbers.length / 2);

  if (target === numbers[midpoint]) {
    return midpoint;
  } else if (target < numbers[midpoint]) {
    const left = numbers.slice(0, midpoint);
    return binarySearch(left, target);
  } else {
    const right = numbers.slice(midpoint + 1);
    const subanswer = binarySearch(right, target);
    return subanswer === -1 ? -1 : subanswer + (midpoint + 1);
  }
}
