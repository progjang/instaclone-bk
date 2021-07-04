
require("dotenv").config();
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import { getUser } from "./users/users.utils";

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({req}) => {
        return {loggedInUser: await getUser(req.headers.token)};
    }
});

const PORT = process.env.PORT;

const app = express();
apollo.applyMiddleware({app});
app.use("/static", express.static("uploads"));
app.listen({port: PORT}, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/`);
});