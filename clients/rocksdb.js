import levelup from "levelup";
import rocksdb from "rocksdb";
import { unpack, pack } from "msgpackr";

export default () => {
  let db = null;

  return {
    name: "RocksDB",
    async connect() {
      db = levelup(rocksdb("./rocksdb"));
      console.log("Created local RocksDB");
    },
    async close() {
      db.close();
    },
    async insert(id, jsonData) {
      return new Promise((resolve, reject) => {
        db.put(id, pack(jsonData), (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    },
    async get(id) {
      return new Promise((resolve, reject) => {
        db.get(id, function (err, buf) {
          if (err) return reject(err);
          resolve(unpack(buf));
        });
      });
    },
  };
};
