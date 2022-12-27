import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
dotenv.config()

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const configuration = new Configuration({
    apiKey: process.env.Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`${prompt}`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (
    <div className="App">
      {loading ? (
        <>
          <h2>Generating..Please Wait..</h2>
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <h2>Generate an Image using Open AI API</h2>

          <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-yHvr18ZsKopqNuBDKopXZ8lR/user-5pgCR8MAL345Wy3NDnIHrveI/img-NVXSlvwhPj8CCLysNSzGSQv8.png?st=2022-12-26T16%3A17%3A08Z&se=2022-12-26T18%3A17%3A08Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-26T12%3A45%3A15Z&ske=2022-12-27T12%3A45%3A15Z&sks=b&skv=2021-08-06&sig=YQ4sraSFsIkjhBnnPgPWSqxMyoaPB3b9VJUBWTZ8N8Q%3D"/>

          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <br />
          <br />
          <button onClick={generateImage}>Generate an Image</button>
          <br />
          <br />
          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
