const express = require("express");

const router = express.Router();

const messages = [];

router.post("/", function (req, res) {
    const { body } = req;
    // console.log("new message", body.content);
    messages.push(body);
    res.status(204).end();
});

router.get("/", function (req, res) {
    res.json(messages);
});

module.exports = router;