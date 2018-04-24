import React, { Component } from 'react';
import './AddNewCard.css';
import Map from './Map';

class AddNewCard extends Component {
  state = {
    weatherData: [],
    formInput: '',
    isLoading: false,
    units: 'imperial',
    kuid: '',
    searches: '',
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
    const ERR_BAD_RESPONSE = '❗️️ Weather API response was not ok. Probably because you searched for a nonexistent zipcode.'

    fetch(WEATHER_API)
    .then(response => { if (response.ok) { return response.json(); }
      throw new Error(ERR_BAD_RESPONSE); })
    .then(data => {
      const newData = { uid: this.state.kuid, zip: this.state.formInput, ...data };
      this.setState({
        weatherData: [...this.state.weatherData, newData],
        isLoading: false,
      });
      console.log('⏰ fetched weather data for', this.state.formInput);
    })
  }

  handleSubmit = (event) => {
    if (this.canBeSubmitted()) {
      event.preventDefault();

      const { formInput, units } = this.state;

      this.fetchWeatherData(formInput, units);
      this.setState({ kuid: this.generateKey(formInput), searches: [...this.state.searches, formInput] });
      console.log('💤 submitted a weather data request for', this.state.formInput);

      // this.fetchMapLatLong();
      // console.log('submitted a map data request for', this.state.zipcode);

      event.target.reset()
    }
  }

  canBeSubmitted = () => {
    const { formInput } = this.state;
    return (
      // eslint-disable-next-line
      formInput.length == 5 && !isNaN(formInput)
    );
  }

  // fetchMapLatLong = () => {
  //   const { formInput } = this.state;
  //   const appID = 'rwEd74xFpiYlUdJrZCrI'
  //   const appCode = 'MXTJ5Cxy1iQYv-FgYpdWwg'

  //   const HERE_GEOCODER_API = 'https://geocoder.cit.api.here.com/6.2/geocode.json?app_id={appID}&app_code={appCode}&searchtext=44406'; 

  //   const ERR_BAD_RESPONSE = 'There was an error with the geocoder request.'

  //   if (this.canBeSubmitted()) {
  //     fetch(HERE_GEOCODER_API)
  //     .then(response => { if (response.ok) { return response.json(); }
  //       throw new Error(ERR_BAD_RESPONSE); })
  //     .then(data => {
  //       const newData = {...data };
  //       this.setState({
  //         weatherData: [...this.state.weatherData, newData],
  //         isLoading: false,
  //       });
  //       console.log('⏰ fetched weather data for', this.state.formInput);
  //     })
  //   }
  // }

  render() {
    const isOK = this.canBeSubmitted();

    return (
      <div>
        <div className='cards-container'>
          <div className='card'>
            <form onSubmit={this.handleSubmit}>
              <input name='formInput' type='text' placeholder='Zipcode' onChange={this.handleChange} />
              <button disabled={!isOK}>Add card</button>
            </form>
          </div>

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
