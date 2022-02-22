//TODO: Expose mysql connection used by DBMan and use it for mysqlstore.

require('dotenv').config();
const session = require('express-session');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');
const https = require('https');
const http = require('http');
const fs = require('fs');
const { schema } = require('./schema');
const { DatabaseManager } = require('./databaseManager');
const Cart = require('./cartProduct');
const { logger } = require("./logger");


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
DBMan.connect().then((result) => {
    logger.log({
        level: "info",
        message: `DBMan: Connection ID: ${result}`
    });
})
    .catch((err) => {
        logger.log({
            level: "error",
            message: `DBMan: Error whilst initiaing connection ${err}`
        });
    })

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
        logger.log({
            level: "error",
            message: `getTable(): Error whilst Fetching table: ${err}`
        });
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
        logger.log({
            level: "error",
            message: `createField(): Error whilst adding new record to table: ${err}`
        });
        return new Error(err);
    });
}

/**
 * Context function.
 * @param {object} req Request to server
 */
const context = async ({ req, res }) => {
    return { req, res, DBMan, getTable, createField, Cart };
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
            httpOnly: false,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // Time is in miliseconds
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
const CORS = { origin: process.env.ORIGIN.split(", "), credentials: "true" };
async function startServer() {
    apollo = new ApolloServer({
        uploads: false,
        schema,
        context: (object) => context(object)
    });
    await apollo.start();
    apollo.applyMiddleware({ app, cors: CORS });
}
startServer();
const server = process.env.USE_SSL === "true" ?
    https.createServer(
        {
            cert: fs.readFileSync(process.env.SSL_CERT),
            key: fs.readFileSync(process.env.SSL_KEY),
            passphrase: process.env.SSL_PASS
        },
        app
    ) :
    http.createServer(app);

//Go
server.listen({ port: process.env.PORT }, () =>
    console.log(
        '🚀 Server ready at',
        `http${process.env.USE_SSL === "true" ? "s" : ""}://${process.env.HOSTNAME}:${process.env.PORT}${apollo.graphqlPath}`
    )
);