// npm install express
const express = require("express");         //api making framework
const users = require("./db/user.json");
const fs = require("fs");
// npm init -y
// npm i express uuid
const { v4: uuidv4 } = require('uuid');     //https://www.npmjs.com/package/uuid; v4 = key
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
app.post("/user", (req, res) => { //serverside; /user is route
    let user = req.body;
    console.log(user);
    user.uid = uuidv4();    //adds the unique id
    users.push(user);
    // saved to disk
    fs.writeFileSync("./db/user.json", JSON.stringify(users));
    // res
    res.status(201).json({
        status: "success",
        user: req.body
    })
})

// get => some changing parameter 
//getOne
app.get("/user/:uid", (req, res) => {   //":uid" - template route; agar pichhla change ho rea
    // req paramatere -> user id
    let cUid = req.params.uid;
    let userArr = users.filter((user) => {
        return user.uid == cUid;
    });
    console.log(req.params);
    res.status(201).json({
        status: "success",
        user: userArr.length == 0 ? "no user" : userArr[0]
    })
})

//getAll

// delete => filter
// updated => key search 
// users.splice(idx,1);

app.listen(3000, () => {
    console.log("Server started at port 3000.")
})
