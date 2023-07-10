import { useState } from 'react'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <header>
//         <nav>
//           <section className='tryin'>
//           <div className='hdr-nav'>
//           <div>
//             <strong><h4>VY WEATHER LOGISTICS</h4></strong>
//           </div>
//           <div>
//             <input typeof='search' placeholder='Search'/>
//           </div>
//           <div className='drpDown'>
//             <div>
//               <ul>
//                 <li>F</li>
//                 <li>C</li>
//               </ul>
//             </div>
//             <div>
//               <ul>
//                 <li>Americas</li>
//                 <li>Africa</li>
//                 <li>Europe</li>
//                 <li>Asia</li>
//                 <li>Australia</li>
//               </ul>
//             </div>
//           </div>
//           </div>
//           </section>
//         </nav>
//       </header>
//       <main className='container'>
//         <div className='WeatherChoice'>
//           <div>
//             Today
//           </div>
//           <div>
//             Hourly
//           </div>
//           <div>
//             10 days
//           </div>
//           <div>
//             Weekend
//           </div>
//           <div>
//             Monthly
//           </div>
//           <div>
//             Yearly
//           </div>
//         </div>

//         <div className='countriesList'>
        
//         </div>
//       </main>
        
//     </>
//   )
// }


//code began from below

const api = {
  key: "a2817935e4304887a6db0d6d28b9a461",
  base: "https://api.openweathermap.org/data/2.5/",
};

const api2 = {
  base: "https://restcountries.com/v3/name/",
};

function App() {
  const [searchBar, setSearchBar] = useState("");
  const [weather, setWeather] = useState({});
  const [flag, setFlag] = useState("");


  const searchClicked = () => {
    fetch(`${api.base}weather?q=${searchBar}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
    console.log("I was clicked");
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
      weatherImage = <img src="./public/Cloudy.png" alt="Cloudy" width="500px" height="200px" style={{ display:"flex", flexDirection:"column" }}/>;  
    } else if (weatherCondition === "clear") {
      weatherImage = <img src="./public/sunny.jpg" alt="Sunny" width="500px" height="200px" style={{ display:"flex", flexDirection:"column" }} />;
    }
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1><img src="./public/Color logo - no background.png" width="70px"/><>Weather App</></h1>
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

