import React, {Component} from 'react';
import {Marker} from "react-mapbox-gl";

export default class extends Component {

  render() {

    const { onClick, item, coordinates } = this.props;

    return (
      <Marker
        coordinates={coordinates}
        onClick={e => {
          onClick(item);
        }}
        anchor="bottom">
        <img alt="Event" style={{'width': '50px'}} src={require('./../../../assets/mapping/markers/warning.svg')} />
      </Marker>
    );
  }
}
