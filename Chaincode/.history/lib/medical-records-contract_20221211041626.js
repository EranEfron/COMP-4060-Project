/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const crypto = require('crypto');

async function getCollectionName(ctx) {
    const mspid = ctx.clientIdentity.getMSPID();
    const collectionName = `_implicit_org_${mspid}`;
    return collectionName;
}

class MedicalRecordsContract extends Contract {

    async medicalRecordsExists(ctx, medicalRecordsId) {
        const collectionName = await getCollectionName(ctx);
        const data = await ctx.stub.getPrivateDataHash(collectionName, medicalRecordsId);
        return (!!data && data.length > 0);
    }

    async createMedicalRecords(ctx, medicalRecordsId) { // create a new patient with stored records
        const exists = await this.medicalRecordsExists(ctx, medicalRecordsId);
        if (exists) {
            return { success: false, description: `The asset medical records ${medicalRecordsId} already exists` }// throw new Error(`The asset medical records ${medicalRecordsId} already exists`);
        }

        const privateAsset = {};

        const transientData = ctx.stub.getTransient();
        if (transientData.size === 0 || !transientData.has('hash')) {
            return { success: false, description: 'The hash key was not specified in transient data. Please try again.' }// throw new Error('The hash key was not specified in transient data. Please try again.');
        }
        privateAsset.hash = transientData.get('hash').toString();

        const collectionName = await getCollectionName(ctx);
        await ctx.stub.putPrivateData(collectionName, medicalRecordsId, Buffer.from(JSON.stringify(privateAsset)));
        return { success: true, description: 'Successfully added record reference to blockchain' }
    }

    async readMedicalRecords(ctx, medicalRecordsId) { // get back teh cid of the file relating to a patient
        const exists = await this.medicalRecordsExists(ctx, medicalRecordsId);
        if (!exists) {
            return { success: false, description: `The asset medical records ${medicalRecordsId} does not exist` }// throw new Error(`The asset medical records ${medicalRecordsId} does not exist`);
        }
        let privateDataString;
        const collectionName = await getCollectionName(ctx);
        const privateData = await ctx.stub.getPrivateData(collectionName, medicalRecordsId);
        privateDataString = JSON.parse(privateData.toString());
        return privateDataString;
    }
    async registerUser(ctx, username, password, identity,id) {
        let returnMsg = { success: false, description: 'Register Failled, username have already exist' }
        try {
            const collectionName = await getCollectionName(ctx);
            console.info("123123");
            const buffer = await ctx.stub.getPrivateData(collectionName, username);
            let exist = (!!buffer && buffer.length > 0);
            if (!exist) {
                let User_info = {
                    password: password,
                    identity: identity,
                    id:id
                };
                await ctx.stub.putPrivateData(collectionName, username, Buffer.from(JSON.stringify(User_info)));
                returnMsg = { success: true, description: 'Registered successfully' }
            }
        } catch (error) {
            return { success: false, description: error }
        }
        return returnMsg;
    }
    async validateLogin(ctx,username,password,identity){
        const collectionName = await getCollectionName(ctx);
        const privateData = await ctx.stub.getPrivateData(collectionName, username);
        let exist = (!!privateData && privateData.length > 0);
        if (!exist) {
            return { success: false, description: `${username} does not exist` }
        }else{
            const returnMsg = JSON.parse(privateData.toString());
            if(returnMsg.password != password || returnMsg.identity != identity){
                return { success: false, description: `Password or identity do not match` }
            }else{
                return { success: true, description: `${username} log in successfully` }
            }
        }
    }
    async queryUser(ctx, username) {
        const collectionName = await getCollectionName(ctx);
        const privateData = await ctx.stub.getPrivateData(collectionName, username);
        let exist = (!!privateData && privateData.length > 0);
        if (!exist) {
            return { success: false, description: `The user of ${username} does not exist` }
        }
        const returnMsg = JSON.parse(privateData.toString());
        return returnMsg;
    }
    async updateMedicalRecords(ctx, medicalRecordsId) {
        const exists = await this.medicalRecordsExists(ctx, medicalRecordsId);
        if (!exists) {
            return { success: false, description: 'The asset medical records ${medicalRecordsId} does not exist' }// throw new Error(`The asset medical records ${medicalRecordsId} does not exist`);
        }
        const privateAsset = {};

        const transientData = ctx.stub.getTransient();
        if (transientData.size === 0 || !transientData.has('hash')) {
            return { success: false, description: 'The hash key was not specified in transient data. Please try again.' }// throw new Error('The hash key was not specified in transient data. Please try again.');
        }
        privateAsset.hash = transientData.get('hash').toString();

        const collectionName = await getCollectionName(ctx);
        await ctx.stub.putPrivateData(collectionName, medicalRecordsId, Buffer.from(JSON.stringify(privateAsset)));
        return { success: true, description: 'Update successful' }
    }

    async deleteMedicalRecords(ctx, medicalRecordsId) {
        const exists = await this.medicalRecordsExists(ctx, medicalRecordsId);
        if (!exists) {
            return { success: true, description: `The asset medical records ${medicalRecordsId} does not exist` }// throw new Error(`The asset medical records ${medicalRecordsId} does not exist`);
        }
        const collectionName = await getCollectionName(ctx);
        await ctx.stub.deletePrivateData(collectionName, medicalRecordsId);
        return { success: true, description: 'Delete successful' }
    }

    async verifyMedicalRecords(ctx, mspid, medicalRecordsId, objectToVerify) {

        // Convert provided object into a hash
        const hashToVerify = crypto.createHash('sha256').update(objectToVerify).digest('hex');
        const pdHashBytes = await ctx.stub.getPrivateDataHash(`_implicit_org_${mspid}`, medicalRecordsId);
        if (pdHashBytes.length === 0) {
            return { success: false, description: 'No private data hash with the key: ' + medicalRecordsId }// throw new Error('No private data hash with the key: ' + medicalRecordsId);
        }

        const actualHash = Buffer.from(pdHashBytes).toString('hex');

        // Compare the hash calculated (from object provided) and the hash stored on public ledger
        if (hashToVerify === actualHash) {
            return true;
        } else {
            return false;
        }
    }
    async queryAll(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        const collectionName = await getCollectionName(ctx);

        for await (const { key, value } of ctx.stub.getPrivateDataByRange(collectionName,startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info("THIS IS ALL" + allResults);
        return JSON.stringify(allResults);
    }

    async deleteAll(ctx) {
        const startKey = '';
        const endKey = '';
        const collectionName = await getCollectionName(ctx);

        for await (const { key, value } of ctx.stub.getPrivateDataByRange(collectionName,startKey, endKey)) {
            await ctx.stub.deletePrivateData(collectionName,key);
        }
    }
    async deleteByKey(ctx,key){
        const collectionName = await getCollectionName(ctx);
        await ctx.stub.deletePrivateData(collectionName,key);  
    }
  
}

module.exports = MedicalRecordsContract;
