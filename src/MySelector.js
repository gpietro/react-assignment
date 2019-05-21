import React, { useState, useEffect } from "react";

const MySelector = () => {
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
    <div style={{ display: "flex" }}>
      <h1 data-testid="title">
        {selectedMaker} - {selectedModel}
      </h1>
      <select
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
      </select>

      <select
        data-testid="model-selector"
        value={selectedModel}
        onChange={e => {
          setSelectedModel(e.target.value);
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
      </select>
    </div>
  );
};

export default MySelector;
