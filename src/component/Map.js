import React, { Component } from 'react';
import classNames from 'classnames';
import '../fonts/weather-icons.css'

class Map extends Component {

  fetchMap = () => {
    const {lat, lon} = this.props.weatherData.coord;
    const appID = 'rwEd74xFpiYlUdJrZCrI'
    const appCode = 'MXTJ5Cxy1iQYv-FgYpdWwg'
    const HERE_MAP_API = `https://image.maps.cit.api.here.com/mia/1.6/mapview?c=${lat}%2C${lon}&z=5&w=150&h=300&f=0&t=2&&app_id=${appID}&app_code=${appCode}`;
  
    return HERE_MAP_API;
  }

  render() {
    const mapUrl = this.fetchMap();
    const index = this.props.weatherData;
    let weatherIcon = classNames('wi wi-owm-' + index.weather[0].id);
    
    return (
      <section className='card' key={index.uid}>

        <div className='delete overlay'>x</div>
          
        <div className='map-box'>
            <img src={mapUrl} alt=''/>
        </div>

        <div className='info-box'>
          <div className='weather-icon'>
            <div className='center'>
              <div className={weatherIcon}></div>
            </div>
          </div>
          <div className='weather-temp'> {Math.round(index.main.temp)}°F </div>
          <div className='weather-description'> {index.weather[0].description} </div>
        </div>

        <div className='location-container'>
          <div className='location'>
            <div>{index.zip}</div>
            <h2 className='city-name'>{index.name}</h2>
          </div>
        </div>
      </section>
    );
  }
}

export default Map;
