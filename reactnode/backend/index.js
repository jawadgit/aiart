const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
var Eth = require('web3-eth');

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
var eth = new Eth(Eth.givenProvider);

const configuration = new Configuration({
  apiKey: process.env.Open_AI_Key,
});

app.use(cors());
app.use(express.json());

const openAi = new OpenAIApi(configuration);

app.post("/create", (req, res) => {
  (async () => {
    const imageText = req.body.imageName;
    const response = await openAi.createImage({
      prompt: imageText,
      response_format: "url",
      n: 2,
      size: "256x256",
    });
    //console.log(response.data.data[0].url);
    res.send(response.data.data[0].url);
  })();
});

app.get("/testsign", (req, res) => {
  const privateKey = '0x70693de94d1c5efb66e055c379f022bcb2d4b0585223dbd8c5c13cc49e7c3e69';
  const account = eth.accounts.privateKeyToAccount(privateKey);
  eth.accounts.wallet.add(account);
  eth.defaultAccount = account.address;
  debugger;
  eth.sign("jawad",eth.defaultAccount).then(obj => {
    console.log(obj);
})

});

app.get("/verify", (req, res) => {
  debugger;
  eth.personal.ecRecover("jawad", "0x5d4e2667ce41e0804924c0defc48d9c732348eb7e9bb0c0e93f90ec7da4ca2337d93d45c3446c4b1a1da9e3f6526d4768b1f37dd09647af8576cdaad847e98b41b").then(console.log);

});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
