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

    async createMedicalRecords(ctx, medicalRecordsId) {
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

    async readMedicalRecords(ctx, medicalRecordsId) {
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
    async registerUser(ctx, username, password, identity) {
        let returnMsg = "Register Failled, username have already exist"
        try {
            const collectionName = await ctx.stub.getCollectionName(ctx);
            const buffer = await ctx.stub.getPrivateData(collectionName, username);
            let exist = (!!buffer && buffer.length > 0);
            if (!exist) {
                let User_info = {
                    password: password,
                    identity: identity
                };
                returnMsg = "User has added sucessfully"
                await ctx.stub.putPrivateData(collectionName, username, Buffer.from(JSON.stringify(User_info)));
            }
        } catch (error) {
            returnMsg = error
        }
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
        return { success: true, description'Update successful'}
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


}

module.exports = MedicalRecordsContract;
