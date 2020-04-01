const cors = require("cors");
const express = require("express");
const messagesRouter = require("./routes/messages");
const subscribersRouter = require("./routes/subscribers");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/messages", messagesRouter);
app.use("/subscribers", subscribersRouter);

app.listen(5000, () => {
    console.info("listening....");
});
