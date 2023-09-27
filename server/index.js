const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const messageRoutes = require('./routes/message.routes');

const app = express();

app.use(cors());

app.use(express.json())
app.use('/api/message', messageRoutes);

const port = 5000;
const url = 'mongodb+srv://veraksa161:ACzap8XOACWnMbgF@cluster0.byv3y2j.mongodb.net/?retryWrites=true&w=majority';

const start = async() => {
    try{
        await mongoose.connect(url);
        app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
    } catch(e) {
        console.dir(e)
    }
}

start();