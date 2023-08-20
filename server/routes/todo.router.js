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
    const checklist = req.body;
    const sqlText = `INSERT INTO "checklist" (name, due, done)
                     VALUES ($1, $2, $3)`;
    pool.query(sqlText, [checklist.name, checklist.due, checklist.done])
        .then((result) => {
            console.log(`Added task to database`, checklist);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error adding to database ${sqlText}`, err);
            res.sendStatus(500);
        })
})

// PUT

// DELETE from checklist
router.delete('/:id', (req, res) => {
    let { id } = req.params;
    const sqlText = `DELETE FROM "checklist" WHERE "id" = $1;`;
    pool.query(sqlText, [id])
        .then((result) => {
            console.log(`From database`, result);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making database query ${sqlText}`, err);
            res.sendStatus(500);
        })
})


module.exports = router;
