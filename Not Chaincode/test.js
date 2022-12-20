import * as DB from './CliDBInteractions.js'
import * as fs from 'fs';
let succ = await DB.uploadFile("Eran", fs.readFileSync("./test.txt"));
console.log(succ)
// succ = await DB.uploadFile("Eran", "Hello Again");
console.log(succ)
console.log(await DB.findFile("Eran"));
await DB.disconnect();