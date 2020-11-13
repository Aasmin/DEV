//npm init -y
//npm install express
//npm install socket.io 
// npm install electron-packager -g
// Install scripts from: https://www.christianengvall.se/electron-packager-tutorial/ 
//To start server: node app

// api  
const express = require('express');
const app = express();  //server ko app kehte hein

//  nodejs module
const httpServer = require('http').createServer(app);
//  socket enbaled server 
const io = require('socket.io')(httpServer);
io.on("connection", function (socket) {
    console.log("New client connected");
    console.log(socket.id);
    socket.on("color", function (color) {   //event listener
        console.log(data);
        socket.broadcast.emit('colorchange', color);
    })
})
socket.on("md", function (point) {
    socket.broadcast.emit("onmd", point);
})
socket.on("mm", function (point) {
    socket.broadcast.emit("onmm", point);
})

// app.get("/home", function (req, res) {   //127.0.0.1 = localhost
//     res.end("<h1>Welcome to home Page</h1>")
// })

//  connection - server machine hai jo listen krti | 3000 = port 
let port = process.env.PORT || 3000;
httpServer.listen(port, function () {
    console.log("Server started at port 3000");
}) 

//Types of request: Get, Post, Patch(Update), Delete

  