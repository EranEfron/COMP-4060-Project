import {create} from "ipfs-http-client";
async function ipfsClient(){
    const ipfs= await create({host:"127.0.0.1", port:5001, protocol:"http"});
    return ipfs;
}
async function saveText() {
    let ipfs = await ipfsClient();
    let result = await ipfs.add({path:"test.txt",content:"Hello World"});
    console.log(result);
}

saveText();