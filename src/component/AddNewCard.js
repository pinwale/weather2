import React, { Component } from 'react';
import './AddNewCard.css';
import Map from './Map';

class AddNewCard extends Component {
  state = {
    weatherData: [],
    zipcode: '',
    isLoading: false,
    units: 'imperial',
    kuid: '',
    locations: '',
  }

  generateKey = (input) => {
    const str = input.replace(/\s+/g, '').toLowerCase();
    return `${str}_${new Date().getTime()}`;
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  fetchWeatherData = (LOCATION, UNITS) => {
    this.setState({ isLoading: true });

    const APIKEY = '4a109b71b9191ad4da692d41c1f8c3bd';
    const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?zip=${LOCATION},us&units=${UNITS}&APPID=${APIKEY}`;

    fetch(WEATHER_API)
    .then(response => { if (response.ok) { return response.json(); }
    throw new Error('Network response was not ok.'); })
    // .then(response => { return response.json(); })
    .then(data => {
      const newData = { uid: this.state.kuid, zip: this.state.zipcode, ...data };
      this.setState({
        weatherData: [...this.state.weatherData, newData],
        isLoading: false,
      });
      console.log('fetched weather data for', this.state.zipcode);
    })
    .catch(error => console.error(error));
  }

  handleSubmit = (event) => {
    if (this.canBeSubmitted()) {
      event.preventDefault();

      const { zipcode, units } = this.state;

      this.fetchWeatherData(zipcode, units);
      this.setState({ kuid: this.generateKey(zipcode), locations: [...this.state.locations, zipcode] });
      console.log('submitted a weather data request for', this.state.zipcode);

      // this.fetchMap();
      // console.log('submitted a map data request for', this.state.zipcode);

      event.target.reset()
    }
  }

  canBeSubmitted = () => {
    const { zipcode } = this.state;
    return (
      // eslint-disable-next-line
      zipcode.length == 5 && !isNaN(zipcode)
    );
  }

  fetchMapLatLong = () => {

  }

  render() {
    const isOK = this.canBeSubmitted();

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name='zipcode' type='text' placeholder='Zipcode' onChange={this.handleChange} />
          <button disabled={!isOK}>Add card</button>
        </form>
        <div className='cards-container'>
        { this.state.weatherData.map( (index) =>
          <Map 
            weatherData = {index}
            key = {index.uid}
          />
        ) }
        </div>
      </div>
    );
  }
}

export default AddNewCard;
