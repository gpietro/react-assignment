import React, { useState, useEffect } from "react";
import styled from 'styled-components';


const AwesomeSelect = styled.select`
position: relative;
  display: block;
  width: 100%;
  
  font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
  font-size: 1.2em;  
  color: #60666d;
  border-radius: 0;
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
        console.log("do fetch");
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

  return (
      <div style={{display: 'flex'}}>
      <AwesomeSelect
        data-testid="maker-selector"
        value={selectedMaker}
        onChange={e => {
          setSelectedMaker(e.target.value);
          setSelectedModel("");
        }}
      >
        <option value={""} disabled>
          Select maker
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
          onChange({makeKey: selectedMaker, modelKey: selectedModel})
        }}
        disabled={!selectedMaker}
      >
        <option value={""} disabled>
          select model
        </option>
        {(cachedModels[selectedMaker] || []).map(({ value, label }) => (
          <option key={`key-${value}`} value={value}>
            {label}
          </option>
        ))}
      </AwesomeSelect>
      </div>
  );
};
