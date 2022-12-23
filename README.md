# COMP4060-Project: Stroe Private HealthCare data on off-chain IPFS cluster and manage record using Hyperledger Farbic 
Electronic Health Records, or EHRs have been in use for many years at this point. Up until now these have mostly consisted of local databases belonging to one or more facilities which store data about the patients to which they provide care. 
This leads to the potential (one which is very likely to happen, as most people visit several different doctors throughout their lives) of patients having multiple files kept at various locations. This leads to unnecessary redundancy, as well as allowing for the possibility of inconsistent records, whether due to clerical error, or updates recorded only at some facilities. 
It also often means that these facilities determine access to these records, rather than the patient to which the records belong. Thus it has been proposed that blockchain technology should be utilized in creating a distributed EHR system which puts ownership of medical records back into the hands of patients, reduces inconsistencies in records, and eliminates data entries while maintaining, and perhaps improving security.
We propose one such potential solution which makes use of the security features of Hyperledger Fabric to ensure that records can be shared privately by the owner of the records. Additionally, the system makes use of IPFS, a distributed file system, which will provide a private data storage network that will be shared only between hospitals, allowing access to files anywhere, whenever permission is granted.

# Flow Diagram
![graph drawio](https://user-images.githubusercontent.com/103357080/209268321-2a2f2b9c-8543-4038-b13e-f2f2ff8f5815.png)

# Include Components
* [IBM Blockchain Platform Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform) provide a interface to assist users in developing, testing, and deploying smart contracts.
* [IPFS Desktop](https://docs.ipfs.tech/install/ipfs-desktop) is a interface that bundles an IPFS node, file manager, peer manager, and content explorer into a single, easy-to-use application.

# Featured Technologies
* [Vue.js](https://vuejs.org/) Vue.js is an open-source JavaScript framework for building user interfaces and single-page applications.
* [Node.js](https://nodejs.org) is an open source, cross-platform JavaScript run-time environment that executes server-side JavaScript code.
* [Elements UI](https://element.eleme.io/#/en-US) a Vue 2.0 based component library for developers, designers and product managers
* [Docker](https://www.docker.com/)Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.

# Prerequisties
* [Docker](https://www.docker.com/products) - latest
* [Node.js](https://nodejs.org/en/download/) - Node v8.9.x
* [Install VSCode version 1.39](https://code.visualstudio.com/updates/v1_39)
* [Install IBM Blockchain Platform Extension for VSCode](https://github.com/IBM-Blockchain/blockchain-vscode-extension)
* [npm v6.11.3](https://nodejs.org/en/download/)

# Step
Follow the instruction to run this program locally
#### Step1
* Clone the repository:
  ```bash
  git clone https://github.com/IBM/build-blockchain-insurance-app
  ```
#### Step 2 - Start your Docker
* once Docker is started, You should see something look like this (Stuff inside container would be different)
![image](https://user-images.githubusercontent.com/103357080/209270844-73a47745-3306-409c-b7b0-a3abbc2667f3.png)

#### Step3 - Create Fabric network
* Open IBM Blockchain Platform in VScode
![image](https://user-images.githubusercontent.com/103357080/209270389-22e00d6b-3a15-4395-afcb-ffcdf3a0811f.png)

* Create Fabric Environments
   - Click '+' on the right top of the FABRIC ENVIRONMENTS
   ![image](https://user-images.githubusercontent.com/103357080/209271189-87bd0dda-a2de-4814-a4d8-d032f80c2069.png)
   - Select Create new from template
   - Select 1 Org template(1 CA, 1 Peer, 1 channel)
   - Name it "1 Org Local Fabric"
   - Once its done click on tha name to start the network
#### Step4 - Deploy Smart Contract
* Import smart contract - Click import a package and browse in the Chaincode folder, find "Project@0.3.1.tar.gz" and click select 
![image](https://user-images.githubusercontent.com/103357080/209270601-8e5b498f-743e-428e-8f46-f0eca05ff6f6.png)   
    - Once its packed, click on mychannel and + Deploy smart contract.
    - Select "Project@0.3.1" and deploy
    ![image](https://user-images.githubusercontent.com/103357080/209271905-f99265e3-9be6-4069-8bb3-d8af10d7c9fb.png)
#### Step5 - Start the Gateways
![image](https://user-images.githubusercontent.com/103357080/209273193-63a77b53-a4b6-4c8c-899c-61083162eeb0.png)

#### Step6 - Start Server
 - cd  Interface/server folder
 - npm install - your console will look similar to this

![image](https://user-images.githubusercontent.com/103357080/209273591-d1003d34-9622-4be0-a773-b4b1d5a16ce6.png)
 - npm start

![image](https://user-images.githubusercontent.com/103357080/209273647-94e395e4-7d22-4f87-a108-d63c9c02676f.png)

#### Step7 - Start Client
    - cd Interface/ Client folder
    - npm install 
    - npm run serve -- --port 8000
  ![image](https://user-images.githubusercontent.com/103357080/209275372-cafd2703-2b03-4511-8230-1ad8cee2928a.png)

#### Step8 - go to http://localhost:8000/#/ to see tha app. 
* Have Fun :)


# App Screenshots
### Login
![image](https://user-images.githubusercontent.com/103357080/209275882-4956fda6-23e1-43fe-b1f2-5d7935f0c689.png)
### Register
![image](https://user-images.githubusercontent.com/103357080/209275921-7ded9768-f862-4c67-8bb3-cde64fa2fdcd.png)
### Main Page
![image](https://user-images.githubusercontent.com/103357080/209275970-21ccd74c-6707-4094-87e9-0b1da45039ff.png)
### Upload record
![image](https://user-images.githubusercontent.com/103357080/209276020-f7028b47-8bcb-4276-9683-e5538923cc85.png)
### Search and Download record
![image](https://user-images.githubusercontent.com/103357080/209276071-6a09d773-910c-4056-a681-23fa5f91581a.png)
### Authorization - patient to give access to doctor to view their record
![image](https://user-images.githubusercontent.com/103357080/209276124-e042067e-d5d3-410c-aff6-a1443a167bbd.png)

    
