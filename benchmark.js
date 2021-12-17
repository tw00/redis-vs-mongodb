import { readFileSync } from "fs";
import { performance } from "perf_hooks";
import mongoClient from "./clients/mongo.js";
import redisClient from "./clients/redis.js";
import dummyClient from "./clients/dummy.js";
import rocksdbClient from "./clients/rocksdb.js";
import chalk from "chalk";

const NUM = 10000;
const BATCH_SIZE = 100;
const DUMMY_DATA = "./fixture/article.json";
// const DUMMY_DATA = "./fixture/test.json";

function* batch(num, batch_size) {
  for (let batch = 0; batch < num / batch_size; batch++) {
    yield Array.from({ length: batch_size }, (_, i) => batch * batch_size + i);
  }
}

// run in parallel
async function testWrite(client, jsonData) {
  console.log(
    `Writing ${NUM} articles of size ~${
      JSON.stringify(jsonData).length
    } bytes with batch size ${BATCH_SIZE}`
  );
  let t_sum = 0;
  for await (const idBatch of batch(NUM, BATCH_SIZE)) {
    const pList = [];
    const t0 = performance.now();
    for (const id of idBatch) {
      const p = client.insert(String(id), jsonData);
      pList.push(p);
    }
    await Promise.all(pList);
    const t1 = performance.now();
    t_sum += t1 - t0;
  }
  return t_sum / (NUM / BATCH_SIZE);
}

async function testRead(client) {
  console.log(`Reading ${NUM} articles`);
  let t_sum = 0;
  for await (const idBatch of batch(NUM, BATCH_SIZE)) {
    const pList = [];
    const t0 = performance.now();
    for (const id of idBatch) {
      const p = client.get(String(id));
      pList.push(p);
    }
    await Promise.all(pList);
    const t1 = performance.now();
    t_sum += t1 - t0;
  }
  return t_sum / (NUM / BATCH_SIZE);
}

async function runTest(testCase, clientName, testFn) {
  const t0 = performance.now();
  const t_avg = await testFn();
  const t1 = performance.now();
  console.log(
    `-> ${clientName}/${testCase} took ${chalk.bold(
      Math.round(t1 - t0)
    )} ms with an average of ${Math.round(t_avg * 100) / 100} ms/batch.`
  );
}

(async () => {
  const jsonData = JSON.parse(readFileSync(DUMMY_DATA, "utf-8"));

  const testClients = [
    mongoClient(),
    // redisClient({ type: "stringify" }),
    redisClient({ type: "msgpackr" }),
    //- redisClient({ type : "redis-json"}),
    rocksdbClient(),
    // dummyClient(),
  ];

  for (const client of testClients) {
    try {
      console.log("-".repeat(process.stdout.columns));

      await client.connect();
      await runTest("Write", client.name, () => testWrite(client, jsonData));
      await runTest("Read", client.name, () => testRead(client));
    } catch (error) {
      console.log("ERROR", error.message);
    } finally {
      // await client.cleanup();
      await client.close();
    }
  }
})();
