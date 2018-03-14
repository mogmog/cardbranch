import React, {Component} from 'react';
import {Marker} from "react-mapbox-gl";

export default class extends Component {

  render() {

    const { onClick, store, coordinates } = this.props;

    return (
      <Marker
        coordinates={coordinates}
        onClick={e => {
          onClick(store);
        }}
        anchor="bottom">
        <img alt="Store" style={{'width': '50px'}} src={require('./../../../assets/mapping/markers/3d-house.svg')} />
      </Marker>
    );
  }
}
