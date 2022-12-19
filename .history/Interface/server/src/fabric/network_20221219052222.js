// //Import Hyperledger Fabric 1.4 programming model - fabric-network
'use strict';


// const fabricNetwork = require('fabric-network');
// const SmartContractUtil = require('./js-smart-contract-util.js');
// const os = require('os');
// const path = require('path');
// const { fileURLToPath } = require('url')
// const gateway = new fabricNetwork.Gateway();
// const ipgsClient = require("ipfs-http-client")
// import {create} from "ipfs-http-client";
import fabricNetwork from 'fabric-network';
import * as SmartContractUtil from './js-smart-contract-util.js';
import os from 'os';
import path from 'path';
const gateway = new fabricNetwork.Gateway();
import {create} from "ipfs-http-client";

export async function connectToNetwork () {
  try {
    const homedir = os.homedir();
    const walletPath = path.join(homedir, '.fabric-vscode', 'v2', 'environments', '1 Org Local Fabric', 'wallets', 'Org1');

    const identityName = 'Org1 Admin';
    let connectionProfile = await SmartContractUtil.getConnectionProfile();
    let wallet = await fabricNetwork.Wallets.newFileSystemWallet(walletPath);

    const discoveryAsLocalhost = SmartContractUtil.hasLocalhostURLs(connectionProfile);
    const discoveryEnabled = true;

    const networkObj = {
      wallet: wallet,
      identity: identityName,
      discovery: {
        asLocalhost: discoveryAsLocalhost,
        enabled: discoveryEnabled
      }
    };
    await gateway.connect(connectionProfile, networkObj);

  } catch (error) {
    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);
    let response = {};
    response.error = error;
    return response;
  } finally {
    console.log('Done connecting to network.');
    return "sucess"
  }
};

export async function uploadFile (patient, file){
  console.log("Im in here")
  const ipfs= await create({host:"127.0.0.1", port:5001, protocol:"http"});
  console.log("done1")
  // var fileAdded = await ipfs.add({
  //   content: file
  // });
  // var isUpdate = await contract.createTransaction("medicalRecordsExists")
  //   .submit(patient);
  // var isexist = await SmartContractUtil.evaluateTransaction('MedicalRecordsContract','medicalRecordsExists',patient,gateway);
  // console.log(isexist)
  // isUpdate = isUpdate.toString();
  // let success;
  // let sendString = fileAdded.cid.toString();
  // if (isUpdate === 'true') {
  //   success = await contract.createTransaction("updateMedicalRecords")
  //     .setTransient({ "hash": Buffer.from(sendString) })
  //     .submit(patient);
  //   console.log(sendString)
  // }
  // else if (isUpdate === 'false') {
  //   success = await contract.createTransaction("createMedicalRecords")
  //     .setTransient({ "hash": Buffer.from(sendString) })
  //     .submit(patient);
  // }
  // const worked = await contract.createTransaction("medicalRecordsExists")
  //   .submit(patient);
  // return success.toString();
};
export async function invoke (isQuery, func, args) {
  try {
    console.log(`isQuery: ${isQuery}, func: ${func}, args: ${args}`);
    if (isQuery === true) {
      if (args) {
        console.log('inside isQuery, args');
        let response1 = await SmartContractUtil.evaluateTransaction('MedicalRecordsContract', func, args, gateway);
        console.log(response1);
        console.log(`Transaction ${func} with args ${args} has been evaluated`);
        await gateway.disconnect();

        return response1;

      } else {
        let response = await SmartContractUtil.evaluateTransaction(func);
        console.log(`Transaction ${func} without args has been evaluated`);
        await gateway.disconnect();

        return response;
      }
    } else {
      console.log('notQuery');
      if (args) {
        console.log('notQuery, args');
        console.log(args);
        console.log('before submit');
        let response = await SmartContractUtil.submitTransaction('MedicalRecordsContract', func, args, gateway);
        console.log('after submit');
        console.log(response);
        console.log(`Transaction ${func} with args ${args} has been submitted`);

        await gateway.disconnect();

        return response;


      } else {
        let response = await SmartContractUtil.submitTransaction(func);
        console.log(response);
        console.log(`Transaction ${func} with args has been submitted`);

        awaitgateway.disconnect();

        return response;
      }
    }

  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return error;
  }
};
