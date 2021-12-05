import fs from 'fs';

const movementsArray = fs
  .readFileSync('day2/input.txt', {
    encoding: 'utf8',
  })
  .split(/\n/g);

const position = [0, 0];
let aim = 0;

function move({ direction, step }) {
  if (direction === 'up') {
    aim -= step;
  }

  if (direction === 'down') {
    aim += step;
  }

  if (direction === 'forward') {
    position[0] += step;
    position[1] += step * aim;
  }
}

movementsArray.forEach((movement) => {
  const direction = movement.split(' ')[0];
  const step = Number(movement.split(' ')[1]);

  move({ direction, step });
});

console.log(position[0] * position[1]);
