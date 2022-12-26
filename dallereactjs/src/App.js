import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const configuration = new Configuration({
    apiKey: "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",
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

          <img
            src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-yHvr18ZsKopqNuBDKopXZ8lR/user-5pgCR8MAL345Wy3NDnIHrveI/img-61nIJHRvkjKILaGo1ZzcTItf.png?st=2022-12-26T12%3A03%3A01Z&se=20
  22-12-26T14%3A03%3A01Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-26T10%3A24%3A00Z&ske=2022-12-27T10%3A
  24%3A00Z&sks=b&skv=2021-08-06&sig=XGBJEamLkdbTcTzFaFRDSGGYXCQxo/lOQqxF1hZyTBc%3D"
          />

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
