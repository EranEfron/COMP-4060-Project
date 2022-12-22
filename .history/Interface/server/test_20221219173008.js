import * as DB from './CliDBInteractions.js'
import * as fs from 'fs';
// console.log(fs.readFileSync("./test.txt"))
// console.log(typeof fs.readFileSync("./test.txt"))
await DB.uploadFile("1"+ '\'s record', fs.readFileSync("./test.txt"));
// await DB.findFile("dada");
await DB.disconnect();