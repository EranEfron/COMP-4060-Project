import {create} from "ipfs-http-client";
import pkg from 'fabric-network';
const {Wallets, Gateway} = pkg;
const ipfs= await create({host:"127.0.0.1", port:5001, protocol:"http"});
import fs from 'fs';

var contract;

async function connect(walletDirectoryPath, identity, channelName, chaincodeId) {
    const wallet = await Wallets.newFileSystemWallet(walletDirectoryPath);
    const GatewayOptions = {
    identity: identity, // Previously imported identity
    wallet: wallet,
    };
    const gateway = new Gateway();
    const temp = await gateway.connect(commonConnectionProfile, gatewayOptions);
    const network = await gateway.getNetwork(channelName);
    contract = network.getContract(chaincodeId);
}

async function uploadFile(patient, filepath) {// potentially add contract as a parameter, if connection is handled elsewhere
    //upload file to IPFS using IPFS api
    var fileAdded = await ipfs.add({
        path: filepath,
        content: fs.readFileSync(filepath).toString()
    });
    console.log(fileAdded.cid)

    // const isUpdate = await contract.createTransaction("medicalRecordsExists")
    //     .submit(patient);
    // // const isUpdate = true;
    
    // if(isUpdate) 
    // {
    //     const success = await contract.createTransaction("updateMedicalRecords")
    //         .setTransient(fileAdded.cid)
    //         .submit(patient);
    // }
    // else 
    // {
    //     const success = await contract.createTransaction("createMedicalRecords")
    //         .setTransient(fileAdded.cid)
    //         .submit(patient);
    // }
    console.log(fileAdded.cid);//so I can find the file on my ipfs
    // return success;
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


// connect("Org1Wallet", "Org1 Admin.id", "mychannel", "Project@0.0.1");
uploadFile("Tester", "./test.txt");