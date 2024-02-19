/* -------------------- DOM variables ------------------- */
const citySearchInput = document.querySelector("input.mb-5");
const cityName = document.querySelector("h2");
const weatherDegree = document.querySelector("p.large-font");
const time = document.querySelector("p.time");
const date = document.querySelector("p.date");
const icontext = document.querySelector("p.icon-text");
const icon = document.querySelector("img.icon");
const cloudy = document.querySelector(".cloud p.ml-auto");
const wind = document.querySelector(".wind p.ml-auto");
const humidity = document.querySelector(".humidity p.ml-auto");
const pressure = document.querySelector(".pressure p.ml-auto");
const optCity1 = document.querySelector(".optcity.one");
const optCity2 = document.querySelector(".optcity.two");
const optCity3 = document.querySelector(".optcity.three");
const optCity4 = document.querySelector(".optcity.four");
const container = document.querySelector(".container");
const locationIcon = document.getElementById("location");

/* ------------------------- API ------------------------ */
let cityData = [];
let currentSunRise, currentSunSet;
const apiKey = "b8b2bc6cc3def4c8452b6812772a682f";
const defaultCity = "konya";
async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("There was an error with the URL");
    }
    const data = await response.json();
    const { timezone, sys } = data;
    currentSunRise = sys.sunrise;
    currentSunSet = sys.sunset;
    changeBackgroundColor(
      sunRiseAndSetCovertor(currentSunRise, currentSunSet, timezone)
    );
    retriveWeatherData(data);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function changeBackgroundColor(sunRiseAndSet) {
  const sunrise = sunRiseAndSet.sunrise.slice(0, 2);
  const sunset = sunRiseAndSet.sunset.slice(0, 2);
  const localTime = sunRiseAndSet.currentCityLocalTime.slice(0, 2);
  const isNightTime = localTime < sunrise || localTime > sunset;
  if (isNightTime) {
    container.style.backgroundImage = 'url("./assets/night.jpg")';
    container.classList.remove("day-theme");
  } else {
    container.style.backgroundImage = 'url("./assets/day.jpg")';
    container.classList.add("day-theme");
  }
}
/* ---------------------- Listeners --------------------- */
document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData(defaultCity);
  optionalCities();
});

citySearchInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    let city = e.target.value;
    fetchWeatherData(city);
  }
});

locationIcon.addEventListener("click", function (e) {
  const units = "metric";
  navigator.geolocation?.getCurrentPosition(async ({ coords }) => {
    // Using async here
    const { latitude, longitude } = coords;
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    try {
      const response = await axios(URL); // Using await here
      retriveWeatherData(response.data);
    } catch (e) {
      console.error("ERROR");
    }
  });
});

/* ---------------------- functions --------------------- */
function retriveWeatherData(citySelected) {
  const { main, timezone, clouds, wind, weather, name } = citySelected;
  cityName.textContent = name;
  weatherDegree.textContent = main.temp.toFixed(0) + "°C";
  time.textContent = formatTimeAndDate(timezone).slice(0,5);
  date.textContent = formatTimeAndDate(timezone).slice(5);
  icontext.textContent = weather[0].description;
  icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  cloudy.textContent = `${clouds.all}%`;
  wind.textContent = `${wind.speed.toFixed(2)} km/h`;
  humidity.textContent = `${main.humidity}%`;
  pressure.textContent = `${main.pressure.toFixed(0)} hPa`;
}

const optionalCitiesArray = ["Birmingham", "Manchester", "New York", "Prague"];
async function optionalCities() {
  for (const city of optionalCitiesArray) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data for ${city}`);
      }
      const data = await response.json();
      const { main, name } = data;
      displayOptionalCityData(data);
    } catch (error) {
      console.error(error);
    }
  }
}
function displayOptionalCityData(citySelected) {
  const { main, name } = citySelected;
  switch (name) {
    case "Birmingham":
      optCity1.textContent = main.temp.toFixed(0) + "°C";
      break;
    case "Manchester":
      optCity2.textContent = main.temp.toFixed(0) + "°C";
      break;
    case "New York":
      optCity3.textContent = main.temp.toFixed(0) + "°C";
      break;
    case "Prague":
      optCity4.textContent = main.temp.toFixed(0) + "°C";
      break;
    default:
      break;
  }
}

function formatTimeComponents(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
function formatTimeAndDate(timezoneOffsetMs) {
  timezoneOffsetMs = timezoneOffsetMs * 1000;
  const currentTimeMs = Date.now();
  const timeInSpecifiedTimezone = new Date(currentTimeMs + timezoneOffsetMs);

  const hours = timeInSpecifiedTimezone.getUTCHours();
  const minutes = timeInSpecifiedTimezone.getUTCMinutes();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayOfWeek = days[timeInSpecifiedTimezone.getUTCDay()];
  const dayOfMonth = String(timeInSpecifiedTimezone.getUTCDate()).padStart(
    2,
    "0"
  );
  const monthName = months[timeInSpecifiedTimezone.getUTCMonth()];
  //const year = String(timeInSpecifiedTimezone.getUTCFullYear());

  const formattedDateTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}${dayOfWeek}-${dayOfMonth} ${monthName}`;
  return formattedDateTime;
}

function sunRiseAndSetCovertor(sunrise, sunset, timezoneOffsetSeconds) {
  const timeSunrise = new Date(sunrise * 1000);
  const timeSunset = new Date(sunset * 1000);

  timeSunrise.setSeconds(timeSunrise.getSeconds() + timezoneOffsetSeconds);
  timeSunset.setSeconds(timeSunset.getSeconds() + timezoneOffsetSeconds);

  const sunriseClockFormat = formatTimeComponents(timeSunrise);
  const sunsetClockFormat = formatTimeComponents(timeSunset);

  return {
    sunrise: sunriseClockFormat,
    sunset: sunsetClockFormat,
    currentCityLocalTime: formatTimeAndDate(timezoneOffsetSeconds),
  };
}
