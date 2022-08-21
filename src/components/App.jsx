import "./App.css";
import { useRef, useState } from "react";
import axios from 'axios';
export default function App() {

  

  const [text, setText] = useState("");
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState([]);
  const verify = () => {
    setFlag(true);
    console.log("Verifying....");
    const dict = {
      "text": text
    }
    axios.post("http://localhost:8000/", dict).then((res) => {
      setText(res.data.text);
      setErrors(res.data.errors);
      setFlag(false);
    });
  };

  const handleChange = (e) => {
    setText(e.target.value);
    // setCount(e.target.value.length)
  }

  return (
    <>
      <div style={{ marginTop: -60 }} className="container">
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
          onChange={(e) => handleChange(e)}
        />
        {!flag ? (<button onClick={verify} >Verify</button>) : (<button disabled>Verifying...</button>)}
      </div>
      <div style={{marginTop: -60}} class="container">
        <ol>
          <span style={{ fontSize: 22 }}><b>Changes</b></span>
          <hr/>
          {errors.map(err => (
            <li>
              <span style={{ color: "red" }}>{err[0]}</span> : <span style={{ color: "green" }}>{err[1]}</span>
            </li>
          ))}
        </ol>
      </div >
    </>
  )
}
