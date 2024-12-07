// Configure environment variables to use them locally.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Database Connection
const { databaseConnection } = require('./DatabaseConfigurations/config')

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Connected to backend server of Zomato Clone');
})

app.listen(process.env.PORT, async ()=>{
    try {
        await databaseConnection;
        console.log('========================================================================');
        console.log('Server connected successfully to database on port: ', process.env.PORT);
        console.log('========================================================================');
    } catch (error) {
        console.log('========================================================================');
        console.log('Failed to connect server & database on port: ', process.env.PORT);
        console.log('Connection error: ', error);
        console.log('========================================================================');
    }
})