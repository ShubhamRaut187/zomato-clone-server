// Configure environment variables to use them locally.
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Connected to backend server of Zomato Clone');
})

app.listen(process.env.PORT,()=>{
    console.log('========================================================================');
    console.log('Server connected successfully on port: ', process.env.PORT);
    console.log('========================================================================');
})