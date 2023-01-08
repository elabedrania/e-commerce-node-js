const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('./config/connect');

const BodyParser = require('body-parser')
    //import mongoose db 3rd party model and nosql database language
const mongoose = require('mongoose');


const app= express();

app.use(cors());

app.use(BodyParser.json());

    //Routes
    app.use('/user', require('./routes/Auth.js'));
    app.use('/product', require('./routes/produit.js'));
    app.use('/support', require('./routes/support.js')); // contact
    app.use('/commande', require('./routes/commande'))

    
    app.listen(3000, () => console.log("Server Running..."))