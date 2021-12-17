import { createClient } from "redis";

export default () => {
  const inMemory = new Map();

  return {
    name: "InMemory",
    async connect() {
      console.log("Connected to Dummy");
    },
    async close() {
      console.log("Close");
    },
    async insert(id, jsonData) {
      inMemory.set(id, jsonData);
    },
    async get(id) {
      return inMemory.get(id);
    },
  };
};
