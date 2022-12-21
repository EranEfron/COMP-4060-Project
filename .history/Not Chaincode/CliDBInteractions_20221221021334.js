import {create} from "ipfs-http-client";
import * as fabricNetwork from 'fabric-network';
import * as os from 'os';
import * as fs from 'fs';
const gateway = new fabricNetwork.Gateway();
await connect();
const network = await gateway.getNetwork('mychannel');
let contract = await network.getContract('Project','MedicalRecordsContract');
const ipfs= await create({host:"127.0.0.1", port:5001, protocol:"http"});


export async function connect() {
    try {    
        const identityName = 'Org1 Admin';
        let connectionProfile = fs.readFileSync("./ProjectEnvironmentOrg1GatewayConnection.json", "utf8");
        connectionProfile = JSON.parse(connectionProfile);
        let wallet = await fabricNetwork.Wallets.newFileSystemWallet("./Org1Wallet");

        const discoveryAsLocalhost = true;
        const discoveryEnabled = true;
    
        const networkObj = {
          wallet: wallet,
          identity: identityName,
          discovery: {
            asLocalhost: discoveryAsLocalhost,
            enabled: discoveryEnabled,
            strategy: fabricNetwork.DefaultQueryHandlerStrategies.MSPID_SCOPE_SINGLE
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
}

export async function uploadFile(patient, file) {// potentially add contract as a parameter, if connection is handled elsewhere
    //upload file to IPFS using IPFS api
    var fileAdded = await ipfs.add({
        path: "./success.txt",
        content: Buffer.from(file)
    });
    
    var isUpdate = await contract.createTransaction("medicalRecordsExists")
        .submit(patient);
    isUpdate = isUpdate.toString();
    // console.log(isUpdate)
    // const isUpdate = true;
    let success;
    let sendString = fileAdded.cid.toString()
    

    if(isUpdate === 'true') 
    {
        success = await contract.createTransaction("updateMedicalRecords")
            .setTransient({"hash":Buffer.from(sendString)})
            .submit(patient);
        // console.log(sendString)
        // console.log("Updated");
    }
    else if (isUpdate === 'false')
    {
        success = await contract.createTransaction("createMedicalRecords")
            .setTransient({"hash":Buffer.from(sendString)})
            .submit(patient);
        // console.log(sendString)
        // console.log(success.toString());
    }
    // console.log(fileAdded.cid);//so I can find the file on my ipfs
    const worked = await contract.createTransaction("medicalRecordsExists")
        .submit(patient);
    // console.log(worked.toString())
    return success.toString();
}

export async function findFile(patient) {
    let exists = await contract.createTransaction("medicalRecordsExists")
        .submit(patient);
    exists = exists.toString();
    if(exists === 'false')
    {
        return {type: "error", description:"Patient has no file"}
    }

    let hash = await contract.createTransaction("readMedicalRecords")
            .submit(patient);
    hash = JSON.parse(hash.toString());
    // console.log(hash);
    let ret = '';
    for await(const buf of ipfs.cat(hash.hash))
    {
        // console.log(Buffer.from(buf).toString())
        ret += Buffer.from(buf).toString()
    }
    return ret;
}

export async function dropPatient(patient) {
    const exists = await contract.createTransaction("medicalRecordsExists")
        .submit(patient);
    if(!exists)
    {
        return {type: "error", description:"Patient has no file"}
    }

    const success = await contract.createTransaction("deleteMedicalRecords")
            .submit(patient);

    
    //query deleterecord, catch not exists error
}

export async function disconnect() {
    gateway.disconnect();
}