import React, { useState, useEffect } from "react";
import styled from 'styled-components';


const Container = styled.div`
  display: 'flex'; 
  justifyContent: 'space-between'
`
const AwesomeSelect = styled.select`
position: relative;
  width: 300px;
  font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
  font-size: 1.2em;  
  border-radius: 0;
  -webkit-appearance: none;
  padding: 10px;
`

export default ({onChange}) => {
  const [makers, setMakers] = useState([]);
  const [selectedMaker, setSelectedMaker] = useState("");
  const [cachedModels, setCachedModels] = useState({});
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    fetch("/api/makes")
      .then(response => response.json())
      .then(jsonMakers =>
        setMakers(
          jsonMakers.map(({ key, name }) => ({ value: key, label: name }))
        )
      );
  }, []);

  useEffect(() => {
    if (!cachedModels[selectedMaker] && selectedMaker) {
      async function fetchModels(selectedMaker) {
        const models = await fetch(
          `/api/makes/key/${selectedMaker}/models`
        ).then(res => res.json());
        setCachedModels({
          ...cachedModels,
          [selectedMaker]: models.map(({ key, name }) => ({
            value: key,
            label: name
          }))
        });
      }
      fetchModels(selectedMaker);
    }
  }, [cachedModels, selectedMaker]);

  useEffect(() => {
    if(selectedMaker && selectedModel) {
      onChange({ makeKey: selectedMaker, modelKey: selectedModel});
    } else {
      onChange()
    }
  }, [onChange, selectedMaker, selectedModel])

  return (
      <>
      <h3>Marke & Modell</h3>
      <Container>
      
      <AwesomeSelect
        data-testid="maker-selector"
        value={selectedMaker}
        onChange={e => {
          setSelectedMaker(e.target.value);
          setSelectedModel("");
        }}
      >
        <option value={""} disabled>
          Marke wählen
        </option>
        {makers.map(({ value, label }) => (
          <option key={`key-${value}`} value={value}>
            {label}
          </option>
        ))}
      </AwesomeSelect>

      <AwesomeSelect
        data-testid="model-selector"
        value={selectedModel}
        onChange={e => {
          setSelectedModel(e.target.value);
        }}
        disabled={!selectedMaker}
      >
        <option value={""} disabled>
          Modell wählen
        </option>
        {(cachedModels[selectedMaker] || []).map(({ value, label }) => (
          <option key={`key-${value}`} value={value}>
            {label}
          </option>
        ))}
      </AwesomeSelect>
      </Container>
      </>
  );
};
