const express = require("express");

const router = express.Router();

const subscribers = {};

router.post('/', function(req, res) {
    const { id } = req.body;
    console.log("New subscribe");
    req.on('close', () => delete subscribers[id])
    subscribers[id] = res;
});

router.post('/message', function(req,res) {
    const { body } = req;
    Object.keys(subscribers).forEach((subId) =>{
        subscribers[subId].json(body);
        delete subscribers[subId];
    });
    res.status(204).end();
});

module.exports = router;