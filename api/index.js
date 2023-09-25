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
    try{
        console.log("Connecting to Mongo");
        await mongoose.connect(process.env.MONGO_URL);

        if(
            !req.body.name || !req.body.description || !req.body.datetime || !req.body.price
        ){
            res.status(400).send("Missing Input Fields");
            return;
        }

    const {name, description,datetime,price} = req.body;
    const transaction = await Transaction.create({
        name, 
        description,
        datetime,
        price
    });
    

    res.json(transaction);
    }catch(error){
        console.log("Error connecting to Mongo", error);
        res.status(500).send("Internal Error");
    }

});

app.get('/api/transactions', async (req,res) =>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(4000);

//db pw: zNbRyJBKfepcn6kB