import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState(0);
  const [power, setPower] = useState(0);
  const [ftp, setFtp] = useState(0);
  const [wpk, setWpk] = useState(0);
  const [vo2max, setVo2max] = useState(0);

  const calculateFtp = () => {
    setFtp(power * 0.95);
  };

  useEffect(() => {
    if (weight > 0 && ftp > 0) {
      setWpk(ftp / weight);
    }
  }, [ftp, weight]);

  useEffect(() => {
    if (ftp > 0 && weight > 0) {
      // Una stima semplificata del VO2 max basata sull'FTP
      const estimatedVo2max = (ftp / weight) * 10.8 + 7;
      setVo2max(estimatedVo2max);
    }
  }, [ftp, weight]);

  const handleCalculate = () => {
    calculateFtp();
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="card-body">
          <h1>Calcolatore FTP, Watt per Kilo e VO2 Max</h1>
          <div className="input-group">
            <label>Peso (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>
          <div className="input-group">
            <label>Potenza media 20 minuti (watt):</label>
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(parseFloat(e.target.value))}
            />
          </div>
          <button className="calculate-button" onClick={handleCalculate}>Calcola FTP, Watt/kg e VO2 Max</button>
          <div className="results-container">
            <h2>Risultati:</h2>
            <p>FTP: {ftp.toFixed(2)} watt</p>
            <p>Watt per kg: {wpk.toFixed(2)} W/kg</p>
            <p>VO2 Max stimato: {vo2max.toFixed(2)} ml/kg/min</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;