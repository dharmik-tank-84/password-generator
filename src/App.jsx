import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [length, setLength] = useState(8);

  const [number, setNumber] = useState(false);

  const [character, setCharacter] = useState(false);

  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";

    if (character) str += "!@#$%^&*()[]{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Password Generator</h1>
        <div className="password-row">
          <input
            className="password-input"
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            className="copy-btn"
            onClick={copyPassword}
            title="Copy Password"
          >
            Copy
          </button>
        </div>
        <div className="options">
          <label className="option-label">
            Length: <span className="length-value">{length}</span>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="slider"
            />
          </label>
          <label className="option-label">
            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber((prev) => !prev)}
            />
            Include Numbers
          </label>
          <label className="option-label">
            <input
              type="checkbox"
              checked={character}
              onChange={() => setCharacter((prev) => !prev)}
            />
            Include Symbols
          </label>
        </div>
      </div>
      <footer className="footer">
        © {new Date().getFullYear()} Password Generator. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
