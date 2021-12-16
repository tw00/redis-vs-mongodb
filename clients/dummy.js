import { createClient } from "redis";
import { performance } from "perf_hooks";

export default () => {
  const inMemory = new Map();

  return {
    name: "InMemory",
    async connect() {
      console.log("- connected");
    },
    async close() {
      console.log("- close");
    },
    async insert(id, jsonData) {
      // console.log("- insert", id);
      inMemory.set(id, jsonData);
    },
    async get(id) {
      // console.log("- get", id);
      inMemory.get(id);
    },
  };
};
