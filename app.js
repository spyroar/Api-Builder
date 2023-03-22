// const { application } = require('express');

const express=require('express')
const app=express();
const fs = require('fs');
const path = require('path');   
const routers = require('./routers/routes');
const db = require("./models/connect");

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(routers)

   app.listen(3000,()=>{

         console.log("Port is Running on 3000");
   })
