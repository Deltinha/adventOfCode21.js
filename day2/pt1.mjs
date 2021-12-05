import fs from 'fs';

const movementsArray = fs
  .readFileSync('day2/input.txt', {
    encoding: 'utf8',
  })
  .split(/\n/g);

const position = [0, 0];

function move({ direction, step }) {
  if (direction === 'up') {
    position[1] -= step;
  }

  if (direction === 'down') {
    position[1] += step;
  }

  if (direction === 'forward') {
    position[0] += step;
  }
}

movementsArray.forEach((movement) => {
  const direction = movement.split(' ')[0];
  const step = Number(movement.split(' ')[1]);

  move({ direction, step });
});

console.log(position[0] * position[1]);
