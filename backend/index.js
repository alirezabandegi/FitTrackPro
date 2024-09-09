const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const UsersModel = require("./models/users")
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

//MongoDB connection
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, { dbName: "FitTrackProDB"});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.post("/logIn", (req, res) => {
    const {email, password} = req.body;
    UsersModel.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.status(200).json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.status(404).json("No record existed")
        }
    })
})

app.post("/signUp", (req, res) => {
    UsersModel.create({...req.body, created_at: Date.now(), updated_at: Date.now()})
    .then(Users => res.json(Users))
    .catch(err => res.status(404).json(err))
})

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}.`));