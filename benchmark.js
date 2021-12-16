import { readFileSync } from "fs";
import { performance } from "perf_hooks";
import mongoClient from "./clients/mongo.js";
import redisClient from "./clients/redis.js";
import dummyClient from "./clients/dummy.js";
import chalk from "chalk";

const NUM = 10000;
const DUMMY_DATA = "./fixture/article.json";
// const DUMMY_DATA = "./fixture/test.json";

// run in parallel
async function testWrite(client, jsonData) {
  console.log(
    `Writing ${NUM} articles of size ~${JSON.stringify(jsonData).length} bytes`
  );
  const pList = [];
  for (let id = 0; id < NUM; id++) {
    const p = client.insert(String(id), jsonData);
    pList.push(p);
  }
  return Promise.all(pList);
}

async function testRead(client) {
  console.log(`Reading ${NUM} articles`);
  const pList = [];
  for (let id = 0; id < NUM; id++) {
    const p = client.get(String(id));
    pList.push(p);
  }
  return Promise.all(pList);
}

async function runTest(testCase, clientName, testFn) {
  const t0 = performance.now();
  await testFn();
  const t1 = performance.now();
  console.log(
    `-> ${clientName}/${testCase} took ${chalk.bold(
      Math.round(t1 - t0)
    )} milliseconds.`
  );
}

(async () => {
  const jsonData = JSON.parse(readFileSync(DUMMY_DATA, "utf-8"));

  const testClients = [
    mongoClient(),
    redisClient({ type: "stringify" }),
    redisClient({ type: "msgpackr" }),
    // redisClient({ type : "redis-json"}),
    dummyClient(),
  ];

  for (const client of testClients) {
    try {
      console.log("-".repeat(process.stdout.columns));

      await client.connect();
      await runTest("Write", client.name, async () =>
        testWrite(client, jsonData)
      );
      await runTest("Read", client.name, async () => testRead(client));
    } catch (error) {
      console.log("ERROR", error.message);
    } finally {
      // await client.cleanup();
      await client.close();
    }
  }
})();
