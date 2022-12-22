//handle the recieve message sended from client and interact with fabric network
'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs'
import * as network from "./fabric/network.js"


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.post('/upload_file', async (req, res) => {

  let networkObj = await network.connectToNetwork();
  let response = await network.uploadFile(req.body.patientname, req.body.username, req.body.file);
  console.log(response);
  console.log("done");
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
})
app.post('/previewFile', async (req, res) => {
  let networkObj = await network.connectToNetwork();
  let response = await network.getFile(req.body.filename);
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
})
app.post('/getRecord', async (req, res) => {
  let networkObj = await network.connectToNetwork();
  const args = [req.body.filename, req.body.requestor];
  let response = await network.invoke(true, 'queryRecords', args);

  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
});

app.post('/authorize_user', async (req, res) => {
  console.log("in authorize")
  let username = req.body.username;
  let Auth_username = req.body.Auth_username;

  let networkObj = await network.connectToNetwork();
  const args = [username, Auth_username];
  let response = await network.invoke(false, 'authorizeUser', args);

  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
})
app.post('/update', async (req, res) => {
  let networkObj = await network.connectToNetwork();
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

app.post('/registerUser', async (req, res) => {
  let networkObj = await network.connectToNetwork()
  let username = req.body.username;
  let password = req.body.password;
  let identity = req.body.identity;
  let id = req.body.id;
  const args = [username, password, identity, id];

  let response = await network.invoke(false, 'registerUser', args);

  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    res.send(response);
  }
});
app.post('/queryUser', async (req, res) => {
  let networkObj = await network.connectToNetwork();
  let username = req.body.username;
  const args = [username];
  let response = await network.invoke(true, 'queryUser', args);
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
})
app.post('/Login', async (req, res) => {
  let networkObj = await network.connectToNetwork();
  let username = req.body.username;
  let password = req.body.password;
  let identity = req.body.identity;
  const args = [username, password, identity];
  let response = await network.invoke(true, 'validateLogin', args);

  res.send(response);
})
app.post('/queryCurrent_Auth', async (req, res) => {
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

app.post('/delete_auth', async (req, res) => {
  let networkObj = await network.connectToNetwork();
  const qArgs = [req.body.username, req.body.target_username];
  let response = await network.invoke(false, 'deleteAuthorizeUser', qArgs);
  if (response.error) {
    console.log('inside eRRRRR');
    res.send(response.error);
  } else {
    console.log('inside ELSE');
    res.send(response);
  }
})


app.listen(process.env.PORT || 8081);