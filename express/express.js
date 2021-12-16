import express from "express";
import mongoClient from "../clients/mongo.js";
import redisClient from "../clients/redis.js";
import dummyClient from "../clients/dummy.js";

const app = express();
const port = 4005;

const testClients = {
  mongo: mongoClient(),
  "redis-1": redisClient({ type: "stringify" }),
  "redis-2": redisClient({ type: "msgpackr" }),
  dummy: dummyClient(),
};

function respondJSON(res, statusCode, message) {
  return res
    .writeHead(statusCode, { "Content-Type": "application/json" })
    .end(JSON.stringify(message, null, 2));
}

Object.keys(testClients).forEach((key) => {
  const client = testClients[key];
  client.connect();

  app.get(`/${key}`, async (req, res) => {
    const id = String(Math.round(Math.random() * 10000));
    const data = await client.get(id);

    return respondJSON(res, 200, { id, data });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
