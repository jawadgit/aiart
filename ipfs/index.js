import * as IPFS from "ipfs-core";

const ipfs = await IPFS.create();
const { cid } = await ipfs.add("shakaib nisar jawad azad the thetas group");
console.log(cid);

// const express = require("express");
// const ipfsClient = require("ipfs-http-client");

// const ipfs = ipfsClient("http://localhost:5001");
// const app = express();

// app.use(express.json());

// app.get("/", (req, res) => {
//   return res.send("Welcome to my IPFS app");
// });

// const node = await IPFS.create()

// const data = 'Hello, <YOUR NAME HERE>'

// // add your data to IPFS - this can be a string, a Buffer,
// // a stream of Buffers, etc
// const results = node.add(data)

// // we loop over the results because 'add' supports multiple
// // additions, but we only added one entry here so we only see
// // one log line in the output
// for await (const { cid } of results) {
//   // CID (Content IDentifier) uniquely addresses the data
//   // and can be used to get it again.
//   console.log(cid.toString())
// }

// const express = require("express");
// const ipfsClient = require("ipfs-http-client");

// // connect to ipfs daemon API server
// const ipfs = ipfsClient("http://localhost:5002");
// const app = express();

// app.use(express.json());

// app.get("/", (req, res) => {
//   return res.send("Welcome to my IPFS app");
// });

// async function main() {
//   // Connect to the local IPFS node
//   const ipfs = IPFSs({ host: "localhost", port: 5002, protocol: "http" });

//   // Convert the string to a Buffer
//   const buf = Buffer.from("Hello, World!");

//   // Add the file to IPFS
//   const file = await ipfs.add(buf);

//   console.log(file);
//   // Output:
//   // {
//   //   path: 'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB',
//   //   hash: 'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB',
//   //   size: 13
//   // }
// }

// main();

//const { CID } = require("ipfs-http-client");

// const IPFS = require("ipfs");

// const node = IPFS.create();

// const data = "Hello, alpha bravo charlie theta";

// // add your data to IPFS - this can be a string, a Buffer,
// // a stream of Buffers, etc
// const results = node.add(data);

// // we loop over the results because 'add' supports multiple
// // additions, but we only added one entry here so we only see
// // one log line in the output
// for (const { cid } of results) {
//   // CID (Content IDentifier) uniquely addresses the data
//   // and can be used to get it again.
//   console.log(cid.toString());
// }

// const IPFS = require("ipfs-infura");
// const ipfs = new IPFS({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   projectId: "1",
//   projectSecret: "",
// });

// ipfs.add("hello world!").then(console.log).catch(console.log);

// import * as IPFS from "ipfs-core";
// import all from "it-all";
// import { concat as uint8ArrayConcat } from "uint8arrays/concat";
// import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
// import { toString as uint8ArrayToString } from "uint8arrays/to-string";

// async function main() {
//   const node = await IPFS.create();
//   const version = await node.version();

//   console.log("Version:", version.version);

//   const file = await node.add({
//     path: "hello.text",
//     content: uint8ArrayFromString("lorem ipsum idn asdjbhbj osfobuiasdobo;sadn"),
//   });

//   console.log("Added file:", file.path, file.cid.toString());

//   const data = uint8ArrayConcat(await all(node.cat(file.cid)));

//   console.log("Added file contents:", uint8ArrayToString(data));
// }

// main();
