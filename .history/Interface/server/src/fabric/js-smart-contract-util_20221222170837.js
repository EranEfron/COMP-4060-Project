

'use strict';


import fs from 'fs-extra';
import yaml from 'js-yaml';
import URL from 'url';
import os from 'os';
import path from "path";
import exp from 'constants';

export async function getConnectionProfile() {
    const homedir = os.homedir();
    const connectionProfilePath = path.join(homedir, '.fabric-vscode', 'v2', 'environments', '1 Org Local Fabric', 'gateways', 'Org1 Gateway.json');

    const connectionProfileContents = await fs.readFile(connectionProfilePath, 'utf8');
    if (connectionProfilePath.endsWith('.json')) {
        return JSON.parse(connectionProfileContents);
    } else if (connectionProfilePath.endsWith('.yaml') || connectionProfilePath.endsWith('.yml')) {
        return yaml.safeLoad(connectionProfileContents);
    }
}

export async function submitTransaction(contractName, functionName, args, gateway) {
    // Submit transaction
    const network = await gateway.getNetwork('mychannel');
    let contract;
    if (contractName !== '') {
        contract = await network.getContract('Project', contractName);
    } else {
        contract = await network.getContract('Project');
    }
    const responseBuffer = await contract.submitTransaction(functionName, ...args);
    return responseBuffer;
}

export async function evaluateTransaction(contractName, functionName, args, gateway) {
    // Evaluate transaction
    const network = await gateway.getNetwork('mychannel');
    let contract;
    if (contractName !== '') {
        contract = await network.getContract('Project', contractName);
    } else {
        contract = await network.getContract('Project');
    }
    const responseBuffer = await contract.evaluateTransaction(functionName, ...args);
    return responseBuffer;
}

// Checks if URL is localhost
export async function isLocalhostURL(url) {
    const parsedURL = URL.parse(url);
    const localhosts = [
        'localhost',
        '127.0.0.1'
    ];
    return localhosts.indexOf(parsedURL.hostname) !== -1;
}

// Used for determining whether to use discovery
export async function hasLocalhostURLs(connectionProfile) {
    const urls = [];
    for (const nodeType of ['orderers', 'peers', 'certificateAuthorities']) {
        if (!connectionProfile[nodeType]) {
            continue;
        }
        const nodes = connectionProfile[nodeType];
        for (const nodeName in nodes) {
            if (!nodes[nodeName].url) {
                continue;
            }
            urls.push(nodes[nodeName].url);
        }
    }
    return urls.some((url) => this.isLocalhostURL(url));
}
// }

// module.exports = SmartContractUtil;
