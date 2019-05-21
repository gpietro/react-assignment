import React, { useState, useEffect } from "react";

const MySelector = () => {
  const [makers, setMakers] = useState([]);
  const [selectedMaker, setSelectedMaker] = useState(0);
  const [cachedModels, setCachedModels] = useState({});
  const [selectedModel, setSelectedModel] = useState(0);

  useEffect(() => {
    fetch("https://catalogue-service.preprod.carforyou.ch/api/makes")
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
          `https://catalogue-service.preprod.carforyou.ch/api/makes/key/${selectedMaker}/models`
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
      <select
        value={selectedMaker}
        onChange={e => {
          setSelectedMaker(e.target.value);
        }}
      >
        <option value={0} disabled>
          select maker
        </option>
        {makers.map(({ value, label }) => (
          <option key={`key-${value}`} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={selectedModel}
        onChange={e => {
          setSelectedModel(e.target.value);
        }}
        disabled={!selectedMaker}
      >
        <option value={0} disabled>
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
