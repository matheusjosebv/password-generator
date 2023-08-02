import { useEffect, useState } from "react";
import "./App.scss";
import data from "./data/options";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

function App() {
  const [visibility, setVisibility] = useState<boolean>(true);
  const [randomIndexes, setRandomIndexes] = useState<number[]>([]);
  const [characters, setCharacters] = useState<(number | string)[]>([]);
  const [password, setPassword] = useState<(string | number)[]>([]);
  const [options, setOptions] = useState<{
    amount: number;
    numbers: boolean;
    symbols: boolean;
    upperCases: boolean;
    lowerCases: boolean;
  }>({
    amount: 10,
    numbers: true,
    symbols: true,
    upperCases: true,
    lowerCases: true,
  });

  useEffect(() => {
    setCharacters([]);

    if (options.numbers) {
      setCharacters((prevData) => [...prevData, ...data.numbers]);
    }

    if (options.symbols) {
      setCharacters((prevData) => [...prevData, ...data.symbols]);
    }

    if (options.upperCases) {
      setCharacters((prevData) => [...prevData, ...data.upperCases]);
    }

    if (options.lowerCases) {
      setCharacters((prevData) => [...prevData, ...data.lowerCases]);
    }
  }, [options.lowerCases, options.numbers, options.symbols, options.upperCases]);

  useEffect(() => {
    setRandomIndexes([]);
    for (let i = 0; i < options.amount; i++) {
      let randomIdx: number;
      randomIdx = Math.floor(Math.random() * characters.length);
      setRandomIndexes((prev) => [...prev, randomIdx]);
    }
  }, [characters, options.amount, password]);

  const handleGenerate = () => {
    const randomChars: (string | number)[] = randomIndexes.map((i) => characters[i]);

    setPassword(randomChars);
  };

  const handleCopy = () => {
    const copyPassword = password.join("");
    navigator.clipboard.writeText(copyPassword);
  };

  const handleVisibility = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <div className="app">
      <h1 className="title">Password Generator</h1>
      <div className="option-container">
        <h2 className="name">Options</h2>

        <div className="options">
          <div className="booleans">
            <h4
              className={`element ${options.symbols && "active"}`}
              onClick={() => setOptions((p) => ({ ...p, symbols: !p.symbols }))}
            >
              Symbols
            </h4>
            <h4
              className={`element ${options.numbers && "active"}`}
              onClick={() => setOptions((p) => ({ ...p, numbers: !p.numbers }))}
            >
              Numbers
            </h4>
            <h4
              className={`element ${options.lowerCases && "active"}`}
              onClick={() => setOptions((p) => ({ ...p, lowerCases: !p.lowerCases }))}
            >
              Lowercases
            </h4>
            <h4
              className={`element ${options.upperCases && "active"}`}
              onClick={() => setOptions((p) => ({ ...p, upperCases: !p.upperCases }))}
            >
              Uppercases
            </h4>
          </div>
          <div className="length">
            <h4 className="label">Length</h4>
            <input
              min="4"
              max="25"
              type="range"
              className="input"
              value={options.amount}
              onChange={(e) => {
                if (options.amount < 25 || options.amount > 4) {
                  setOptions((prev) => ({ ...prev, amount: parseFloat(e.target.value) }));
                }
              }}
            />
            <span>{options.amount}</span>
          </div>
        </div>
      </div>

      <div className="password-container">
        <button
          className="btn generateBtn"
          onClick={handleGenerate}
          disabled={
            !options.numbers && !options.symbols && !options.upperCases && !options.lowerCases
          }
        >
          Generate
        </button>

        <div className="box">
          {password &&
            password.map((p, i) => {
              return (
                <span className="char" key={i}>
                  {visibility ? p : "*"}
                </span>
              );
            })}
        </div>

        <div className="btns">
          <button className="btn copyBtn" onClick={handleCopy}>
            Copy
          </button>
          <button className="btn hideBtn" onClick={handleVisibility}>
            {visibility ? <MdVisibilityOff className="icon" /> : <MdVisibility className="icon" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
