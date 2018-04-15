import React, { Component } from 'react';
import './AddNewCard.css';
import MapContainer from './MapContainer';

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
    .then(response => { return response.json(); })
    .then(data => {
      const newData = { uid: this.state.kuid, zip: this.state.zipcode, ...data };
      this.setState({
        weatherData: [...this.state.weatherData, newData],
        isLoading: false,
      });
    })
    console.log('fetched weather data for', this.state.zipcode);
  }

  handleSubmit = (event) => {
    if (this.canBeSubmitted()) {
      event.preventDefault();

      const { zipcode, units } = this.state;

      this.fetchWeatherData(zipcode, units);
      this.setState({ kuid: this.generateKey(zipcode), locations: [...this.state.locations, zipcode] });

      console.log('submitted a weather data request for', this.state.zipcode);
      event.target.reset()
    }
  }

  canBeSubmitted() {
    const { zipcode } = this.state;
    return (
      // eslint-disable-next-line
      zipcode.length == 5 && !isNaN(zipcode)
    );
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
          <section className='card' key={index.uid}>
            <div className='map-box'> 
              <img src='http://via.placeholder.com/340x150' alt=''/>
              <MapContainer />

              <div className='info-box overlay'>
                {Math.round(index.main.temp)}°F 
                  {index.weather[0].description} 
                <div className='weather-icon'>{index.weather[0].icon}</div>
              </div>
              <div className='delete overlay'>X</div>
            </div>

            <div className='location-container'>
              <div className='location'>
                <div>{index.zip}</div>
                <h2 className='city-name'>{index.name}</h2>
              </div>
            </div>
          </section>
        ) }
        </div>
      </div>
    );
  }
}

export default AddNewCard;
