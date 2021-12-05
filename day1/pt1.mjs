import fs from 'fs';

const inputArray = fs
  .readFileSync('day1/input.txt', {
    encoding: 'utf8',
  })
  .split(/\n/g)
  .map(Number);

let n = 0;

for (let i = 1; i <= inputArray.length; i++) {
  if (inputArray[i] > inputArray[i - 1]) {
    n++;
  }
}

console.log(n);
