import * as DB from './CliDBInteractions.js'
import * as fs from 'fs';
// await DB.uploadFile("qwe", fs.readFileSync("./test.txt"));
await DB.findFile("dada");
await DB.disconnect();