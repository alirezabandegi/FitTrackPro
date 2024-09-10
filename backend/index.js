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
    UsersModel.findOne({ email : email })
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json({ data:"Success", user: user })
            }else{
                res.json("Email or password is invalid")
            }
        }else{
            res.json("Email or password is invalid")
        }
    })
    .catch(err => res.status(500).json(err));
})

app.post("/signUp", (req, res) => {
    const { email } = req.body;
    UsersModel.findOne({ email : email })
    .then(user => {
        if(user) {
            res.json("Account already exist!");
        }else{
            UsersModel.create({...req.body, created_at: Date.now(), updated_at: Date.now()})
            .then(Users => res.json(Users))
            .catch(err => res.status(404).json(err))
            res.json("Success");
        }
    })
    .catch(err => res.status(500).json(err));
})

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}.`));