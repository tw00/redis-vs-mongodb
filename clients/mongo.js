import { MongoClient } from "mongodb";

// TODO: Check if there is an index on _id

export default () => {
  const client = new MongoClient("mongodb://localhost:27017");
  const dbName = "perf";
  let collection = null;

  return {
    name: "MongoDB",
    async connect() {
      await client.connect();
      collection = client.db(dbName).collection("documents");
      console.log("Connected to MongoDB Server");
    },
    async close() {
      return client.close();
    },
    async insert(id, jsonData) {
      return collection.updateOne(
        { _id: id },
        { $set: jsonData },
        { upsert: true }
      );
    },
    async get(id) {
      const doc = await collection.findOne({ _id: id });
      return doc;
    },
  };
};
