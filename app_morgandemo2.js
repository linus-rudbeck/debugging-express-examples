const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

const errorLogPath = path.join(__dirname, 'error.log');
const errorLogStream = fs.createWriteStream(errorLogPath, {
    flags: 'a'
});

const notFoundLogPath = path.join(__dirname, 'not-found.log');
const notFoundLogStream = fs.createWriteStream(notFoundLogPath, {
    flags: 'a'
});

const accessLogPath = path.join(__dirname, 'access.log');
const accessLogStream = fs.createWriteStream(accessLogPath, {
    flags: 'a'
});

app.use(morgan('dev'))

app.use(morgan('combined', { 
    stream: errorLogStream,
    skip: (req, res) => (res.statusCode < 500)
}));

app.use(morgan('combined', { 
    stream: notFoundLogStream,
    skip: (req, res) => (res.statusCode != 404)
}));

app.use(morgan('common', { 
    stream: accessLogStream
}));


app.get("/", (req, res) => {
    res.send("Hello my app");
})

app.post("/", (req, res) => {
    const r = Math.floor((Math.random() * 10) + 1)

    if (r <= 3) {
        res.status(500).send("Error app");
    }
    else if (r >= 7) {
        res.status(400).send("Invalid app");
    }
    else {
        res.status(201).send("Created my app");
    }
})

app.listen(8000, () => {
    console.log('http://localhost:8000/');
})