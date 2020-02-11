import React, { useState, useEffect } from 'react';

import './style.css';

export default function DevForm({ onSubmit }) {
  const [ github_username, setGithub_username ] = useState('');
  const [ techs, setTechs ] = useState('');
  const [ latitude, setLatitude ] = useState('');
  const [ longitude, setLongitude ] = useState('');

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLongitude(longitude);
        setLatitude(latitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleSubmit(e) {
    e.preventDefault()
    await onSubmit({ github_username, techs, longitude, latitude });

    setGithub_username('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input 
          type="text" 
          name="github_username" 
          id="github_username" 
          required
          value={github_username}
          onChange={event => setGithub_username(event.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input 
          type="text" 
          name="techs" 
          id="techs" 
          required
          value={techs}
          onChange={event => setTechs(event.target.value)}
        />         
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input 
            type="number" 
            name="latitude" 
            id="latitude" 
            onChange={event => setLatitude(event.target.value)} 
            value={latitude} required
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input 
            type="number" 
            name="longitude" 
            id="longitude" 
            onChange={event => setLongitude(event.target.value)} 
            value={longitude} required
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  )
}