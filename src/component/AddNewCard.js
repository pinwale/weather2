import React, { Component } from 'react';
// import axios from 'axios';
import CardContainter from './CardContainter';

class AddNewCard extends Component {
  state = {
    weatherData: [],
    isLoading: false,
    units: 'imperial',
  }

  generateKey = (x) => {
    const str = x.replace(/\s+/g, '').toLowerCase();
    return `${str}_${new Date().getTime()}`;
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  fetchWeatherData = (LOCATION, UNITS) => {
    const APIKEY = '4a109b71b9191ad4da692d41c1f8c3bd';
    this.setState({ isLoading: true });
    const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?zip=${LOCATION},us&units=${UNITS}&APPID=${APIKEY}`;
    // const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?zip=44406,us&units=imperial&APPID=4a109b71b9191ad4da692d41c1f8c3bd'

    fetch(WEATHER_API)
    .then(res => { return res.json(); })
    .then(data => {
      const newData = { id: this.generateKey(data.name), ...data };
      this.setState({
        weatherData: [...this.state.weatherData, newData],
        isLoading: false,
      });
    })
    console.log('fetched weather data for', this.state.zipcode);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const location = this.state.zipcode;
    const units = this.state.units;

    this.setState({ id: this.generateKey(location) });
    this.fetchWeatherData(location, units);
    console.log('fetching weather data for', this.state.zipcode);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name='zipcode' type='text' placeholder='Zipcode' onChange={this.handleChange} />
          <button>Add card</button>
        </form>

        <CardContainter />
      </div>
    );
  }
}

export default AddNewCard;
