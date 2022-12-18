import * as DB from './CliDBInteractions.js'
// await DB.uploadFile("Eran", "test.txt", "Please work");
await DB.findFile("Eran");
await DB.disconnect();