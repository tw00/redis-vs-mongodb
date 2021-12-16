import { createClient } from "redis";
import { unpack, pack } from "msgpackr";

export default ({ type }) => {
  const client = createClient({
    return_buffers: true,
  });

  client.on("error", (err) => console.log("Redis Client Error", err.message));

  const base = {
    name: "Redis",
    async connect() {
      await client.connect();
      console.log("Connected to Redis Server");
    },
    async close() {
      return client.disconnect();
    },
  };

  if (type === "stringify") {
    return {
      ...base,
      name: `${base.name}:stringify`,
      async insert(id, jsonData) {
        await client.set(id, JSON.stringify(jsonData));
      },
      async get(id) {
        const value = await client.get(id);
        return JSON.parse(value);
      },
    };
  }

  if (type === "msgpackr") {
    return {
      ...base,
      name: `${base.name}:msgpackr`,
      async insert(id, jsonData) {
        const buf = pack(jsonData);
        return client.set(id, buf);
      },
      async get(id) {
        const value = await client.getBuffer(id);
        return unpack(value);
      },
    };
  }

  if (type === "redis-json") {
    return {
      ...base,
      name: `${base.name}:redis-json`,
      async insert(id, jsonData) {
        return client.json.set(id, ".", jsonData);
      },
      async get(id) {
        const value = await client.json.get(id);
        return JSON.parse(value);
      },
    };
  }
};
