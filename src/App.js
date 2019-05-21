import React, { useState } from "react";
import AwesomeSelector from "./AwesomeSelector";
import "./App.css";

function App() {
  const [selectedCar, setSelectedCar] = useState()
  return (
    <div className="App">
      <AwesomeSelector onChange={setSelectedCar}/>
      { selectedCar && <h1>Selected car {selectedCar.makeKey} - {selectedCar.modelKey}</h1>}
    </div>
  );
}

export default App;
