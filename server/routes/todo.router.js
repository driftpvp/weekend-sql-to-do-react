const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET checklist from db
router.get('/', (req, res) => {
    console.log("In GET request");
    const sqlText = `SELECT * FROM "checklist" ORDER BY due ASC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`Checklist back from database`, result);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`Error making database query ${sqlText}`, err);
            res.sendStatus(500);
        })
})
// POST new row to checklist
router.post('/', (req, res) => {
    const toDO = req.body;
    const sqlText = `INSERT INTO "checklist" (name, due, done)
                     VALUES ($1, $2, $3)`;
    pool.quesry(sqlText, [toDo.name, toDo.due, toDo.done])
        .then((result) => {
            console.log(`Added task to database`, toDo);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error adding to database ${sqlText}`, err);
            res.sendStatus(500);
        })
})

// PUT

// DELETE

module.exports = router;
