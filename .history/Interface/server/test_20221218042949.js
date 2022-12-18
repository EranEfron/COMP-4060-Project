
const DB = require('./CliDBInteractions');
const fs = require('fs');
let a = DB.uploadFile("TEE", fs.readFileSync("./test.txt"));
// await DB.findFile("Eran");
console.log(a)
DB.disconnect();