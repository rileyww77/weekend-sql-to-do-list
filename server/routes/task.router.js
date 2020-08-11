const express = require('express');
const router = express.Router();
const pg = require('pg');



let config = {};

if (process.env.DATABASE_URL) {
    
    const params = url.parse(process.env.DATABASE_URL);
    const auth  = params.auth.split(':');
    
    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true,
        max:10,
        idleTimeoutMillis: 30000,
    }
} else {
    config = {
        database: 'weekend-to-do-app', // name of database
        host: 'localhost', 
        port: 5432, 
        max: 10, // number of connections
        idleTimeoutMillis: 10000 // 10 seconds
    };
}

// Connect Node to our database
const pool = new pg.Pool(config);

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
});//end get request

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
});//end post request

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
})//end put request

//delete request
router.delete('/:id', (req,res)=>{
    console.log('/items delete, deleting:', req.params.id);
    let queryText = `DELETE FROM "tasks"
                    WHERE "id"=$1;`;
    pool.query(queryText, [req.params.id]).then((response)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error deleting', error);
        res.sendStatus(500);
    });
})//end delete request


module.exports = router;