require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { ApolloServerPluginCacheControl } = require('@apollo/server/plugin/cacheControl');
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./src');
const prisma = require('./src/prisma');

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginCacheControl({
            // Cache everything for 1 second by default.
            defaultMaxAge: 1,
            // Don't send the `cache-control` response header.
            calculateHttpHeaders: false,
        })
    ]
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);

async function main() {
    await server.start();

    app.use(
        '/',
        cors(),
        // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
        bodyParser.json({ limit: '50mb' }),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: async ({ req }) => ({
                token: req.headers.token,
                // passing our prisma connection for re-use
                prisma
            }),
        })
    );
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀  Server ready at http://localhost:4000/`);
}

main();
