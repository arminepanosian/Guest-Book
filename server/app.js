require("dotenv").config()
const PORT = process.env.APP_LISTEN || 3001
const url = "mongodb://localhost:27017";
const mongoose = require('mongoose');

const { ReviewsModel } = require('./schemes/schemes');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

mongoose.connect(url,);
const db = mongoose.connection;
db.on('error', () => { console.log('MongoDB connection error') });
db.once('open', () => { console.log('connected to MongoDB'); });


app.post("/add-review", async (req , res) => {
    try {
        const { name, password, disc } = req.body;
        const newRev = new ReviewsModel({
            name , password , disc
        })
        await newRev.save()
        res.status(200).json({"succes" : "succes"})
    }
    catch (err) {
        res.status(500).json({"err" : "err"})

        console.log(err);
    }
})

app.post("/delete-review", async (req, res) => {
    try {
        const { id, password } = req.body;
        console.log(password);

        const result = await ReviewsModel.findById(id);
        if (!result) {
            return res.status(404).json({ err: "invalid review" });
        }

        if (result.password !== password) {
            return res.status(400).json({ err: "invalid password" });
        }

        await ReviewsModel.deleteOne({ _id: id });
        res.status(200).json({ message: "the review was deleted" });
    } catch (err) {
        res.status(500).json({ err: "err" });
        console.log(err);
    }
});

app.get("/get" , async(req ,res)=>{
    try{
        const allReviews = await ReviewsModel.find({});
        res.status(200).json(allReviews);
    }
    catch(err){
        console.log(err);
    }
})

app.listen(PORT, () => {
    console.log(`the server is listening to ${PORT}`);
  });

