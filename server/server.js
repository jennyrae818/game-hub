/* MAIN PACKAGES */
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

/* CONNECTION TO FILES */
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

/* DECLARATIONS */
const app = express();
const PORT = process.env.PORT || 3001;

/* APOLLO SERVER */
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

/* MIDDLEWARE */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// PRODUCTION (BUILD STATIC)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// HEROKU
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// APPLY SERVER
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Listening on localhost:${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

// CALL SERVER FUNCTION
startApolloServer(typeDefs, resolvers);