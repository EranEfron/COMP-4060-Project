import * as DB from './CliDBInteractions.js'
import * as fs from 'fs';
await DB.uploadFile("Eran", "test.txt", fs.readFileSync("./test.txt"));
// await DB.findFile("Eran");
await DB.disconnect();