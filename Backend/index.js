const express = require("express");
const http = require("http")

const port = 8000;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from welcome page");
});

app.get("/about", (req, res) => {
    console.log(`Query params are there ${req.query}`);
    res.send("Hello from about page");
});

// http.createServer(app);

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});