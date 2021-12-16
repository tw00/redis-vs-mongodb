import { pack } from "msgpackr";
import { readFileSync } from "fs";

const DUMMY_DATA = "./fixture/article.json";
const NUM = 10000;

const data = readFileSync(DUMMY_DATA, "utf-8");
const jsonData = JSON.parse(data);

function printMemoryDiff(before) {
  const used = process.memoryUsage();
  for (let key in used) {
    const spaces = " ".repeat(20 - key.length);
    const mbStr =
      Math.round(((used[key] - before[key]) / 1024 / 1024) * 100) / 100;
    const sign = used[key] - before[key] ? "+" : "";
    console.log(`${key}${spaces}${sign}${mbStr} MB`);
  }
}

console.log(`One article: ${Math.round(data.length / 1024)} kB`);
console.log(
  `Estimate for ${NUM} articles: ${Math.round(
    (NUM * data.length) / 1024 / 1024
  )} MB`
);
const before = process.memoryUsage();

const memory = [];
for (let i = 0; i < NUM; i++) {
  jsonData.id = Math.round(Math.random() * 1000000);
  memory.push(pack(jsonData));
}

console.log(`Memory usage after loading ${NUM} articles into memory:`);
printMemoryDiff(before);
