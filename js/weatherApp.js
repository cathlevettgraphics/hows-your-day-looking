/********************
 *
 * FETCH DATA
 *
 ********************/

// Init weather
export let weather;

export function fetchWeather(dataRequest) {
  fetch(dataRequest)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      // Parse the response
      return response.json();
    })
    // Select data from the server to display
    .then((data) => {
      console.log(data);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const optionsTime = {
        hour: "2-digit",
        minute: "2-digit",
      };

      const weatherData = {
        city: data.city.name,
        date: new Date(data.list[0].dt_txt).toLocaleDateString(
          undefined,
          options,
        ),
        weather: data.list[0].weather[0].description,
        tempC: data.list[0].main.temp,
        feelsLikeTempC: data.list[0].main.feels_like,
        sunset: new Date(data.city.sunset).toLocaleTimeString([], optionsTime),
      };

      // Save curent search to local storage
      localStorage.setItem("cityWeather", JSON.stringify(weatherData));

      weather = weatherData;
      // console.log(weather);
      console.log("original data", data);

      // Render the fetched data in DOM
      renderWeatherList(weather);
    })
    .catch((err) => {
      console.log("error", err.message);
    });
}

/********************
 *
 * RENDER  DATA FUNCTION
 *
 ********************/

export let mountNodeWeather = document.getElementById("target-weather");

// Data passed to this function inside the fetch call
export function renderWeatherList(data) {
  const list = document.createElement("ul");
  // build the list
  const li = document.createElement("li");

  // Get current weather from storage
  const storedWeather = JSON.parse(localStorage.getItem("cityWeather"));
  data = storedWeather;

  const { city, date, weather, tempC, feelsLikeTempC, sunset } = data;

  li.innerHTML = `
      <div class="city-weather-wrapper">
        <h3 class="city-name">${city}</h3>
        <p class="city-date">${date}</p>
        <p class="city-weather">Outside it's <span class="weather-highlight"> ${weather}</span></p>
        <p class="city-temp">Current temperature <span class="weather-highlight">${tempC}C</span></p> 
        <p class="city-feels-like">It feels like <span class="weather-highlight">${feelsLikeTempC}C</span></p>
        <p class="city-sunset">Sunset at <span class="weather-highlight">${sunset}</span></p>
      </div>
      `;

  list.innerHTML = "";
  list.append(li);

  mountNodeWeather.innerHTML = "";
  mountNodeWeather.append(list);
}
