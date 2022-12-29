import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [imageName, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [verifiedUrl, setVerifiedUrl] = useState([]);

  const crateImage = () => {
    setLoading(true);
    Axios.post("http://localhost:3001/create", {
      imageName: imageName,
    }).then((response) => {
      setLoading(false);
      console.log(response, response.data);
      setImageList([
        ...imageList,
        {
          imageName: imageName,
          imageUrl: response.data.imageUrl,
          signedUrl: response.data.signedUrl,
        },
      ]);
    });
  };

  const mintImage = (imageUrl, signedUrl) => {
    setLoading(true);
    Axios.post("http://localhost:3001/mint", {
      imageUrl: imageUrl,
      imageSignedUrl: signedUrl,
    }).then((response) => {
      setLoading(false);
      console.log(response, response.data);
      setVerifiedUrl([
        ...verifiedUrl,
        {
          verifiedUrl: response.data.verifiedSignedUrl,
        },
      ]);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <h1>Generate an Image using Open AI API:</h1>
        <textarea
          className="app-input"
          onChange={(event) => {
            setName(event.target.value);
          }}
          rows="10"
          cols="40"
        />
        {loading ? (
          <>
            <label>Creating Image Please Wait</label>
          </>
        ) : (
          <>
            <button onClick={crateImage}>Submit</button>
          </>
        )}
      </div>
      <div className="images">
        {imageList.map((val, key) => {
          return (
            <div className="image">
              <div>
                <h3>Text: {val.imageName}</h3>
                <h3>SignedUrl: {val.signedUrl}</h3>
                <h3>
                  Dalle Image: <img alt="" src={val.imageUrl} />
                  <button onClick={() => mintImage(val.imageUrl, val.signedUrl)}>Mint</button>
                </h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="images">
        {verifiedUrl.map((val, key) => {
          return (
            <div className="image">
              <div>
                <h3>Url Verification Status{val.verifiedUrl}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
