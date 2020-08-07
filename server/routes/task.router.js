const express = require('express');
const router = express.Router();
const pg = require('pg');

// DB CONNECTION
const Pool = pg.Pool; // Class

// Connect Node to our database
const pool = new Pool({
    database: 'weekend-to-do-app', // name of our database
    host: 'localhost', // where is your database?
    port: 5432, // this is the default port
    max: 10, // number of connections
    idleTimeoutMillis: 10000 // 10 seconds
});

//get request


//post request


//put request


//delete request



module.exports = router;