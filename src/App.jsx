import { useEffect, useState } from "react";
import "./App.scss";
import data from "./data/options";

function App() {
  const [characters, setCharacters] = useState([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const numbers = data[0].numbers;
    const symbols = data[1].symbols;
    const upperCases = data[2].upperCases;
    const lowerCases = data[3].lowerCases;

    const combineCharacters = [...numbers, ...symbols, ...upperCases, ...lowerCases];
    setCharacters(combineCharacters);
  }, []);

  // console.log(data[0].numbers);

  const handleGenerate = () => {
    console.log(characters);

    // setPassword(
    //   `${number} ${symbol} ${upperCase} ${lowerCase} ${number} ${symbol} ${upperCase} ${lowerCase}`
    // );
  };

  return (
    <div className="app">
      <h1 className="title">Password Generator</h1>

      <div className="container">
        <h2 className="">Options</h2>
        <div className="options">
          <div className="booleans">
            <h4 className="element">Symbols</h4>
            <h4 className="element">Numbers</h4>
            <h4 className="element">Lowercase characters</h4>
            <h4 className="element">Uppercase characters</h4>
          </div>
          <div className="length">
            <h4 className="label">Length</h4>
            <input className="input" type="number" placeholder="ex: 10" />
          </div>
        </div>

        <div className="password">
          <label className="label">Generated Password</label>
          <button className="generateBtn" onClick={handleGenerate}>
            Generate
          </button>
          <div className="box">{password}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
