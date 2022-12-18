
const DB = require('./CliDBInteractions');
const fs = require('fs');
await DB.uploadFile("TEE", fs.readFileSync("./test.txt"));
// await DB.findFile("Eran");
await DB.disconnect();