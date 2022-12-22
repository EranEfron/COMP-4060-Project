'use strict';
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// const util = require('util');
// const path = require('path');
// const fs = require('fs');
import express from 'express';
import bodyParser from'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs'
import * as network from "./fabric/network.js"

// let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

//use this identity to query
const appAdmin = config.appAdmin;

//get all assets in world state
app.get('/queryAll', async (req, res) => {
  console.log("LMHERE")
  let networkObj = await network.connectToNetwork(appAdmin);
  console.log("IM done")
  let response = await network.invoke(networkObj, true, 'queryAll', '');
  let parsedResponse = await JSON.parse(response);
  console.log("IN APPPPPPP>JS");
  console.log(parsedResponse);

  res.send(parsedResponse);

});
app.post('/upload_file', async(req,res) => {

  let networkObj = await network.connectToNetwork();
  let response = await network.uploadFile(req.body.username,req.body.file);
  console.log(response);
  console.log("done");
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
    console.log("after send")
  }
})
app.post('/download', async(req,res) =>{
  let networkObj = await network.connectToNetwork();
  let response
});
app.post('/authorize_user',async(req,res) =>{
  console.log("in authorize")
  let username = req.body.username;
  let Auth_username = req.body.Auth_username;

  let networkObj = await network.connectToNetwork();
  const args = [username,Auth_username];
  let response = await network.invoke(false, 'authorizeUser', args);
  
  console.log(response);
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
})
app.post('/update', async (req, res) => {
  let networkObj = await network.connectToNetwork(appAdmin);
  let vin = req.body.vin;
  let milage = req.body.milage;
  let ownerFirstName = req.body.ownerFirstName;
  let ownerLastName = req.body.ownerLastName;
  const args = [vin, milage, ownerFirstName, ownerLastName];
  let response = await network.invoke(networkObj, false, 'update', args);

  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    res.send(response);
  }
});
app.post('/addCar', async (req, res) => {
  let networkObj = await network.connectToNetwork(appAdmin);

  let vin = req.body.vin;
  let make = req.body.make;
  let model = req.body.model;
  let year = req.body.year;
  let milage = req.body.milage;
  let ownerFirstName = req.body.ownerFirstName;
  let ownerLastName = req.body.ownerLastName;
  const args = [vin, make, model, year, milage, ownerFirstName, ownerLastName];

  let response = await network.invoke(networkObj, false, 'add', args);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});
app.post('/registerUser', async (req, res) => {
  let networkObj = await network.connectToNetwork()
  console.log ("=====Network Obj" + networkObj);
  let username = req.body.username;
  let password = req.body.password;
  let identity = req.body.identity;
  let id = req.body.id;
  const args = [username,password,identity,id];
  console.log(args)

  let response = await network.invoke(false, 'registerUser', args);

  console.log("done invoke")
  console.log(response)

  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});
app.post('/queryUser', async(req,res) =>{
  let networkObj = await network.connectToNetwork();
  let username = req.body.username;
  const args = [username];
  let response = await network.invoke(true,'queryUser',args);
  res.send(response);
})
app.post('/Login', async(req,res) =>{
  let networkObj = await network.connectToNetwork();
  let username = req.body.username;
  let password = req.body.password;
  let identity = req.body.identity;
  const args = [username,password,identity];
  console.log(args);
  let response = await network.invoke(true, 'validateLogin', args);

  console.log("done invoke");
  console.log(response);
  res.send(response);
})
app.post('/queryCurrent_Auth',async (req,res) =>{
  let networkObj = await network.connectToNetwork();
  const qArgs = [req.body.username];
  let response = await network.invoke(true, 'queryAuthorizeUser', qArgs);
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
})

app.post('/delete_auth',async(req,res) => {
  let networkObj = await network.connectToNetwork();
  const qArgs = [req.body.username,req.body.target_username];
  let response = await network.invoke(false,'deleteAuthorizeUser',qArgs);
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
})
app.post('/queryByVim', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);

  let networkObj = await network.connectToNetwork(appAdmin);
  console.log('after network OBj');
  const qArgs = [req.body.vim];
  let response = await network.invoke(networkObj, true, 'query', qArgs);
  console.log("++")
  console.log(response);
  // response = JSON.parse(response);
  console.log(response);
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
});


app.listen(process.env.PORT || 8081);