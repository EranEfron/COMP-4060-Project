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
import { create } from "ipfs-http-client";

export async function connectToNetwork() {
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
export async function getFile(filename){
  console.log("in here")
  const network = await gateway.getNetwork('mychannel');
  let contract = await network.getContract('Project', 'MedicalRecordsContract');
  console.log("done")

  let isexist = await SmartContractUtil.evaluateTransaction('MedicalRecordsContract', 'medicalRecordsExists', filename, gateway);


    if(isexist == false){
        return {success:false, description:"Patient file is not found"}
    }

    let hash = await contract.createTransaction("readMedicalRecords")
            .submit(filename);
    hash = JSON.parse(hash.toString());
    let ret = '';
    for await(const buf of ipfs.cat(hash.hash))
    {
        ret += Buffer.from(buf).toString()
    }
    return {success:true, description:ret};
}
export async function uploadFile(patient, uploadby,file) {
  console.log("in network")
  const ipfs = await create({ host: "127.0.0.1", port: 5001, protocol: "http" });
  const patientArg = [patient]
  
  let isexist = await SmartContractUtil.evaluateTransaction('MedicalRecordsContract', 'medicalRecordsExists', patientArg, gateway);
  console.log("exist " + isexist.toString())
  console.log(file)
  console.log(typeof file);
  var fileAdded = await ipfs.add({
    content: file
  });
  let result;
  let sendString = fileAdded.cid.toString()
  console.log("he")
  const network = await gateway.getNetwork('mychannel');
  let contract = await network.getContract('Project', 'MedicalRecordsContract');
  console.log("he2")
  console.log(isexist.toString())
  console.log(isexist)
  if (isexist.toString() == "true") {
    result = await contract.createTransaction("updateMedicalRecords")
      .setTransient({ "hash": Buffer.from(sendString) })
      .submit(patient,uploadby);
    console.log(sendString)
  } else if (isexist.toString() == 'false') {
    console.log("in is not exist")
    result = await contract.createTransaction("createMedicalRecords")
      .setTransient({ "hash": Buffer.from(sendString) })
      .submit(patient,uploadby);
    console.log(sendString)
  }
  console.log(result)
  console.log("before")
  return result;
 
};
export async function invoke(isQuery, func, args) {
  
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
