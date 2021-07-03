
//importing

import express from 'express';
import  mongoose from 'mongoose';
import Messages from './dbMessages.js';

// app config
const app = express(); // create our application and allow us to write api stuff
const port = process.env.PORT || 9001

//DB config
const connection_url = 'mongodb+srv://adim:mysecondproject@cluster1.05hmx.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//middleware
app.use(express.json());



// api route

app.get('/', (req, res) => {
    res.status(200).send('hello word')
})

app.get('/messages/sync', (req, res)=>{
    Messages.find((err, data)=> {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    }
)})


app.post('/messages/new', (req, res)=>{
    const dbMessage= req.body
    Messages.create(dbMessage, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})


//Listen

app.listen(port, ()=>{
    console.log(`listening on localhost:${port}`)
})