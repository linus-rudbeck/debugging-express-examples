const express = require('express');
const morgan = require('morgan');

const app = express();

morgan.token('type', (req, res) => { return req.headers['content-type']});

app.use(morgan(':method :url (:status) :type', { // 200 & 300
    skip: (req, res) => { return res.statusCode >= 400; }
}));

app.use(morgan('dev', {
    skip: (req, res) => { return res.statusCode < 400; }
}));


app.get("/", (req, res) => {
    res.send("Hello my app");
})

app.post("/", (req, res) => {
    const r = Math.floor((Math.random() * 10) + 1)

    if (r >= 5) {
        res.status(400).send("Invalid app");
    }
    else {
        res.status(201).send("Created my app");
    }
})

app.listen(8000, () => {
    console.log('http://localhost:8000/');
})