import * as IPFS from 'ipfs-core'
import all from 'it-all'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'

async function main () {
  const node = await IPFS.create()
  const version = await node.version()

  console.log('Version:', version.version)

  const file = await node.add({
    path: 'ipfs.json',
    content: uint8ArrayFromString('ipfstest')

  })

  console.log('Added file:', file.path, file.cid.toString())

  const data = uint8ArrayConcat(await all(node.cat(file.cid)))

  console.log('Added file contents:', uint8ArrayToString(data))
}

main()


//const ipfscore = require('ipfs-core');
//////////////////////////////////////////////////
// import * as IPFS from 'ipfs-core';

// const ipfs = await IPFS.create();
// const  cid  = await ipfs.add('Hello world');
// console.log('cid: ',cid);
/////////////////////////////////////////////////

// // const { CID } = require('ipfs-http-client');

// // // connect to the default API address http://localhost:5001
// // const client = create();

// // //(async () => {
// // // call Core API methods
// // const { cid } = await client.add('Hello world!');
// // //});

// // console.log('cid', cid);