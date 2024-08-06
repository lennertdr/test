const express = require("express");
const path = require('path');

const app = express();


app.get('/', (req, res) => {
    res.render(
        "public/login.html"
    );
});

//404
app.use((req, res) => {
    res.status(404);
    res.send(
        `<h1>404, page not found...</h1>`
    );
})

app.listen(3000, () => {
    console.log("listening on 3000")
});