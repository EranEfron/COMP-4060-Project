import * as IPFS from 'ipfs-core';
var network = require("fabric-network");
const node = await IPFS.create();

const contract;

module exports = {
    connect: function(walletDirectoryPath, identity, channelName) {
        const wallet = new FileSystemWallet(walletDirectoryPath);
        const gatewayOptions: GatewayOptions = {
        identity: 'user@example.org', // Previously imported identity
        wallet,
        };
        const gateway = new Gateway();
        await gateway.connect(commonConnectionProfile, gatewayOptions);
        const network = await gateway.getNetwork(channelName);
        contract = network.getContract(chaincodeId);
    }

    uploadFile: function(patient, filepath) {
        //upload file to IPFS using IPFS api
        fileAdded = node.add({
            path: filepath
        });

        const isUpdate = await contract.createTransaction("medicalRecordsExist")
            .submit(patient);
        
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
        return success;
    }

    findFile: function(patient) {
        const exists = await contract.createTransaction("medicalRecordsExist")
            .submit(patient);
        if(!exists)
        {
            return {type: "error", description:"Patient has no file"}
        }

        const hash = await contract.createTransaction("readMedicalRecords")
                .submit(patient);

        // node.get(hash) ----> returns file
        // const chunks = []; -----> returns contents of file
        // for await (const chunk of node.cat(fileAdded.cid)) {
        //     chunks.push(chunk);
        // }

        //process chunks so it will display in UI
    }

    dropPatient: function(patient) {
        const exists = await contract.createTransaction("medicalRecordsExist")
            .submit(patient);
        if(!exists)
        {
            return {type: "error", description:"Patient has no file"}
        }

        const success = await contract.createTransaction("deleteMedicalRecords")
                .submit(patient);

        
        //query deleterecord, catch not exists error
    }
}

