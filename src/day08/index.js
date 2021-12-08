import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split(/\n/g).map((entry) => entry.split(" | "));

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .map((entry) => entry[1])
    .join(" ")
    .split(" ");
  let count = 0;
  input.forEach((digit) => {
    if (
      digit.length === 2 ||
      digit.length === 4 ||
      digit.length === 3 ||
      digit.length === 7
    ) {
      count++;
    }
  });
  return count;
};

const part2 = (rawInput) => {
  function difference(a, b) {
    return a.split("").filter((x) => !b.split("").includes(x));
  }
  function intersection(a, b) {
    return a.split("").filter((x) => b.split("").includes(x));
  }
  const input = parseInput(rawInput);
  let sum = 0;
  input.forEach((entry) => {
    const one = entry[0].split(" ").find((n) => n.length === 2);
    const four = entry[0].split(" ").find((n) => n.length === 4);
    const seven = entry[0].split(" ").find((n) => n.length === 3);
    const eight = entry[0].split(" ").find((n) => n.length === 7);
    const six = entry[0]
      .split(" ")
      .find((n) => n.length === 6 && intersection(n, one).length === 1);
    const five = entry[0]
      .split(" ")
      .find((n) => n.length === 5 && intersection(n, six).length === 5);
    const nine = entry[0]
      .split(" ")
      .find((n) => n.length === 6 && intersection(n, four).length === 4);
    const three = entry[0]
      .split(" ")
      .find((n) => n.length === 5 && intersection(n, one).length === 2);
    const two = entry[0]
      .split(" ")
      .find((n) => n.length === 5 && difference(n, five).length === 2);
    const zero = entry[0]
      .split(" ")
      .find(
        (n) =>
          n.length === 6 &&
          difference(n, one).length === 4 &&
          intersection(n, three).length === 4,
      );
    const dictionary = {
      0: zero,
      1: one,
      2: two,
      3: three,
      4: four,
      5: five,
      6: six,
      7: seven,
      8: eight,
      9: nine,
    };
    const number = [];
    entry[1].split(" ").forEach((n) => {
      function getKeyByValue(object, value) {
        return Object.keys(object).find(
          (key) =>
            object[key]
              .split("")
              .sort((a, b) => ("" + a).localeCompare(b))
              .join("") ===
            value
              .split("")
              .sort((a, b) => ("" + a).localeCompare(b))
              .join(""),
        );
      }

      if (getKeyByValue(dictionary, n)) {
        number.push(getKeyByValue(dictionary, n));
      }
    });
    sum += Number(number.join(""));
  });

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
                edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
                fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
                fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
                aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
                fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
                dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
                bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
                egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
                gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
      edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
      fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
      fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
      aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
      fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
      dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
      bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
      egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
      gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
      `,
        expected: 61229,
      },
      {
        input:
          "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
        expected: 5353,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
