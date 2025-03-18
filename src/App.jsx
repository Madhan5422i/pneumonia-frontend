import { useState } from "react";
import "./App.css";
import { Landing } from "./components/pages/Landing";
import { Popup } from "./components/Popup/Popup";

function App() {
  const [info, setInfo] = useState(false);

  return (
    <>
      <div className="popup-one">{info && <Popup setInfo={setInfo} />}</div>
      <Landing info={info} setInfo={setInfo} />
    </>
  );
}

export default App;
