import fs from 'fs';

const binaryDiagnostic = fs
  .readFileSync('day3/input.txt', {
    encoding: 'utf8',
  })
  .split(/\n/g);

let oxigenGenerator = binaryDiagnostic;

function binaryArrayToDecimal(array) {
  let n = '';
  array.forEach((bit) => (n = n + bit));
  return parseInt(n, 2);
}

for (let i = 0; i < oxigenGenerator[0].length; i++) {
  let sum = 0;
  oxigenGenerator.forEach((binary) => {
    if (binary[i] === '0') {
      sum--;
    } else {
      sum++;
    }
  });
  if (sum >= 0) {
    oxigenGenerator = oxigenGenerator.filter((binary) => binary[i] === '1');
  } else {
    oxigenGenerator = oxigenGenerator.filter((binary) => binary[i] === '0');
  }
  if (oxigenGenerator.length === 1) {
    break;
  }
}

let co2Scrubbing = binaryDiagnostic;

for (let i = 0; i < co2Scrubbing[0].length; i++) {
  let sum = 0;
  co2Scrubbing.forEach((binary) => {
    if (binary[i] === '0') {
      sum--;
    } else {
      sum++;
    }
  });
  if (sum >= 0) {
    co2Scrubbing = co2Scrubbing.filter((binary) => binary[i] === '0');
  } else {
    co2Scrubbing = co2Scrubbing.filter((binary) => binary[i] === '1');
  }
  if (co2Scrubbing.length === 1) {
    break;
  }
}

console.log(
  binaryArrayToDecimal(oxigenGenerator) * binaryArrayToDecimal(co2Scrubbing)
);
