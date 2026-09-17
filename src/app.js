const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello From The Sever !!!")
})
app.use("/hello", (req, res) => {
    res.send("Hello !!!")
})

app.listen(3000 , () => {
    console.log("Server is Running Successfully Listening on PORT : 3000")
});