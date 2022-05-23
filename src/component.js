import React from "react";
import classes from "./component.module.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function Component() {
  const iconBeginning = "https://openweathermap.org/img/wn/";
  const iconEnd = "@2x.png";
  const [icon, setIcon] = useState("");
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [main, setMain] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  
  const APIbase = "https://api.openweathermap.org/data/2.5/weather";
  const KtoC = -273.15;
  const changeHandler = (e) => {
    setCity(e.target.value);
  };
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${APIbase}?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
        .then((result) => result.json())
        .then((data) => weatherData(data));
    }
    
  };

  const weatherData = (data) => {
    setWeather(Math.round(data.main.temp + KtoC));
    setMain(data.weather[0].main);
    setCity("");
    setIcon(data.weather[0].icon);
    setName(data.name);
    setCountry(data.sys.country);
  };
  function getPosition(position) {
    fetch(
      `${APIbase}?lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((result) => result.json())
      .then((data) => weatherData(data));
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getPosition,
        handleLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  function handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
  return (
    <div className={classes.center}>
      <input
        className={classes.search}
        placeholder="Search Location"
        onChange={changeHandler}
        onKeyPress={search}
        value={city}
      ></input>

      <Button onClick={getLocation} variant="primary">
        {" "}
        Use current location
      </Button>
      {!name == "" && !country == "" && (
        <p className={classes.info}>
          {name}, {country}
        </p>
      )}

      {!weather == "" && (
        <div className={classes.temperature}>
          {" "}
          <p className={classes.info}>{weather}°C</p>{" "}
        </div>
      )}

      {!icon == "" && <img src={iconBeginning + icon + iconEnd}></img>}
      <p className={classes.info}>{main}</p>
    </div>
  );
}
export default Component;
