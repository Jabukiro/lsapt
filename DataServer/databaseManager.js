// Mysql Database

const mysql = require('mysql');
const debug = false;
const connection = { "host": "localhost", "user": "jabukiro", "password": "RikersIslandShallBeMyFortress11!", "database": "LAPT" };

/**
* Dummy Class which, all table will extend
*/
class Table {
}
/**
 * User Class. Represents the `user` table
 * @param {string} id The primary key
 * @param {string} user_name The user name for login
 * @param {string} password The authentication string
 * @param {string} type Either admin or staff
 * @param {string} fields List of all the fields
 */
class User extends Table {
    constructor(id, { user_name, password, type }) {
        super();
        this.id = id;
        this.user_name = user_name;
        this.password = password;
        this.type = type;
    }
}
class Admin extends User {
    constructor(id, { first_name, last_name, user_id }, user_info = {}) {
        super(null, user_info);
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_id = user_id;
    }
}
class Customer extends Table {
    constructor(id, { user_name, first_name }) {
        super();
        this.id = id;
        this.user_name = user_name;
        this.first_name = first_name;
    }
}
class Driver extends User {
    constructor(id, { first_name, last_name, user_id }, user_info = {}) {
        super(null, user_info);
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_id = user_id;
    }
}
class Order extends Table {
    constructor(id, { start_time, registered_via, registered_time, status, type, order_twin, registered_by, ordered_by, driver_id, from, to, customer_info, }) {
        super();
        this.id = id;
        this.start_time = start_time;
        this.registered_via = registered_via;
        this.registered_time = registered_time;
        this.status = status;
        this.type = type;
        this.order_twin = order_twin;
        this.registered_by = registered_by;
        this.ordered_by = ordered_by;
        this.driver_id = driver_id;
        this.from = from;
        this.to = to;
        this.customer_info = customer_info;
    }
}
class Staff extends User {
    constructor(id, { first_name, last_name, company_id, user_id }, user_info = {}) {
        super(null, user_info);
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.company_id = company_id;
        this.user_id = user_id;
    }
}
/**
 * 
 * @param {string} tableName The class of the table to load
 */
const loadTable = (tableName) => {
    switch (tableName) {
        case 'user':
            Class = User;
            break;
        case 'staff':
            Class = Staff;
            break;
        case 'admin':
            Class = Admin;
            break;
        case 'driver':
            Class = Driver;
            break;
        case 'order':
            Class = Order;
            break;
        case 'customer':
            Class = Customer;
            break;
    }
    return Class;
}
/**
 * MySQLjs wrapper for Database
 */
class DatabaseManager {
    /**
     * Create Connection
     * @param {string} host The hostname
     * @param {string} user The mysql user
     * @param {string} password The user's authentication string
     * @param {string} database The DataBase to use
     * @param {boolean} debug The DataBase to use
     * @public
     */
    constructor({ host, user, password, database }, debug = false) {
        this.givenConfig = {
            host: host,
            user: user,
            password: password,
            database: database
        };
        this.__innit(this.givenConfig);
        this.debug = debug;
    }

    //To be able to re-initialise this.db
    __innit(config) {
        this.db = mysql.createConnection(config);
        this.db.on('error', (e) => {
            console.log('db error', e);
            if (e.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                this.__handleDisconnect(config);                         // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
                throw e;                                  // server variable configures this)
            }
        });
    }
    /**
     * Initiate Connection
     */
    connect() {
        return new Promise(
            (resolve, reject) => {
                this.db.connect((error) => {
                    //Log Error at some point
                    if (error) {
                        return reject(error);
                    }
                    console.log('connected as id ' + this.db.threadId);
                    return resolve(this.db.state);
                });
            })
    }
    _comparatorValid(comparator) {
        let valid = false
        switch (comparator) {
            case "=":
                valid = true;
                break
            case ">":
                valid = true;
                break
            case "<":
                valid = true;
                break
            case ">=":
                valid = true;
                break
            case "<=":
                valid = true;
                break
        }
        return valid
    }
    /**
     * General Select Query on MySQL DB. Can specify custom query. Defaults to Simple select query with results orderd ASC on searched column.
     * @param {string} tableName The table for which the fields will belong. Needed for Default use
     * @param {string} term The search value to perform the look up with. Exact match. Needed for Default use
     * @param {string} column The column to perform the look up on. Default is id. Needed for Default use
     * @param {boolean} useDefaultQuery Specify to true to pass custom Query using bind parameters.
     * @param {string} customQuery Customised query. Not validated.
     * @param {array} bindParams Parameters to be bound to the query.
     * @return {[string]} Collections of {field: fieldValue}.
     */
    SelectQuery({ tableName, term, column = "id", useDefaultQuery = true, customQuery, bindParams }) {
        let query = '';
        if (useDefaultQuery) {
            query = `SELECT * FROM ?? WHERE ??=? ORDER BY ?? ASC`;
            const orderBy = column;
            bindParams = [tableName, column, term, orderBy];
        } else {
            query = customQuery;
        }
        return new Promise((resolve, reject) => {
            this.db.query(query, bindParams, (error, result) => {
                //Log Error at some point
                if (error) {
                    return reject(error);
                }
                //return result.length == 1 ? resolve(result[0]) : resolve(result);
                return resolve(result);
            });
        });
    }
    _insertQueryHelper(query, pattern, repeat) {
        if (repeat > 1) {
            query = this._insertQueryHelper(query, pattern, repeat - 1);
        }
        return query + pattern;
    }

    InsertQuery(tableName, input) {
        const baseQuery = "INSERT INTO ?? (";
        const inputKeys = Object.keys(input);
        let query
        // Build 'Insert' into part of query
        if (inputKeys.length > 1) {
            query = this._insertQueryHelper(baseQuery, '??,', inputKeys.length - 1);
            query += "??)";
        } else {
            query = baseQuery + "??)";
        }

        //Build 'Values' part of query
        query += " Values (";
        if (inputKeys.length > 1) {
            query = this._insertQueryHelper(query, '?,', inputKeys.length - 1);
            query += "?)";
        } else {
            query = query + "?)";
        }
        /* Uncoment to test query building
        console.log(query);
        return query
        */
        //Build Parameters.
        let parameters = [tableName];
        inputKeys.map((currentValue) => { parameters.push(currentValue); });
        Object.values(input).map((currentValue) => { parameters.push(currentValue); });

        //Insert query
        return new Promise((resolve, reject) => {
            this.db.query(query, parameters, (error, result) => {
                //Log Error at some point
                if (error) {
                    return reject(error);
                }
                if (result === null) {
                    return reject(new Error(`MySQL did not return anything after insert query`));
                }
                //console.log("Returned inserted ID", result.insertId);
                return resolve(result.insertId);
            });
        });
    }

    UpdateQuery(tableName, update, equalityCondition) {
        const baseQuery = "UPDATE ?? SET ";
        const queryTail = "??=? WHERE ??=?";
        const updateKeys = Object.keys(update);
        const updateValues = Object.values(update);
        let query = "";
        // Build 'column=value' pairs to update
        if (updateKeys.length > 1) {
            query = this._insertQueryHelper(baseQuery, '??=?, ', updateKeys.length - 1);
            query += queryTail;
        } else {
            query = baseQuery + queryTail;
        }

        //Build Parameters.
        //[Table,Column1,Value1,Column2,Value2...] Pattern
        let parameters = [tableName];
        for (let i = 0; i < updateKeys.length; i++) {
            parameters.push(updateKeys[i]);
            parameters.push(updateValues[i]);
        }
        parameters.push(equalityCondition.name);
        parameters.push(equalityCondition.value);
        //console.log(query);
        //console.log(parameters);
        return new Promise((resolve, reject) => {
            this.db.query(query, parameters, (error, result) => {
                //Log Error at some point
                if (error) {
                    return reject(error);
                }
                if (result === null) {
                    return reject(new Error(`MySQL did not return anything after update query`));
                }
                return resolve(result);
            });
        });
    }

    DriverNotified(driverID, lastChecked) {
        let query = "SELECT id FROM order WHERE registered_time >= ?";
        return new Promise((resolve, reject => {
            this.db.query(query, [lastChecked])
        }))
    }

    //Handles when connection is dropped probz due to Idle timeout
    //Doesn't yet handle retrying connetion when mysql.connect doesn't succeed.
    __handleDisconnect(config) {
        console.log("Handling disconnection.");
        this.db.destroy();
        //Generate New Connection
        this.__innit(config);
        this.connect().then((state) => { console.log("Disconnection handled succesfully. Current state:", state) })
            .catch((e) => { console.log("Disconnection Not handled succefully. Error received: ", e) })
    }
    end() {
        this.db.end();
    }
}
exports.DatabaseManager = DatabaseManager;
exports.loadTable = loadTable;

if (debug == true) {
    console.log("Debug mode on...");
    const DBManager = new DatabaseManager(connection, true);
    //Attempt connection initiation
    DBManager.connect().then((result) => { console.log(result) })
        .catch((err) => { console.log(err) })
    DBManager.SelectQuery({ tablename: "store", term: 1 }).then((result) => { console.log(result); })
        .catch((err) => { console.log(err); });
    console.log("about to end DB connection")
    DBManager.end();
}