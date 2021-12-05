import fs from 'fs';

const inputArray = fs
  .readFileSync('day1/input.txt', {
    encoding: 'utf8',
  })
  .split(/\n/g)
  .map(Number);

let n = 0;

function getLastThreeSum(i) {
  return inputArray[i] + inputArray[i - 1] + inputArray[i - 2];
}

for (let i = 3; i <= inputArray.length; i++) {
  if (getLastThreeSum(i) > getLastThreeSum(i - 1)) {
    n++;
  }
}

console.log(n);
