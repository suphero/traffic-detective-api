const { ApolloServer } = require("apollo-server-lambda");
const jwt = require('jsonwebtoken');
const typeDefs = require("../helpers/typedefs");
const resolvers = require("../helpers/resolvers");
const connectToMongoDB = require("../helpers/db");
const config = require("../config");

exports.handler = async function(event, context) {
  const db = await connectToMongoDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(db),
    context: ({ event }) => {
      const { headers } = event;
      const token = headers.authorization || '';
      if (!token) return;
      const user = jwt.verify(token, config.secret);
      return { user };
    }
  });
  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args));
    server.createHandler()(event, context, cb);
  });
};