import React from "react";
import { Map, TileLayer, Circle  } from 'react-leaflet';

export default class CircleOnMap extends React.Component {

  static sampledata = {title : 'Hammersmith is something', lat: 51.5, lon: -0.2333};

  constructor(props) {
    super(props);
    this.state = {...props.formData};
    if (!this.state.title) this.state = CircleOnMap.sampledata;
  }

  render() {


    const {title, lat, lon} = this.state;
    return (
      <div>
        <h3>{title} </h3>

        <Map attributionControl={false} doubleClickZoom={false} ref={ (map) => this.map = map } zoomControl={false} center={[lat, lon]} zoom={13} style={{'height': '180px'}} >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>

          <Circle center={[lat, lon]} radius={1000} color="#FF4E00">
          </Circle>

        </Map>
      </div>
    );
  }
}
