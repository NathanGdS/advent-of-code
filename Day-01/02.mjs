import fs from "fs";

/*
--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
*/

const mapper = {};
const digits = [];
let totalSum = 0;

function readFile() {
  const filePath = "./input.txt";
  const data = fs.readFileSync(filePath, "utf-8");
  return data.split("\n");
}

const input = readFile();

for (let i = 0; i < input.length; i++) {
  const str = input[i];
  for (let j = 0; j < str.length; j++) {
    const element = Number(str[j]);
    if (Number.isInteger(element)) {
      Object.assign(mapper, {
        [str]: {
          values: mapper[str] ? [...mapper[str].values, element] : [element],
        },
      });
    }
  }
}

for (const key in mapper) {
  const values = mapper[key].values;
  const firstValue = values[0];
  const lastValue = values[values.length - 1];
  digits.push({
    key: Number(`${firstValue}${lastValue}`),
  });
}

for (const value of digits) {
  const key = value.key;
  totalSum += key;
}

console.log(totalSum);
