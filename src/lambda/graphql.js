const { ApolloServer } = require("apollo-server-lambda");
const typeDefs = require("../helpers/typedefs");
const resolvers = require("../helpers/resolvers");
const connectToMongoDB = require("../helpers/db");

exports.handler = async function(event, context) {
  const db = await connectToMongoDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(db)
  });
  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args));
    server.createHandler()(event, context, cb);
  });
};