import "./App.css";
import { useState } from "react";
import axios from 'axios';
export default function App() {

  const [text, setText] = useState("");

  const verify = () => {
    console.log("Verifying....");
    console.log("text=", text);
    const dict = {
      "text": text
    }
    console.log(dict);
    axios.post("http://localhost:8000/", dict).then((res) => {
      console.log("verified...");
      console.log(res);
      console.log(res.data);
      setText(res.data.text);
    });
  };

  return (
    <div className="container">
      <h2>Grammify!</h2>
      <p>
        Check your English text for grammar, spelling, and punctuation errors with
        Grammify!
      </p>
        <textarea
          id="textarea"
          className="textarea"
          placeholder="Write here..."
          maxLength={150}
          defaultValue={text}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={verify} >Verify</button>
      <div className="counter-container">
        <p>
          Total character: <span id="total-conter"> 0</span>
        </p>
        <p>
          Remaining:
          <span className="remaining-counter" id="remaining-counter">
            150
          </span>
        </p>
      </div>
    </div>
  )
}
