import React, {Component} from 'react';
import {connect} from 'dva';


import d3 from 'd3';

import Transition from 'react-motion-ui-pack';
import {Motion, spring} from 'react-motion';


import ReactStreetview from 'react-streetview';

import {Row, Col, Card, Button} from 'antd';
import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";


import mapboxgl from 'mapbox-gl';

console.log(mapboxgl);

import StreetViewCard from '../../../components/Cards/Store/StreetViewCard/StreetViewCard';
import GenderPercentCard from '../../../components/Cards/TopLevel/GenderPercentCard/GenderPercentCard';

import CardLoader from '../../../components/Cards/CardLoader';

import LucaSideBar from '../../../common/LucaSidebar/LucaSidebar';
import StoreMarker from '../../../components/Maps/StoreMap/StoreMarker';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

mapboxgl.accessToken = 'pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw';

export default class MyMap extends React.Component {
  componentDidMount() {


    //globals for the choropleth
    var COLORS = ['#8c510a', '#d8b365', '#f6e8c3', '#c7eae5', '#5ab4ac', '#01665e'],
      BREAKS = [-1000, -500, 0, 500, 1000, 1500],
      FILTERUSE;

    //create a map using the Mapbox Light theme, zoomed in to DC
    var map = new mapboxgl.Map({
      container: this.afterContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 11,
      center: [-77.014576, 38.899396]
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());



    //data source: http://opendata.dc.gov/datasets/e87a760828844422afe864a6754049c2_20?geometry=-77.297%2C38.854%2C-76.732%2C38.934
    map.on('load', function () {
      map.addSource('dc', {
        type: 'geojson',
        data: 'https://gist.githubusercontent.com/hrecht/82b6440ed3b982a6f594/raw/48832482382f81d1f6943896626e21b80da6b45c/data.geojson'
      });

      map.addLayer({
        "id": "tracts",
        "type": "fill",
        "source": "dc",
        "paint": {
          "fill-color": {
            property: 'TOTPOPCHG',
            stops: [
              [BREAKS[0], COLORS[0]],
              [BREAKS[1], COLORS[1]],
              [BREAKS[2], COLORS[2]],
              [BREAKS[3], COLORS[3]],
              [BREAKS[4], COLORS[4]],
              [BREAKS[5], COLORS[5]]]
          },
          "fill-opacity": 0.7,
          "fill-outline-color": "#ffffff"
        }
      });
    });
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      height: '100vh',
      width: '90vw'
    };

    return <div><div style={style} ref={el => this.afterContainer = el}/></div>;
  }
}
