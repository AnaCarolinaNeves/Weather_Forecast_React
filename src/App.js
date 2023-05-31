import './index.css';
import React, { useState } from 'react';

const api = {
  key: "b8d485db1774e531c7ac8c0c4513338a",
  base: "https://api.openweathermap.org/data/2.5/"
}

const weatherConditions = {
  Thunderstorm: 'Tempestade',
  Drizzle: 'Chuvisco',
  Rain: 'Chuva',
  Snow: 'Neve',
  Mist: 'Névoa',
  Smoke: 'Fumaça',
  Haze: 'Névoa',
  Dust: 'Poeira',
  Fog: 'Neblina',
  Sand: 'Areia',
  Ash: 'Cinzas',
  Squall: 'Ventania',
  Tornado: 'Tornado',
  Clear: 'Ensolarado',
  Clouds: 'Nublado'
};

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result);
        })
    }
  }

  const dateBuilder = (d) => {
    let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    let dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    let dia = dias[d.getDay()];
    let data = d.getDate();
    let mes = meses[d.getMonth()];
    let ano = d.getFullYear();

    return `${dia}, ${data} de ${mes}, ${ano}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 18) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Digite a cidade'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyUp={search}
          />
        </div>

        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>

            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°C</div>
              <div className='weather'>{weatherConditions[weather.weather[0].main]}</div>
            </div>
          </div>
        ) : ('')}
      </main>

    </div>
  );
}

export default App;
