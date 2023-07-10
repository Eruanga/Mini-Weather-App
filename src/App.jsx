import { useState } from 'react'
import './App.css'
import axios from 'axios';
import backgroundImage from '/bg.png'

//code began from below
const apiKey = import.meta.env.VITE_API_KEY
// const apiKey = process.env.REACT_APP_API_KEY
const api = {
  base: "https://api.openweathermap.org/data/2.5/",
};

const api2 = {
  base: "https://restcountries.com/v3/name/",
};

function App() {

  const [searchBar, setSearchBar] = useState("");
  const [weather, setWeather] = useState({});
  const [flag, setFlag] = useState("");


  const searchClicked = async () => {
   const res= await axios(`${api.base}weather?q=${searchBar}&units=metric&appid=${apiKey}`)
   const data = await res.data
        setWeather(data);
  };

  const countFlag = () => {
    fetch(`${api2.base}${searchBar}`)
    .then((res) => res.json())
    .then((result) => {
      if (Array.isArray(result) && result.length > 0){
        setFlag(result[0].flags[0]);
      }
    });
      
  };

  let weatherImage;
  if (typeof weather.weather !== "undefined") {
    const weatherCondition = weather.weather[0].main.toLowerCase();
    if (weatherCondition === "clouds") {
      weatherImage = <img src="/Cloudy.png" alt="Cloudy" width="500px" height="200px" style={{ display:"flex", flexDirection:"column" }}/>;  
    } else if (weatherCondition === "clear") {
      weatherImage = <img src="/sunny.jpg" alt="Sunny" width="500px" height="200px" style={{ display:"flex", flexDirection:"column" }} />;
    }
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1><img src={backgroundImage} width="70px"/><>Weather App</></h1>
        <div className='searchDiv'>
          <input
            className='searchBox'
            type="text"
            placeholder="Enter a place..."
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
          />
          <button onClick={() => { searchClicked(); countFlag(); }}>Search</button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div className='infoDiv'>
            <p className='nameFlag'>{weather.name}<img src={flag} alt="flag" width="500px" height="200px"  /></p>
            <p><strong id="ForcastImg">{weather.main.temp}°C {weather.weather[0].main}</strong> {weatherImage}</p>
            {/* <p>{weather.weather[0].main}{weatherImage}</p> */}
            {/* <p>({weather.weather[0].description}){weatherImage}</p> */}
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;





// Im just testing this below. 

