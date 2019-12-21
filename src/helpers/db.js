const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const config = require("../config");

let cachedDb = null;
module.exports = () => {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  ObjectId.prototype.valueOf = function () {
    return this.toString();
  };
  return mongoose.connect(config.dbUri, { useNewUrlParser: true }).then(client => {
    cachedDb = client;
    return cachedDb;
  });
};