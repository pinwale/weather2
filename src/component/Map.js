import React, { Component } from 'react';

class Map extends Component {
  render() {
    const center = { lat: 0, lng: 0 };

    return (
      <div>
        <HEREMap 
          appId="{rwEd74xFpiYlUdJrZCrI}"
          appCode="{MXTJ5Cxy1iQYv-FgYpdWwg}"
          center={center}
          zoom={14}
          interactive={false}
        >
          <Marker {...center}>
            <div className="circle-marker"></div>
          </Marker>
        </HEREMap>
      </div>
    );
  }
}

export default Map;
