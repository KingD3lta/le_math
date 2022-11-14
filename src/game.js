import { createInterface } from "readline";
import chalk from "chalk";

//state vars
let lives = 5;
let points = 0;
let pointsMax = 10;

//interface creation
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

//shorthand funcs
const rand = (n) => {
  return Math.floor(Math.random() * n) + 1;
};
const genOp = (a, b) => {
  return (a - b) & 1 ? "+" : "-";
};

//main func
const genQ = () => {
  let a = rand(10);
  let b = rand(10);
  let op = genOp(a, b);
  while (a + b > 10 || a - b < 0) {
    a = rand(10);
    b = rand(10);
  }
  let corr = op == "+" ? a + b : a - b;
  if (points < pointsMax && lives > 0) {
    rl.question(`${a}${op}${b} = `, (ans) => {
      if (ans == corr) {
        console.log(chalk.green.bold("Correct!"));
        points++;
        console.log(`You have ${chalk.green(`${points}`)} points`);
      }
      if (ans != corr) {
        console.log(chalk.red.bold("Wrong Answer!"));
        console.log(`Your Answer: ${ans} Correct Answer: ${corr}`);
        lives--;
        console.log(`${lives} Lives left`);
      }
      genQ();
    });
  } else if (points == pointsMax) {
    console.log(
      `You earned ${chalk.green(
        points
      )} Points\nYou've earned yourself 30 mins of Minecraft! ${chalk.magenta(
        "Congrats! <3"
      )}`
    );
    rl.close();
  } else {
    console.log(chalk.redBright.bold("GAME OVER"));
    console.log(
      `You earned ${chalk.green.bold(points)} points this time! Great Work!`
    );
    rl.close();
  }
};
genQ();
