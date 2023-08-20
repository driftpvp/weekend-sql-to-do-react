const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
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
// POST

// PUT

// DELETE

module.exports = router;
