const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
var Eth = require("web3-eth");

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
var eth = new Eth(Eth.givenProvider);

const configuration = new Configuration({
  apiKey: process.env.Open_AI_Key,
});

app.use(cors());
app.use(express.json());

const openAi = new OpenAIApi(configuration);
let imageUrl = "";

app.post("/create", (req, res) => {
  (async () => {
    const imageText = req.body.imageName;
    const response = await openAi.createImage({
      prompt: imageText,
      response_format: "url",
      n: 2,
      size: "256x256",
    });
    imageUrl = response.data.data[0].url;
    let signedUrl = await signImageUrl(imageUrl);
    //console.log("signedUrl", signedUrl);
    res.send({ imageUrl: imageUrl, signedUrl: signedUrl });
  })();
});

app.post("/mint", (req, res) => {
  (async () => {
    const imageUrl = req.body.imageUrl;
    const imageSignedUrl = req.body.imageSignedUrl;
    const verifiedSignedUrl = await verifyImageUrl(imageUrl, imageSignedUrl);
    console.log('verifiedSignedUrl', verifiedSignedUrl);
    res.send({ imageUrl: imageUrl, signedUrl: imageSignedUrl, verifiedSignedUrl: verifiedSignedUrl});
  })();
});

async function signImageUrl(imageUrl) {
  /**
   * will every image url be signed from official private key or its own private key ?
   */
  const walletPrivateKey =
    "0x70693de94d1c5efb66e055c379f022bcb2d4b0585223dbd8c5c13cc49e7c3e69";
  const account = eth.accounts.privateKeyToAccount(walletPrivateKey);
  //console.log("account", account);
  eth.accounts.wallet.add(account);
  eth.defaultAccount = account.address;
  //console.log("eth.defaultAccount", eth.defaultAccount);
  //console.log("imageUrl", imageUrl);
  let signedUrl = await eth.sign(imageUrl, eth.defaultAccount);
  return signedUrl;
}
async function verifyImageUrl(imageUrl, imageSignedUrl) {
  const walletPrivateKey =
    "0x70693de94d1c5efb66e055c379f022bcb2d4b0585223dbd8c5c13cc49e7c3e69";
  const account = eth.accounts.privateKeyToAccount(walletPrivateKey);
  //console.log("verify account", account);
  eth.accounts.wallet.add(account);
  eth.defaultAccount = account.address;
  let signingAddress = await eth.accounts.recover(imageUrl, imageSignedUrl);
  //console.log('verify eth.defaultAccount :', eth.defaultAccount, 'signingAddress', signingAddress);
  if(eth.defaultAccount == signingAddress){
    return " valid Url";
  }
  return "invalid Url";
}
app.get("/testsign", (req, res) => {
  const privateKey =
    "0x70693de94d1c5efb66e055c379f022bcb2d4b0585223dbd8c5c13cc49e7c3e69";
  const account = eth.accounts.privateKeyToAccount(privateKey);
  eth.accounts.wallet.add(account);
  eth.defaultAccount = account.address;
  debugger;
  eth.sign("jawad", eth.defaultAccount).then((obj) => {
    console.log(obj);
  });
});

app.get("/verify", (req, res) => {
  debugger;
  eth.personal
    .ecRecover(
      "jawad",
      "0x5d4e2667ce41e0804924c0defc48d9c732348eb7e9bb0c0e93f90ec7da4ca2337d93d45c3446c4b1a1da9e3f6526d4768b1f37dd09647af8576cdaad847e98b41b"
    )
    .then(console.log);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
