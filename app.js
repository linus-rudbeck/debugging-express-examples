const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');

morgan.token('id', (req) => req.id);

const app = express();

app.use(assignId)

app.use(morgan(':id :method :status'))


app.get("/", (req, res) => {
    res.send("Hello my app");
})

app.post("/", (req, res) => {
    const r = Math.floor((Math.random() * 10) + 1);
    const x = Math.floor((Math.random() * 10) + 1);
    const y = Math.floor((Math.random() * 10) + 1);

    if (r <= 3) {
        res.status(500).send("Error app");
    }
    else if (r >= 7) {
        res.status(400).send("Invalid app");
    }
    else {
        res.status(201).send("Created my app");
    }
});

app.get("/time", (req, res) => {

    console.time("for");
    for (let i = 0; i < 100000000; i++) {
        Math.floor((Math.random() * 10) + 1);
    }
    console.timeEnd("for")


    console.time("while");
    let i = 0;
    while (i < 100000000) {
        Math.floor((Math.random() * 10) + 1);
        i++;
    }
    console.timeEnd("while")

    res.sendStatus(200);
});


app.get("/trace", (req, res) => {
    console.trace();
    res.send("trace");
})


app.get("/assert/:id", (req, res) => {
    const id = Number(req.params.id);
    
    console.assert(id % 2 == 0, "Id not even");

    if(!(id % 2 == 0)){
        console.log("Id not even");
    }

    // STMT 1 || STMT 2
    // Kör STMT 2 OM STMT 1 är false
    ((id % 2 == 0) || console.log("Id not even"));

    // STMT 1 && STMT 2
    // Kör STMT 2 OM STMT 1 är true
    ((id % 2 == 0) && console.log("Id is even"));

    res.send("assert");
})

app.get("/log/", (req, res) => {
    console.log(res);

    res.send("Logged")
})

function assignId(req, res, next) {
    req.id = uuid.v4();
    next();
}

app.listen(8000, () => {
    console.log('http://localhost:8000/');
})