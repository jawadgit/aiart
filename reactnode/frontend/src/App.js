import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [imageName, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState([]);

  const crateImage = () => {
    setLoading(true);
    Axios.post("http://localhost:3001/create", {
      imageName: imageName,
    }).then((response) => {
      setLoading(false);
      setImageList([
        ...imageList,
        {
          imageName: imageName,
          imageUrl: response.data,
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
                <h3>
                  Dalle Image: <img alt="" src={val.imageUrl} />
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
