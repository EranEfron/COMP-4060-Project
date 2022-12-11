import {create} from "ipfs-http-client";
import * as fabricNetwork from 'fabric-network';
import * as os from 'os';
import * as fs from 'fs';
const gateway = new fabricNetwork.Gateway();
await connect();
// const network = await gateway.getNetwork('mychannel');
// let contract = await network.getContract('Project','MedicalRecordsContract');
const ipfs= await create({host:"127.0.0.1", port:5001, protocol:"http"});

async function connect() {
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
}

async function uploadFile(patient, filename, file) {// potentially add contract as a parameter, if connection is handled elsewhere
    //upload file to IPFS using IPFS api
    var fileAdded = await ipfs.add({
        path: filename,
        content: file
    });
    console.log(fileAdded.cid)

    const isUpdate = await contract.submitTransaction("medicalRecordsExists")
        .submit(patient);
    // const isUpdate = true;
    
    if(isUpdate) 
    {
        const success = await contract.createTransaction("updateMedicalRecords")
            .setTransient(fileAdded.cid)
            .submit(patient);
    }
    else 
    {
        const success = await contract.createTransaction("createMedicalRecords")
            .setTransient(fileAdded.cid)
            .submit(patient);
    }
    console.log(fileAdded.cid);//so I can find the file on my ipfs
    return success;
}

// async function findFile(patient) {
//     const exists = await contract.createTransaction("medicalRecordsExists")
//         .submit(patient);
//     if(!exists)
//     {
//         return {type: "error", description:"Patient has no file"}
//     }

//     const hash = await contract.createTransaction("readMedicalRecords")
//             .submit(patient);
//     cosole.log("Found");
//     // node.get(hash) ----> returns file
//     // const chunks = []; -----> returns contents of file
//     // for await (const chunk of node.cat(fileAdded.cid)) {
//     //     chunks.push(chunk);
//     // }

//     //process chunks so it will display in UI
// }

// async function dropPatient(patient) {
//     const exists = await contract.createTransaction("medicalRecordsExists")
//         .submit(patient);
//     if(!exists)
//     {
//         return {type: "error", description:"Patient has no file"}
//     }

//     const success = await contract.createTransaction("deleteMedicalRecords")
//             .submit(patient);

    
//     //query deleterecord, catch not exists error
// }