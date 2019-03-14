const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);

    const queryTest = 'SELECT * FROM "secret" WHERE $1 >= "secrecy_level";'

    const queryItem = [req.user.clearance_level]
    
    pool.query(queryTest, queryItem)
        .then(results => {
            console.log(results.rows);
            
            res.send(results.rows)
        })
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;