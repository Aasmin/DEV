// npm install express
const express = require("express");         //api making framework
const users = require("./db/user.json");
const fs = require("fs");
const app = express();
// get, post, patch, delete => express methods
// 127.0.0.1:3000 = http://localhost:3000/home
// get All=> admin
// get=> particular a user
// post => create  a user 
// update => update a user
// delete a user
// name, password, handle (for clients), image_url, bio, uid (for servers), email
app.use(express.json()); //to get the data in the body

// On Postman(Client) to test the method: Post > Body > Raw > JSON
app.post("/user", function (req, res) { //serverside
    let user = req.body;
    console.log(user);
    users.push(user);
    // saved to disk
    fs.writeFileSync("./db/user.json", JSON.stringify(users));
    // res
    res.status(201).json({
        status: "success",
        user: req.body
    })
})
app.listen(3000, () => {
    console.log("Server started at port 3000.")
})
