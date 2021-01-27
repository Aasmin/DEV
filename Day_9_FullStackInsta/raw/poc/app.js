// npm install express
const express = require("express");         //api making framework
const app = express();

// get, post, patch, delete => express methods
app.get("/home", function (req, res) {         // app = server, '/' = route means to reamin in home directory
    res.end("<h1>Hello from express!</h1>")
})

// 127.0.0.1:3000 = http://localhost:3000/home
app.listen(3000, () => {
    console.log("Server started at port 3000.")
})
