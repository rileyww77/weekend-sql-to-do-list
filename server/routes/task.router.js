const express = require('express');
const router = express.Router();
const pg = require('pg');

// DB CONNECTION
const Pool = pg.Pool; // Class

// Connect Node to our database
const pool = new Pool({
    database: 'weekend-to-do-app', // name of our database
    host: 'localhost', 
    port: 5432, // this is the default port
    max: 10, // number of connections
    idleTimeoutMillis: 10000 // 10 seconds
});

//get request
router.get('/', (req, res) => {
    console.log('in get request');
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then(result => {
        // Sends back the results in an object
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting tasks', error);
            res.sendStatus(500);
        });
});

//post request
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('adding new task', newTask);
    //insert into database
    let queryText = `INSERT INTO "tasks" ("tasks", "notes", "completed") 
                    VALUES ($1, $2, $3)`;
    pool.query(queryText, [newTask.task, newTask.notes, newTask.completed])
        .then(result => {
            res.sendStatus(201);
        })
    .catch(error => {
        console.log(`Error adding new book`, error);
        res.sendStatus(500);
    })
});

//put request
router.put( '/:id', (req, res) =>{
    console.log('in PUT', req.body);
    let queryText = `UPDATE "tasks" 
                    SET "completed" = $1 
                    WHERE "id"=$2;`;
    let values = [req.body.completed, req.params.id]
    console.log(values);
    pool.query(queryText, values).then((results)=>{
        res.sendStatus(200);
    }).catch ((error) =>{
        console.log('error in put', error);
        res.sendStatus(500);
    })
})

//delete request



module.exports = router;