import * as DB from './CliDBInteractions.js'
import * as fs from 'fs';
let succ = await DB.uploadFile("Eran", fs.readFileSync("./test.txt"));
console.log(succ)
await DB.findFile("Eran");
await DB.disconnect();