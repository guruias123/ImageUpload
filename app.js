const express = require('express')
const app = express();
const mongo = require('mongodb');
const { connection } = require('mongoose');
const bodyParser = require('body-parser')
const MongoClient = mongo.MongoClient
const uri = "mongodb+srv://venky:venkateshA1@cluster0.bxnfz.mongodb.net/?retryWrites=true&w=majority";
let db;
const multer = require('multer');

// const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const axios = require('axios')
const cors = require('cors')
// app.use(express.json())
app.use(cors())
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
// app.use(bodyParser.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.post('/image',(req,res) => {
    db.collection('images').insert(req.body,(err,result) => {
        if(err) throw err;
        res.status(200).send("Data Added")
    })
});

app.get('/image',(req,res)=>{
    db.collection('images').find().toArray((err,result)=>{
        res.send(result)
    })
})

const port = 3004

MongoClient.connect(uri, (err,connection)=>{
    if(err) throw err
    db = connection.db("test")

    console.log('mongodb connection successfully done');
    app.listen(port,()=>{
        console.log(`server is running on port no ${port}`);
    })
})