export const javascriptDefault = `
/**
 * Problem: Binary Search: Search a sorted array for a target value.
 */

// Time: O(log n)
const binarySearch = (arr, target) => {
  return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
  if (start > end) {
    return false;
  }
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === target) {
    return mid;
  }
  if (arr[mid] < target) {
    return binarySearchHelper(arr, target, mid + 1, end);
  }
  return binarySearchHelper(arr, target, start, mid - 1);
};

let input = '';

process.stdin.on('data', chunk => {
  input += chunk;
});

process.stdin.on('end', () => {
  const target = parseInt(input.trim(), 10);
  const arr = [1, 2, 2, 4, 5, 7, 8, 9, 10];
  const result = binarySearch(arr, target);
  console.log(result !== false ? \`Target found at index \${result}\` : 'Target not found');
});
`;
