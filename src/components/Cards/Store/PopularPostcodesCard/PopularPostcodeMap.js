import React from 'react';

import mapboxgl from 'mapbox-gl';

import geojsonExtent from 'geojson-extent';

import ReactMapboxGl, {Layer, Source, Feature, Marker, Popup} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

import postcodes from './../../../../assets/postcodes';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(newprops) {
    const { postcodeToHighlight } = newprops;
    if (this.map) this.map.setFilter('postcodehighlight', ['==', 'Name', (postcodeToHighlight ? postcodeToHighlight : '')]);
  }

  render() {
    const { postcodeToHighlight } = this.props;

    return (

      <Map

        onStyleLoad={(map) => {

          this.map = map;

          map.addSource('postcodes', {
            type: 'geojson',
            data: postcodes,
          });

          map.addLayer({
            id: 'postcodefill',
            type: 'fill',
            source: 'postcodes',
            paint: {
              'fill-color': '#088',
              'fill-opacity': 0.3,
            },
          });

          map.addLayer({
            id: 'postcodehighlight',
            type: 'fill',
            source: 'postcodes',
            filter : ['==', 'Name', ''],
            paint: {
              'fill-color': '#088',
              'fill-opacity': 0.7,
            },
          });

          map.fitBounds(geojsonExtent(postcodes), {
            padding: 20,
            duration: 0
          });

        }}

        style="mapbox://styles/mogmog/cjfl7wk44btwu2sqwep298upn"
        containerStyle={{
          height: "400px",
          width: "500px"
        }}>

      </Map>

    )
  }
}

