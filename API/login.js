let cfg = require('./config.json')
const express = require('express');
const router = express.Router();

const pool = require('./pool.js');

const jwt = require('jsonwebtoken');
const crypto = require('crypto')

// login route creating/returning a token on successful login
router.post('/', async(req, res) =>
{
    res.setHeader('Content-Type', 'application/json');

    let tableId = req.body.tableId;
    let menuItemsList = req.body.itemList;

    const orderId = crypto.randomUUID();
    const token = jwt.sign({ orderId: orderId, tableId: tableId }, "secret", { expiresIn: 60 * 60 });

    pool.query("insert into orders(orderId, status, orderDate, tableId, paymentReference, paymentToken, totalAmount) " +
        "values($1, $2, $3, $4, $5, $6, $7)",
        [orderId, 'ordered', new Date().toISOString(), tableId, "someRef", token, 10])
        .then(async () =>
        {
            //promises: only send token back when query has completely finished 
            let promises = [];

            for (let key in menuItemsList)
            {
                let itemId = menuItemsList[key].itemId;
                let count = menuItemsList[key].count;
                
                let promise = pool.query("insert into orderedItems(itemId, orderId, count) "+
                "values($1, $2, $3)",
                [itemId, orderId, count]);
                promises.push(promise);
            }
            
            for(let i = 0; i < promises.length; i++)
            {
                await promises[i];
            }

            res.status(200).json({ token: token });
        }); 
});

module.exports = router;
