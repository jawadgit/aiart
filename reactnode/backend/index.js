const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

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

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
