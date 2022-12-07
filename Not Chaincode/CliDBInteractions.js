const ipfs = require("./IPFS_API")
var network = require("fabric-network")

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
        hash = ipfs.upload(filepath, async (err, hashFile)=>{
            if(err) return {success:false, description:"IPFS upload error"};//failure to upload
            {const isUpdate = await contract.createTransaction("medicalRecordsExists").submit(patient)});

        if(isUpdate) const success = await contract.createTransaction("updateMedicalRecords")
            .setTransient(hash)
            .submit(patient);
        else const success = await contract.createTransaction("createMedicalRecords")
            .setTransient(hash)
            .submit(patient);
            return success;
    }

    findFile: function(patient) {
        //query to retrieve hash from blockchain (catch error for person not found)
        //use IPFS_API to retrieve file from IPFS (cb is async (err, someVar))
    }

    dropPatient: function(patient) {
        //query deleterecord, catch not exists error
    }
}

