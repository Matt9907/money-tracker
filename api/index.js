const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const { default: mongoose } = require('mongoose');

const app = express();


app.use(cors());
app.use(express.json());



app.get('/api/test', (req,res) => {
    res.json('test:ok2');
});

app.post('/api/transaction',async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    try{
        console.log("Connecting to Mongo");

    const {name, description,datetime} = req.body;
    const transaction = await Transaction.create({name, description,datetime});
    

    res.json(transaction);
    }catch(error){
        console.log("Error connecting to Mongo", error);
        res.status(500).send("Internal Error");
    }

});

app.listen(4000);

//db pw: zNbRyJBKfepcn6kB