const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());



app.get('/api/test', (req,res) => {
    res.json('test:ok2');
});

app.post('/api/transaction',async (req,res) => {
    try{
        console.log("Connecting to Mongo");

    const {name, description,datetime} = res.body;
    

    res.json(req.body);
    }catch(error){
        console.log("Error connecting to Mongo", error);
        res.status(500).send("Internal Error");
    }

});

app.listen(4000);

//db pw: zNbRyJBKfepcn6kB