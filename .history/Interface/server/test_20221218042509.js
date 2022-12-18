import * as DB from '@/CliDBInteractions.js'
import * as fs from 'fs';

await DB.uploadFile("TEE", fs.readFileSync("./test.txt"));
// await DB.findFile("Eran");
await DB.disconnect();