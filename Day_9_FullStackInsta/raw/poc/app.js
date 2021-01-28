// npm install express
const express = require("express");         //api making framework
let userDB = require("./db/user.json");
const fs = require("fs");
// npm init -y
// npm i express uuid
const { v4: uuidv4 } = require('uuid');     //https://www.npmjs.com/package/uuid; v4 = key
const path = require("path");
const app = express();

// get, post, patch, delete => express methods
// 127.0.0.1:3000 = http://localhost:3000/home
// get All=> admin
// get=> particular a user
// post => create  a user 
// update => update a user
// delete a user
// name, password, handle (for clients), image_url, bio, uid (for servers), email
app.use(express.json()); // for accepting data in req.body

// On Postman(Client) to test the method: Post > Body > Raw > JSON
app.post("/user", (req, res) => { //serverside; /user is route
    let user = req.body;
    console.log(user);
    user.uid = uuidv4();    //adds the unique id
    userDB.push(user);
    // saved to disk
    // fs.writeFileSync("./db/user.json", JSON.stringify(userDB));  //relative path
    fs.writeFileSync(path.join(__dirname, "/db/user.json"), JSON.stringify(userDB)); //__dirname = default directory
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
    let userArr = userDB.filter((user) => {
        return user.uid == cUid;
    });
    console.log(req.params);
    res.status(201).json({
        status: "success",
        user: userArr.length == 0 ? "no user" : userArr[0]
    })
})

//getAll
app.get("/user", (req, res) => {
    // req paramatere -> user id
    // console.log(req.params);
    res.status(201).json({
        status: "success",
        userDB: userDB
    })
})


// delete => filter (Find karo > Array che pao baki de > Save to DB > return karo)
app.delete("/user/:uid", (req, res) => {
    let cid = req.params.uid;
    console.log(userDB.length);
    userDB = userDB.filter((user) => { return user.uid != cid; })
    fs.writeFileSync(path.join(__dirname, "/db/user.json"), JSON.stringify(userDB));
    res.status(200).json({
        status: "success",
        userDB,
        length: userDB.length
    })

})

// updated => key search 
app.patch("/user/:uid", (req, res) => {
    let user = getUserById(req.params.uid); 
    let toBeUpdatedObj = req.body;
    // user , obj
    // user.something
    for (let key in toBeUpdatedObj) {
        console.log(key);
        user[key] = toBeUpdatedObj[key];
    }
    fs.writeFileSync(path.join(__dirname, "/db/user.json"), JSON.stringify(userDB));
    res.status(200).json({
        status: "success",
        user: user
    })
})


// userDB.splice(idx,1);

app.listen(3000, () => {
    console.log("Server started at port 3000.")
})

function getUserById(cUid) {
    let userArr = userDB.filter((user) => {
        return user.uid == cUid;
    });
    return userArr[0];
} 
