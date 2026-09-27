const { randomInt } = require("node:crypto");
const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

async function main() {
  const secretNumber = randomInt(1, 101);
  let attempts = 0;
  const terminal = readline.createInterface({ input: stdin, output: stdout });
  const answers = terminal[Symbol.asyncIterator]();

  console.log("I'm thinking of a number between 1 and 100.");

  try {
    while (true) {
      stdout.write("Your guess: ");
      const { value: answer, done } = await answers.next();
      if (done) {
        break;
      }

      const guess = Number(answer.trim());

      if (!Number.isInteger(guess)) {
        console.log("Please enter a whole number.");
        continue;
      }

      if (guess < 1 || guess > 100) {
        console.log("Please enter a number between 1 and 100.");
        continue;
      }

      attempts += 1;

      if (guess < secretNumber) {
        console.log("Too low.");
      } else if (guess > secretNumber) {
        console.log("Too high.");
      } else {
        console.log(`Correct! You got it in ${attempts} attempts.`);
        break;
      }
    }
  } finally {
    terminal.close();
  }
}

main();