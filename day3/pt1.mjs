import fs from 'fs';

const binaryDiagnostic = fs
  .readFileSync('day3/input.txt', {
    encoding: 'utf8',
  })
  .split(/\n/g);

const gamma = [];

function binaryArrayToDecimal(array) {
  let n = '';
  array.forEach((bit) => (n = n + bit));
  return parseInt(n, 2);
}

for (let i = 0; i < binaryDiagnostic[i].length; i++) {
  let sum = 0;
  binaryDiagnostic.forEach((binary) => {
    if (binary[i] === '0') {
      sum--;
    } else {
      sum++;
    }
  });

  if (sum > 0) {
    gamma[i] = 1;
  } else {
    gamma[i] = 0;
  }
}

const epsilon = [];
gamma.forEach((bit) => (bit === 0 ? epsilon.push(1) : epsilon.push(0)));

console.log(binaryArrayToDecimal(gamma) * binaryArrayToDecimal(epsilon));
