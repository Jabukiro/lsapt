//TODO: Expose mysql connection used by DBMan and use it for mysqlstore.

require('dotenv').config();
const session = require('express-session');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');
const https = require('https');
const fs = require('fs');
const { schema } = require('./schema');
const { NONAME } = require('dns');


var msqlConnOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
};
//Store to be used for session management
//TODO: Expose mysql connection used by DBMan and use it for mysqlstore.
let MySQLStore = require('express-mysql-session')(session);
let sessionStore = new MySQLStore(msqlConnOptions);
const DBMan = new DatabaseManager(msqlConnOptions);

//Attempt connection initiation
DBMan.connect().then((result) => { console.log(result) })
    .catch((err) => { console.log(err) })

/**
 * General Method for fetching a table field.
 * @param {string} queryOptions. Query options. Refer to Database Manager Select Query
 * @param {boolean} first_result Set to true to only return the first result.
 * @return {Promise} Promise of table details or Error.
 */
function getTable(queryOptions, first_result = false) {
    return DBMan.SelectQuery(queryOptions).then((result) => {
        if (result.length > 1 && !first_result) {
            return result;
        } else if (!first_result) {
            return result;
        } else {
            return result[0];
        }
    }).catch((err) => {
        console.log(err);
        return new Error(err);
    });
}
/**
 * General Method for creating a new field in a table.
 * @param {string} tableName Table to insert into
 * @param {{}} input Collection of {column, value}
 * @return {Promise} Promise of table details or Error.
 */
function createField(tableName, input) {
    return DBMan.InsertQuery(tableName, input).then((insertedId) => {
        return {
            id: insertedId,
            ...input
        };
    }).catch((err) => {
        console.log(err);
        return new Error(err);
    });
}

/**
 * Context function.
 * @param {object} req Request to server
 */
const context = async ({ req, res }) => {
    return { req, res, DBMan, getTable, createField };
};

const app = express();
app.use('/graphql',
    graphqlUploadExpress({
        maxFileSize: 10000000, // 10 MB
        maxFiles: 20,
    }),
    session({
        secret: process.env.SESSION_SECRET,
        name: process.env.SESSION_NAME,
        cookie: {
            sameSite: "none",
            httpOnly: true,
            secure: true,
            maxAge: 600000 // Time is in miliseconds
        },
        store: sessionStore,
        resave: false,
        saveUninitialized: true
    }),
    (req, res, next) => {
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    }
);

let apollo = null;
const CORS = { origin: ["https://lapt.localhost", "https://studio.apollographql.com"], credentials: "true" }
async function startServer() {
    console.log("Async Fucntion");
    apollo = new ApolloServer({
        uploads: false,
        schema,
        context: (object) => context(object)
    });
    await apollo.start();
    console.log("Apollo started");
    apollo.applyMiddleware({ app, cors: CORS });
}
startServer();
const server = https.createServer(
    {
        cert: fs.readFileSync(process.env.SSL_CERT),
        key: fs.readFileSync(process.env.SSL_KEY),
        passphrase: process.env.SSL_PASS
    },
    app
);

//Go
server.listen({ port: process.env.PORT }, () =>
    console.log(
        '🚀 Server ready at',
        `https://${process.env.HOSTNAME}:${process.env.PORT}${apollo.graphqlPath}`
    )
);