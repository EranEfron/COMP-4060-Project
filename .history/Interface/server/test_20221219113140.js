import * as DB from './CliDBInteractions.js'
import * as fs from 'fs';
console.log(fs.readFileSync("./test.txt").toString())
console.log(typeof fs.readFileSync("./test.txt"))
// await DB.uploadFile("qwe"+ '\'s record', fs.readFileSync("./test.txt"));
// await DB.findFile("dada");
await DB.disconnect();