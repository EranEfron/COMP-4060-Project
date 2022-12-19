import * as DB from './CliDBInteractions.js'
import * as fs from 'fs';
await DB.uploadFile("qwe"+ '\'s record', fs.readFileSync("./test.txt"));
// await DB.findFile("dada");
await DB.disconnect();