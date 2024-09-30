import { useState } from "react";

export const AdvancedSettings = () => {

  const [activeParameters, setActiveParameters] = useState([]);

  let parameterMap = {
    Acousticness: {
      min: 0,
      max: 1,
      text: 'Acousticness',
      value: 0,
    },
    Danceability: {
      min: 0,
      max: 1,
      text: 'Danceability',
      value: 0,
    },
    Energy: {
      min: 0,
      max: 1,
      text: 'Energy',
      value: 0,
    },
    Instrumentalness: {
      min: 0,
      max: 1,
      text: 'Instrumentalness',
      value: 0,
    },
    Liveness: {
      min: 0,
      max: 1,
      text: 'Liveness',
      value: 0,
    },
    Loudness: {
      min: 0,
      max: 1,
      text: 'Loudness',
      value: 0,
    },
    Popularity: {
      min: 0,
      max: 100,
      text: 'Popularity',
      value: 0,
    },
    Speechiness: {
      min: 0,
      max: 1,
      text: 'Speechiness',
      value: 0,
    },
  };

  const addNewParameter = (event) => {
    const key = event.target.value;
    const newParam = parameterMap[key];
    setActiveParameters([...activeParameters, newParam])
  };

  const handleParameterChange = (event) => {
    const key = event.target.id;
    parameterMap[key].value = event.target.value;
  };

  const parameterOptions = Object.keys(parameterMap).map(key => (
    <option key={parameterMap[key].text} value={parameterMap[key].text}>
      {parameterMap[key].text}
    </option>
  ));

  const parameterSliders = Object.values(activeParameters).map((parameter) => (
    <div className="settings-option" id={ parameter.text }>
      <label>{parameter.text}</label>
      <input
        className='slider'
        type='range'
        id={ parameter.text }
        min={ parameter.min }
        max={ parameter.max }
        step={ parameter.max > 1 ? 1 : 0.1 }
        value={ parameter.value }
        onChange={ handleParameterChange }
      />
    </div>
  ));

  return ( 
    false &&
    <div className="advanced-settings">
      {parameterSliders}
      <select name='add-parameter' id='add-parameter' defaultValue={'add-new'} onChange={addNewParameter}>
        <option value='add-new' disabled={true}>Add New Slider</option>
        {parameterOptions}
      </select>

    </div>
   );
}
